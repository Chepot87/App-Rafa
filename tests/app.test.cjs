// Dependency-free logic tests. These do not replace real browser/device checks.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');

function setup(speech = true) {
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
    removeAttribute(key) { delete this.attributes[key]; }
    addEventListener(key, fn) { this.listeners[key] = fn; }
    focus() { this.focused = true; }
    querySelector() { return new Element(); }
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const ids = Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(m => [m[1], new Element()]));
  const nav = Array.from({ length: 4 }, () => new Element());
  const listeners = {};
  const document = {
    hidden: false,
    getElementById: id => ids[id] || null,
    createElement: () => new Element(),
    addEventListener: (name, fn) => { listeners[name] = fn; },
    querySelectorAll: selector => {
      if (selector === '.nav-btn') return nav;
      if (selector === '.screen') return Object.entries(ids).filter(([id]) => id.startsWith('screen-')).map(([, el]) => el);
      if (selector === '.quiz-opt') return ids['q-options'].children;
      if (selector === '.match-opt') return ids['m-options'].children;
      throw new Error(`Unexpected selector ${selector}`);
    }
  };
  let timerId = 0;
  const timers = new Map();
  const spoken = [];
  const window = { addEventListener() {} };
  function Utterance(text) { this.text = text; }
  if (speech) {
    window.SpeechSynthesisUtterance = Utterance;
    window.speechSynthesis = { cancel() {}, getVoices: () => [{ lang: 'en-US' }, { lang: 'es-MX' }, { lang: 'es-ES' }], speak: u => spoken.push(u) };
  }
  const context = vm.createContext({ document, window, SpeechSynthesisUtterance: Utterance,
    setTimeout: fn => { timers.set(++timerId, fn); return timerId; }, clearTimeout: id => timers.delete(id) });
  const run = source => vm.runInContext(source, context);
  run(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8'));
  run(fs.readFileSync(path.join(root, 'js/app.js'), 'utf8'));
  return { ids, run, timers, spoken, listeners, document };
}

test('all vocabulary has unique IDs; generated questions have one distinct answer', () => {
  const { run } = setup();
  assert.equal(run('new Set(categories.flatMap(c => c.items.map(i => i.id))).size'), 80);
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
  assert.equal(ids['home-grid'].children.length, 10);
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

test('speech timers cancel on navigation, manual playback and toggle-off', () => {
  const { ids, run, timers, spoken } = setup();
  ids.autoSpeakToggle.checked = true;
  run("openFlashcards('animales'); fcNext(); fcNext()");
  assert.equal(timers.size, 1);
  run('speakCurrentWord()');
  assert.equal(timers.size, 0);
  assert.equal(spoken[0].text, 'Vaca');
  assert.equal(spoken[0].lang, 'es-ES');
  run('fcNext(); goHome()');
  assert.equal(timers.size, 0);
  run("openFlashcards('frutas')");
  ids.autoSpeakToggle.checked = false;
  ids.autoSpeakToggle.listeners.change({ target: ids.autoSpeakToggle });
  assert.equal(timers.size, 0);
});

test('unsupported speech reports an inline message', () => {
  const { ids, run } = setup(false);
  run("openFlashcards('animales'); speakCurrentWord()");
  assert.match(ids['speech-status'].textContent, /no está disponible/);
});

test('local HTML asset references resolve after the folder move', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]).filter(ref => !/^https?:/.test(ref));
  for (const ref of refs) assert.ok(fs.existsSync(path.join(root, ref)), ref);
  assert.ok(html.indexOf('js/data.js') < html.indexOf('js/app.js'));
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
