// Dependency-free logic tests. These do not replace real browser/device checks.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');

function setup() {
  class Element {
    constructor() {
      this.children = []; this.style = {}; this.dataset = {}; this.attributes = {};
      this.listeners = {}; this.className = ''; this._text = ''; this.disabled = false;
      this.classList = {
        add: name => { this.className += ` ${name}`; },
        remove: name => { this.className = this.className.split(' ').filter(c => c !== name).join(' '); }
      };
    }
    set innerHTML(value) { this.replaceChildren(); this.html = value; }
    set textContent(value) { this.replaceChildren(); this._text = String(value); }
    get textContent() { return this._text; }
    appendChild(child) { child.parentNode = this; this.children.push(child); }
    append(...children) { children.forEach(child => this.appendChild(child)); }
    replaceChildren() { this.children.forEach(child => { child.parentNode = null; }); this.children = []; }
    setAttribute(key, value) { this.attributes[key] = value; }
    getAttribute(key) { return this.attributes[key] ?? null; }
    removeAttribute(key) { delete this.attributes[key]; }
    addEventListener(key, fn) { this.listeners[key] = fn; }
    focus() { this.focused = true; }
    querySelector() { return new Element(); }
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const ids = Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(m => [m[1], new Element()]));
  const nav = Array.from({ length: 7 }, () => new Element());
  const listeners = {};
  const document = {
    hidden: false,
    getElementById: id => {
      const find = el => el.id === id ? el : el.children.map(find).find(Boolean);
      return ids[id] || Object.values(ids).map(find).find(Boolean) || null;
    },
    documentElement: {lang:'es'},
    createElement: () => new Element(),
    addEventListener: (name, fn) => { listeners[name] = fn; },
    querySelectorAll: selector => {
      if (selector === '[data-i18n]') return [];
      if (selector === '.nav-btn') return nav;
      if (selector === '.screen') return Object.entries(ids).filter(([id]) => id.startsWith('screen-')).map(([, el]) => el);
      if (selector === '.quiz-opt') return ids['q-options'].children;
      if (selector === '.match-opt') return ids['m-options'].children;
      throw new Error(`Unexpected selector ${selector}`);
    }
  };
  let timerId = 0;
  const timers = new Map();
  const window = { addEventListener() {} };
  const context = vm.createContext({ document, window,
    setTimeout: fn => { timers.set(++timerId, fn); return timerId; }, clearTimeout: id => timers.delete(id) });
  const run = source => vm.runInContext(source, context);
  run(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8'));
  run(fs.readFileSync(path.join(root, 'js/locales/en.js'), 'utf8'));
  run(fs.readFileSync(path.join(root, 'js/locales/pt.js'), 'utf8'));
  run(fs.readFileSync(path.join(root, 'js/i18n.js'), 'utf8'));
  run(fs.readFileSync(path.join(root, 'js/actions.js'), 'utf8'));
  run(fs.readFileSync(path.join(root, 'js/app.js'), 'utf8'));
  return { ids, run, timers, listeners, document };
}

test('all vocabulary has unique IDs; generated questions have one distinct answer', () => {
  const { run } = setup();
  assert.equal(run('new Set(categories.flatMap(c => c.items.map(i => i.id))).size'), 88);
  assert.equal(run(`generateQuizQuestions(20000).every(q =>
    q.options.length === 4 && new Set(q.options.map(i => i.word + i.emoji)).size === 4 &&
    distinctCategories(categories.find(c => c.id === q.mainCatId), categories.find(c => c.id === q.oddCatId)) &&
    categories.find(c => c.id === q.oddCatId).items.some(i => i.id === q.options[q.correctIndex].id))`), true);
  assert.equal(run(`generateMatchQuestions(20000).every(q =>
    q.options.length === 4 && new Set(q.options.map(c => c.id)).size === 4 &&
    q.options.filter(c => c.id === q.correctId).length === 1 &&
    q.options.every(c => c.id === q.correctId || distinctCategories(c, {id:q.correctId})))`), true);
});

test('home, all flashcards, previous boundary and finish', () => {
  const { ids, run } = setup();
  assert.equal(ids['home-grid'].children.length, 11);
  run("openFlashcards('frutas'); fcPrev()");
  assert.equal(ids['fc-word'].textContent, 'Manzana');
  assert.equal(ids['fc-prev-btn'].disabled, true);
  run('for (let i = 0; i < 7; i++) fcNext()');
  assert.equal(ids['fc-num'].textContent, '8 / 8');
  assert.equal(ids['fc-next-btn'].textContent, 'Finalizar');
  run('fcNext()');
  assert.equal(run('activeTab'), 'home');
  assert.equal(run(`categories.every(cat => {
    openFlashcards(cat.id);
    return cat.items.every((item, index) => {
      const matches = document.getElementById('fc-word').textContent === item.word;
      fcNext();
      return matches;
    }) && activeTab === 'home';
  })`), true);
});

test('quiz and matching scores, duplicate-answer guards, resume, results and replay', () => {
  const { ids, run } = setup();
  run("showTab('quiz'); nextQuestion()");
  assert.equal(run('quizIndex'), 0);
  run('selectAnswer(quizQuestions[0].correctIndex); selectAnswer(quizQuestions[0].correctIndex)');
  assert.equal(run('qCorrect'), 1);
  run("showTab('home'); showTab('quiz')");
  assert.equal(run('qCorrect'), 1);
  run('nextQuestion(); for (let i = 1; i < 10; i++) { selectAnswer((quizQuestions[quizIndex].correctIndex + 1) % 4); nextQuestion(); }');
  assert.equal(ids['r-msg'].textContent, 'Respondiste 1 de 10 correctamente.');
  assert.equal(ids['q-total'].textContent, '10');
  run('restartQuiz()');
  assert.equal(run('qCorrect + qWrong'), 0);
  run("showTab('match'); nextMatchQuestion()");
  assert.equal(run('matchIndex'), 0);
  run('selectMatchAnswer(matchQuestions[0].correctId); selectMatchAnswer(matchQuestions[0].correctId)');
  assert.equal(run('mCorrect'), 1);
  run("showTab('home'); showTab('match')");
  assert.equal(run('mCorrect'), 1);
  run('nextMatchQuestion(); for (let i = 1; i < 12; i++) { selectMatchAnswer(matchQuestions[matchIndex].options.find(c => c.id !== matchQuestions[matchIndex].correctId).id); nextMatchQuestion(); }');
  assert.equal(ids['mr-msg'].textContent, 'Respondiste 1 de 12 correctamente.');
  assert.equal(ids['m-total'].textContent, '12');
  run('buildMatch()');
  assert.equal(run('mCorrect + mWrong'), 0);
});

test('local HTML asset references resolve after the folder move', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]).filter(ref => !/^https?:/.test(ref));
  for (const ref of refs) assert.ok(fs.existsSync(path.join(root, ref.split(/[?#]/)[0])), ref);
  assert.ok(html.indexOf('js/data.js') < html.indexOf('js/app.js'));
  assert.ok(refs.filter(ref=>/^(js|css)\//.test(ref)).every(ref=>ref.endsWith('?v=actions-1'))); 
});

test('images fall back on failure; stale image errors cannot overwrite the next word', () => {
  const { ids, run } = setup();
  run("renderVisual(document.getElementById('fc-emoji'), {image:'missing.png', emoji:'🐶'})");
  const img = ids['fc-emoji'].children[0];
  img.onerror();
  assert.equal(ids['fc-emoji'].textContent, '🐶');
  run("renderVisual(document.getElementById('fc-emoji'), {image:'old.png', emoji:'🐶'})");
  const old = ids['fc-emoji'].children[0];
  run("renderVisual(document.getElementById('fc-emoji'), {emoji:'🐱'})");
  old.onerror();
  assert.equal(ids['fc-emoji'].textContent, '🐱');
});

test('the interface and script contain no synthetic voice controls', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
  assert.doesNotMatch(html, /speechSynthesis|Escucha y elige|Ajustar voz|speak-btn/);
  assert.doesNotMatch(app, /speechSynthesis|SpeechSynthesisUtterance|speakText|listenQuestions/);
});

test('direction levels generate valid ordered instructions and distinct choices', () => {
  const { run } = setup();
  for (const level of [1, 2, 3]) {
    assert.equal(run(`Array.from({length: 200}, () => generateDirectionQuestions(6, ${level})).every(rounds =>
      rounds.length === 6 && rounds.every(q =>
        q.sequence.length === ${level} && q.options.length === ${Math.max(3, level + 1)} &&
        new Set(q.options.map(i => i.id)).size === q.options.length &&
        q.sequence.every(target => q.options.some(option => option.id === target.id))))`), true);
  }
  assert.equal(run("directionInstruction([{word:'Gato'}])"), 'Toca la imagen de gato.');
  assert.match(run("directionInstruction([{word:'Gato'}, {word:'Manzana'}, {word:'Carro'}])"), /Primero.+Luego.+Al final/);
  assert.equal(run("directionInstruction([categories.find(c => c.id === 'colores').items.find(i => i.word === 'Negro')])"), 'Toca el color negro.');
});

test('following directions supports ordered steps, gentle retries, resume and adult summary', () => {
  const { run, ids } = setup();
  run("showTab('directions'); nextDirectionQuestion(); startDirections(2)");
  assert.equal(run('directionIndex'), 0);
  assert.equal(ids['d-options'].children.length, 3);
  assert.equal(ids['d-adult-instruction'].textContent, run('directionInstruction(directionsQuestions[0].sequence)'));
  assert.ok(ids['d-options'].children.every(button => button.attributes['aria-label']));

  run(`selectDirectionItem(directionsQuestions[0].options.findIndex(item =>
    item.id !== directionsQuestions[0].sequence[0].id))`);
  assert.equal(run('directionStepIndex'), 0);
  assert.equal(run('directionHadSupport'), true);
  assert.match(ids['d-feedback'].textContent, /comenzar desde el principio/);

  run(`selectDirectionItem(directionsQuestions[0].options.findIndex(item =>
    item.id === directionsQuestions[0].sequence[0].id))`);
  assert.equal(run('directionStepIndex'), 1);
  assert.equal(run('directionAnswered'), false);
  assert.equal(ids['d-step-progress'].children[0].textContent, '✓');
  run(`selectDirectionItem(directionsQuestions[0].options.findIndex(item =>
    item.id === directionsQuestions[0].sequence[1].id))`);
  assert.equal(run('directionAnswered'), true);
  assert.equal(run('directionsWithSupport'), 1);

  const instructionBeforeResume = ids['d-adult-instruction'].textContent;
  run("goHome(); showTab('directions')");
  assert.equal(ids['d-adult-instruction'].textContent, instructionBeforeResume);
  run('nextDirectionQuestion()');
  assert.equal(run('directionIndex'), 1);
  assert.equal(ids['d-adult-instruction'].textContent, run('directionInstruction(directionsQuestions[1].sequence)'));

  run(`for (let round = 1; round < 6; round++) {
    const q = directionsQuestions[directionIndex];
    q.sequence.forEach(target => selectDirectionItem(q.options.findIndex(item => item.id === target.id)));
    nextDirectionQuestion();
  }`);
  assert.equal(ids['directions-result'].style.display, 'block');
  assert.equal(ids['dr-msg'].textContent, 'Nivel 2: 5 al primer intento y 1 con repetición o apoyo.');
  run('restartDirections()');
  assert.equal(run('directionIndex + directionsFirstTry + directionsWithSupport'), 0);
  run('showDirectionsSetup()');
  assert.equal(run('directionsQuestions.length'), 0);
  assert.equal(ids['directions-setup'].style.display, 'block');
});

test('three-step directions expose four choices and a complete adult prompt', () => {
  const { run, ids } = setup();
  run("showTab('directions'); startDirections(3)");
  assert.equal(ids['d-options'].children.length, 4);
  assert.equal(ids['d-step-progress'].children.length, 3);
  assert.match(ids['d-adult-instruction'].textContent, /Al final/);
});

test('expressive-language content resolves to the vocabulary and creates unique sessions', () => {
  const { run } = setup();
  assert.equal(run('expressiveProfiles.length'), 27);
  assert.equal(run('new Set(expressiveProfiles.map(profile => profile.id)).size'), 27);
  assert.equal(run(`expressiveProfiles.every(profile =>
    vocabularyItemById(profile.id) && profile.category && profile.attributes.length >= 3 &&
    profile.function && profile.location && profile.model)`), true);
  assert.equal(run(`expressiveComparePairs.every(pair =>
    pair.ids.length === 2 && pair.ids.every(vocabularyItemById) &&
    pair.same && pair.different && pair.model)`), true);
  for (const level of ['name', 'describe', 'compare']) {
    assert.equal(run(`Array.from({length: 100}, () => generateExpressiveQuestions(6, '${level}')).every(rounds =>
      rounds.length === 6 && new Set(rounds.map(q => q.id || q.ids.join('|'))).size === 6)`), true);
  }
});

test('describe and compare reveals optional supports and records adult-observed outcomes', () => {
  const { run, ids } = setup();
  run("showTab('expressive'); nextExpressiveQuestion(); startExpressive('name')");
  assert.equal(run('expressiveIndex'), 0);
  assert.equal(ids['e-stage'].children.length, 1);
  assert.equal(ids['e-stage'].children[0].children.length, 1);
  assert.equal(ids['e-support'].style.display, 'none');

  run('showExpressiveSupport()');
  assert.equal(run('expressiveSupportShown'), true);
  assert.equal(ids['e-support'].style.display, 'block');
  assert.ok(ids['e-support'].children.length >= 3);
  run("recordExpressiveOutcome('invalid'); recordExpressiveOutcome('cue'); recordExpressiveOutcome('cue')");
  assert.equal(run('expressiveCounts.cue'), 1);
  const promptBeforeResume = ids['e-prompt'].textContent;
  run("goHome(); showTab('expressive')");
  assert.equal(ids['e-prompt'].textContent, promptBeforeResume);
  run('nextExpressiveQuestion()');
  assert.equal(run('expressiveIndex'), 1);

  run(`for (let round = 1; round < 6; round++) {
    recordExpressiveOutcome(round === 5 ? 'practice' : 'independent');
    nextExpressiveQuestion();
  }`);
  assert.equal(ids['expressive-result'].style.display, 'block');
  assert.equal(ids['er-msg'].textContent, 'Nombra: 4 sin ayuda, 1 con una pista, 0 repitiendo un modelo y 1 para seguir practicando.');

  run("restartExpressive(); showExpressiveSetup(); startExpressive('compare')");
  assert.equal(ids['e-stage'].children.length, 2);
  assert.equal(ids['e-stage'].children[0].children.length, 2);
  assert.match(ids['e-prompt'].textContent, /se parecen/);
  run('showExpressiveSupport()');
  assert.equal(ids['e-support'].children.length, 4);
});


test('translation dictionaries cover all 88 stable vocabulary IDs and 11 categories', () => {
 const {run}=setup();
 assert.equal(run('Object.keys(enLocale.items).length'),88);
 assert.equal(run('Object.keys(ptLocale.items).length'),88);
 assert.equal(run('categories.every(c=>enLocale.categories[c.id] && ptLocale.categories[c.id] && c.items.every(i=>enLocale.items[i.id] && ptLocale.items[i.id]))'),true);
 assert.equal(run('expressiveProfiles.every(p=>enLocale.profiles[p.id] && ptLocale.profiles[p.id])'),true);
 assert.equal(run('enLocale.comparePairs.length===expressiveComparePairs.length && ptLocale.comparePairs.length===expressiveComparePairs.length'),true);
});

test('language switching updates vocabulary, directions, profiles and resets quiz state',()=>{
 const {run,ids}=setup();
 run('setLanguage("en")');
 assert.equal(run('currentCat'),null); // no card selected yet
 run('openFlashcards("animales")');
 assert.equal(ids['fc-word'].textContent,'Dog');
 assert.equal(run('categories[0].name'),'Animals');
 assert.equal(run('directionInstruction([{id:"animales-perro",word:"Dog"}])'),'Tap the picture of the dog.');
 run('showTab("quiz");selectAnswer(quizQuestions[0].correctIndex)');
 assert.equal(run('qCorrect'),1);
 run('setLanguage("pt")');
 assert.equal(run('qCorrect'),0);
 assert.equal(run('categories[0].items[0].word'),'Cachorro');
 run('setLanguage("es"); openFlashcards("animales")');
 assert.equal(ids['fc-word'].textContent,'Perro');
});

test('Lugares has eight entries translated in three languages with safe distractors', () => {
 const {run,ids}=setup();
 assert.equal(run('categories.length'),11);
 assert.equal(run("categories.find(c=>c.id==='lugares').items.length"),8);
 assert.equal(run("!distinctCategories(categories.find(c=>c.id==='lugares'),categories.find(c=>c.id==='naturaleza'))"),true);
 assert.equal(run("!distinctCategories(categories.find(c=>c.id==='lugares'),categories.find(c=>c.id==='escuela'))"),true);
 for(const [lang,name,words] of [
  ['es','Lugares',['Parque','Cine','Playa','Río','Hospital','Escuela','Aeropuerto','Restaurante']],
  ['en','Places',['Park','Movie theater','Beach','River','Hospital','School','Airport','Restaurant']],
  ['pt','Lugares',['Parque','Cinema','Praia','Rio','Hospital','Escola','Aeroporto','Restaurante']]
 ]) {
  run('setLanguage('+JSON.stringify(lang)+'); openFlashcards("lugares")');
  assert.equal(run('currentCat.name'),name);
  assert.equal(ids['fc-word'].textContent,words[0]);
  assert.equal(run('currentCat.items.map(i=>i.word).join("|")'),words.join('|'));
  assert.equal(run("generateQuizQuestions(500).every(q=>q.options.length===4&&new Set(q.options.map(i=>i.word+'|'+i.emoji)).size===4)"),true);
  assert.equal(run("generateMatchQuestions(200).every(q=>q.options.length===4&&new Set(q.options.map(i=>i.id)).size===4)"),true);
  assert.equal(run("expressiveProfiles.filter(p=>p.id.startsWith('lugares-')).length"),3);
  assert.equal(run("expressiveComparePairs.some(p=>p.ids[0]==='lugares-parque'&&p.ids[1]==='lugares-playa')"),true);
 }
});


test('actions cover every locale and all three levels with real scene assets',()=>{
 const {run}=setup();
 for(const lang of ['es','en','pt']) {
  run('setLanguage('+JSON.stringify(lang)+');showTab("actions")');
  assert.equal(run('actionText().scenes.length'),6);
  assert.equal(run('actionText().scenes.every(s=>s.length===6 && s.every(Boolean))'),true);
  for(let level=1;level<=3;level++) {
   run('startActions('+level+')');
   assert.equal(run('actionState.questions.length'),6);
   assert.equal(run('new Set(actionState.questions.map(s=>s[0])).size'),6);
   const assets=JSON.parse(run('JSON.stringify(actionState.questions.map(s=>s[0]))'));
   assets.forEach(id=>assert.ok(fs.existsSync(path.join(root,'img/actions',id+'.svg'))));
  }
 }
});
test('actions guard scoring and navigation, track revealed support, resume and reset by language',()=>{
 const {run,document}=setup();run('showTab("actions");startActions(3);nextAction()');
 assert.equal(run('actionState.index'),0);
 const findButtons=()=>document.getElementById('screen-actions').children.flatMap(function walk(e){return [e,...e.children.flatMap(walk)];});
 findButtons().find(b=>b.textContent==='Mostrar modelo').onclick();
 run('recordActionOutcome(0);recordActionOutcome(0)');
 assert.equal(run('actionState.counts[2]'),1);
 run('showTab("home");nextAction();showTab("actions")');
 assert.equal(run('actionState.index'),0);
 run('nextAction();for(let i=1;i<6;i++){recordActionOutcome(i===5?3:0);nextAction();}nextAction()');
 assert.equal(run('actionState.counts.reduce((a,b)=>a+b,0)'),6);
 assert.ok(document.getElementById('action-summary'));
 run('setLanguage("en")');assert.equal(run('actionState.questions.length'),0);
 assert.equal(document.getElementById('actions-nav').textContent,'Actions');
 run('actionState.count=3;actionState.scene="read";showTab("actions");startActions(1)');
 assert.equal(run('actionState.questions.length'),3);
 assert.equal(run('actionState.questions.every(s=>s[0]==="read")'),true);
 run('recordActionOutcome(7)');assert.equal(run('actionState.answered'),false);
});
