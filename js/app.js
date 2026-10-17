let activeTab = 'home';
let quizAnswered = false;
let matchAnswered = false;

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function distinctCategories(a, b) {
  return a.id !== b.id && !overlappingCategories.some(pair => pair.includes(a.id) && pair.includes(b.id));
}

// Each visual has an adjacent word label, so avoid announcing it twice.
function renderVisual(container, item) {
  container.replaceChildren();
  container.setAttribute('aria-hidden', 'true');
  if (!item.image) { container.textContent = item.emoji || '🖼️'; return; }
  const img = document.createElement('img');
  img.alt = '';
  img.className = 'vocabulary-image';
  img.onerror = () => {
    if (img.parentNode !== container) return;
    container.replaceChildren();
    container.textContent = item.emoji || '🖼️';
  };
  img.src = item.image;
  container.appendChild(img);
}

function focusElement(element) {
  if (!element) return;
  element.tabIndex = -1;
  element.focus();
}

let currentCat = null;
let fcIndex = 0;

let quizQuestions = [];
let quizIndex = 0;
let qCorrect = 0;
let qWrong = 0;

function buildHome() {
  const grid = document.getElementById("home-grid");
  grid.innerHTML = "";

  categories.forEach((cat) => {
    const card = document.createElement("button");
    card.type = 'button';
    card.className = "cat-card";
    card.innerHTML = `
      <span class="emoji" aria-hidden="true">${cat.emoji}</span>
      <span class="cat-name">${cat.name}</span>
      <span class="cat-count">${tf("wordCount", {count: cat.items.length})}</span>
    `;
    card.onclick = () => openFlashcards(cat.id);
    grid.appendChild(card);
  });
}

function setActiveNav(tab) {
  const map = {
    home: 0,
    flashcards: 1,
    quiz: 2,
    match: 3,
    directions: 4,
    expressive: 5
  };

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
    btn.removeAttribute('aria-current');
  });

  const buttons = document.querySelectorAll(".nav-btn");
  const index = map[tab];

  if (buttons[index]) {
    buttons[index].classList.add("active");
    buttons[index].setAttribute('aria-current', 'page');
  }
}

function showTab(tab) {
  if (!document.getElementById(`screen-${tab}`)) return;
  activeTab = tab;
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(`screen-${tab}`);
  if (target) {
    target.classList.add("active");
  }

  setActiveNav(tab);

  if (tab === "flashcards" && currentCat) {
    renderFlashcard();
  }

  if (tab === "quiz" && quizQuestions.length === 0) {
    buildQuiz();
  }

  if (tab === "match" && matchQuestions.length === 0) {
    buildMatch();
  }
  focusElement(target.querySelector('h2'));
}

function goHome() {
  showTab("home");
}

function openFlashcards(catId) {
  const category = categories.find((cat) => cat.id === catId);
  if (!category) return;
  currentCat = category;
  fcIndex = 0;
  showTab("flashcards");
}

function openDefaultFlashcards() {
  if (!currentCat) {
    currentCat = categories[0];
    fcIndex = 0;
  }

  showTab("flashcards");
}

function renderFlashcard() {
  if (!currentCat || currentCat.items.length === 0) return;

  const item = currentCat.items[fcIndex];
  const total = currentCat.items.length;

  document.getElementById("flashcard-category-title").textContent = currentCat.name;
  document.getElementById("flashcard-category-subtitle").textContent = tf("flashSubtitle");
  document.getElementById("fc-num").textContent = `${fcIndex + 1} / ${total}`;
  renderVisual(document.getElementById("fc-emoji"), item);
  document.getElementById('fc-prev-btn').disabled = fcIndex === 0;
  document.getElementById("fc-word").textContent = item.word;
  document.getElementById("fc-progress").style.width = `${((fcIndex + 1) / total) * 100}%`;

  const nextBtn = document.getElementById("fc-next-btn");
  nextBtn.textContent = fcIndex === total - 1 ? tf("finish") : tf("next");

  const card = document.getElementById("flashcard");
  card.style.animation = "none";
  card.offsetHeight;
  card.style.animation = "fadePop 0.28s ease";

}

function fcNext() {
  if (!currentCat) return;

  if (fcIndex < currentCat.items.length - 1) {
    fcIndex++;
    renderFlashcard();
  } else {
    goHome();
  }
}

function fcPrev() {
  if (!currentCat) return;

  if (fcIndex > 0) {
    fcIndex--;
    renderFlashcard();
  }
}

function buildQuiz() {
  quizQuestions = generateQuizQuestions(10);
  quizIndex = 0;
  qCorrect = 0;
  qWrong = 0;

  document.getElementById("quiz-game").style.display = "block";
  document.getElementById("quiz-result").style.display = "none";

  updateScoreUI();
  renderQuestion();
  focusElement(document.getElementById("q-subtitle"));
}

function generateQuizQuestions(count) {
  const questions = [];

  for (let i = 0; i < count; i++) {
    const mainCat = categories[Math.floor(Math.random() * categories.length)];
    const otherCats = categories.filter((cat) => distinctCategories(cat, mainCat));
    const oddCat = otherCats[Math.floor(Math.random() * otherCats.length)];

    const mainItems = shuffle(mainCat.items).slice(0, 3);

    const candidates = oddCat.items.filter(item => !mainItems.some(other => other.word === item.word || other.emoji === item.emoji));
    const oddItem = candidates[Math.floor(Math.random() * candidates.length)];

    const options = shuffle([...mainItems, oddItem]);

    questions.push({
      mainCat: mainCat.name,
      mainCatId: mainCat.id,
      oddCatId: oddCat.id,
      options,
      correctIndex: options.findIndex(
        (item) => item.id === oddItem.id
      )
    });
  }

  return questions;
}

function renderQuestion() {
  quizAnswered = false;
  const q = quizQuestions[quizIndex];
  if (!q) return;

  document.getElementById("q-question").textContent = tf("quizQuestion");
  document.getElementById("q-subtitle").textContent = tf("quizSubtitle", {number: quizIndex + 1, total: quizQuestions.length, category: categories.find(c => c.id === q.mainCatId).name});
  document.getElementById("q-feedback").textContent = "";
  document.getElementById("q-feedback").className = "quiz-feedback";
  document.getElementById("q-next").style.display = "none";

  const optionsWrap = document.getElementById("q-options");
  optionsWrap.innerHTML = "";

  q.options.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt";
    const visual = document.createElement('span');
    visual.className = 'opt-emoji';
    renderVisual(visual, item);
    const label = document.createElement('span');
    label.textContent = item.word;
    btn.append(visual, label);
    btn.onclick = () => selectAnswer(index);
    optionsWrap.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  const q = quizQuestions[quizIndex];
  if (!q || quizAnswered || !Number.isInteger(selectedIndex) || !q.options[selectedIndex]) return;
  quizAnswered = true;

  const buttons = document.querySelectorAll(".quiz-opt");
  const feedback = document.getElementById("q-feedback");

  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  if (selectedIndex === q.correctIndex) {
    buttons[selectedIndex].classList.add("correct");
    feedback.textContent = tf("quizGood");
    feedback.className = "quiz-feedback correct";
    qCorrect++;
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[q.correctIndex].classList.add("correct");
    feedback.textContent = tf("quizWrong", {word:q.options[q.correctIndex].word});
    feedback.className = "quiz-feedback wrong";
    qWrong++;
  }

  updateScoreUI();

  const nextBtn = document.getElementById("q-next");
  nextBtn.style.display = "inline-flex";
  nextBtn.textContent =
    quizIndex === quizQuestions.length - 1 ? tf("seeResult") : tf("next");
  nextBtn.focus();
}

function nextQuestion() {
  if (!quizAnswered || quizIndex >= quizQuestions.length) return;
  quizIndex++;

  if (quizIndex >= quizQuestions.length) {
    showResult();
    return;
  }

  renderQuestion();
  focusElement(document.getElementById("q-subtitle"));
}

function updateScoreUI() {
  document.getElementById("q-correct").textContent = qCorrect;
  document.getElementById("q-wrong").textContent = qWrong;
  document.getElementById("q-total").textContent = qCorrect + qWrong;
}

function showResult() {
  document.getElementById("quiz-game").style.display = "none";
  document.getElementById("quiz-result").style.display = "block";

  const total = quizQuestions.length;
  const percent = Math.round((qCorrect / total) * 100);

  let emoji = "💪";
  let title = tf("resultTry");

  if (percent >= 90) {
    emoji = "🏆";
    title = tf("resultExcellent");
  } else if (percent >= 70) {
    emoji = "🌟";
    title = tf("quizGood");
  } else if (percent >= 50) {
    emoji = "😊";
    title = tf("resultGood");
  }

  document.getElementById("r-emoji").textContent = emoji;
  document.getElementById("r-title").textContent = title;
  document.getElementById("r-msg").textContent =
    tf("quizSummary", {correct:qCorrect,total});
  focusElement(document.getElementById("r-msg"));
}

function restartQuiz() {
  buildQuiz();
}

// ── EMPAREJA ──────────────────────────────────────────────────────────────────

let matchQuestions = [];
let matchIndex = 0;
let mCorrect = 0;
let mWrong = 0;

function buildMatch() {
  matchQuestions = generateMatchQuestions(12);
  matchIndex = 0;
  mCorrect = 0;
  mWrong = 0;

  document.getElementById("match-game").style.display = "block";
  document.getElementById("match-result").style.display = "none";

  updateMatchScore();
  renderMatchQuestion();
  focusElement(document.getElementById("m-word"));
}

function generateMatchQuestions(count) {
  const questions = [];

  for (let i = 0; i < count; i++) {
    const correctCat = categories[Math.floor(Math.random() * categories.length)];
    const item = correctCat.items[Math.floor(Math.random() * correctCat.items.length)];

    const others = shuffle(categories.filter(c => distinctCategories(c, correctCat))).slice(0, 3);

    const options = shuffle([...others, correctCat]);

    questions.push({
      item,
      correctId: correctCat.id,
      options: options.map((c) => ({ id: c.id, name: c.name, emoji: c.emoji }))
    });
  }

  return questions;
}

function renderMatchQuestion() {
  matchAnswered = false;
  const q = matchQuestions[matchIndex];
  if (!q) return;

  renderVisual(document.getElementById("m-emoji"), q.item);
  document.getElementById('m-progress').textContent = tf("matchQuestion", {number:matchIndex+1,total:matchQuestions.length});
  document.getElementById("m-word").textContent = q.item.word;
  document.getElementById("m-feedback").textContent = "";
  document.getElementById("m-feedback").className = "quiz-feedback";
  document.getElementById("m-next").style.display = "none";

  const wrap = document.getElementById("m-options");
  wrap.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "match-opt";
    btn.dataset.id = opt.id;
    btn.innerHTML = `<span class="opt-cat-emoji" aria-hidden="true">${opt.emoji}</span>${opt.name}`;
    btn.onclick = () => selectMatchAnswer(opt.id);
    wrap.appendChild(btn);
  });
}

function selectMatchAnswer(selectedId) {
  const q = matchQuestions[matchIndex];
  if (!q || matchAnswered || !q.options.some(opt => opt.id === selectedId)) return;
  matchAnswered = true;

  const buttons = document.querySelectorAll(".match-opt");
  const feedback = document.getElementById("m-feedback");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.id === q.correctId) btn.classList.add("correct");
    else if (btn.dataset.id === selectedId) btn.classList.add("wrong");
  });

  if (selectedId === q.correctId) {
    feedback.textContent = tf("matchGood");
    feedback.className = "quiz-feedback correct";
    mCorrect++;
  } else {
    const correctOpt = q.options.find((o) => o.id === q.correctId);
    feedback.textContent = tf("matchWrong", {category: correctOpt.name});
    feedback.className = "quiz-feedback wrong";
    mWrong++;
  }

  updateMatchScore();

  const nextBtn = document.getElementById("m-next");
  nextBtn.style.display = "inline-flex";
  nextBtn.textContent =
    matchIndex === matchQuestions.length - 1 ? tf("seeResult") : tf("next");
  nextBtn.focus();
}

function nextMatchQuestion() {
  if (!matchAnswered || matchIndex >= matchQuestions.length) return;
  matchIndex++;

  if (matchIndex >= matchQuestions.length) {
    showMatchResult();
    return;
  }

  renderMatchQuestion();
  focusElement(document.getElementById("m-word"));
}

function updateMatchScore() {
  document.getElementById("m-correct").textContent = mCorrect;
  document.getElementById("m-wrong").textContent = mWrong;
  document.getElementById("m-total").textContent = mCorrect + mWrong;
}

function showMatchResult() {
  document.getElementById("match-game").style.display = "none";
  document.getElementById("match-result").style.display = "block";

  const total = matchQuestions.length;
  const percent = Math.round((mCorrect / total) * 100);

  let emoji = "💪";
  let title = tf("matchTry");

  if (percent >= 90) {
    emoji = "🏆";
    title = tf("resultExcellent");
  } else if (percent >= 70) {
    emoji = "🌟";
    title = tf("quizGood");
  } else if (percent >= 50) {
    emoji = "😊";
    title = tf("resultGood");
  }

  document.getElementById("mr-emoji").textContent = emoji;
  document.getElementById("mr-title").textContent = title;
  document.getElementById("mr-msg").textContent =
    tf("quizSummary", {correct:mCorrect,total});
  focusElement(document.getElementById("mr-msg"));
}

// ── SIGUE LA INSTRUCCIÓN ────────────────────────────────────────────────────

let directionsQuestions = [];
let directionsLevel = 1;
let directionIndex = 0;
let directionStepIndex = 0;
let directionAnswered = false;
let directionHadSupport = false;
let directionsFirstTry = 0;
let directionsWithSupport = 0;

function directionVocabulary() {
  const vocabulary = categories.flatMap(cat => cat.items);
  return vocabulary.filter((item, index) => vocabulary.findIndex(other =>
    other.word === item.word || other.emoji === item.emoji ||
    (item.image && other.image === item.image)) === index);
}

function directionInstruction(sequence) {
  const phrases = sequence.map(item => {
    const category = categories.find(cat => cat.items.some(candidate => candidate.id === item.id));
    const name = item.word.toLocaleLowerCase(currentLanguage);
    return category && category.id === 'colores' ? tf("colorPhrase", {word:name}) : tf("imagePhrase", {word:name});
  });
  if (phrases.length === 1) return tf("directionOne",{first:phrases[0]});
  if (phrases.length === 2) {
    return tf("directionTwo",{first:phrases[0],second:phrases[1]});
  }
  return tf("directionThree",{first:phrases[0],second:phrases[1],third:phrases[2]});
}

function generateDirectionQuestions(count, level) {
  const steps = Math.max(1, Math.min(3, Number(level) || 1));
  const vocabulary = directionVocabulary();
  const targets = shuffle(vocabulary).slice(0, count * steps);
  const questions = [];
  for (let i = 0; i < count; i++) {
    const sequence = targets.slice(i * steps, (i + 1) * steps);
    const optionCount = Math.max(3, steps + 1);
    const distractors = shuffle(vocabulary.filter(item =>
      !sequence.some(target => target.id === item.id))).slice(0, optionCount - steps);
    questions.push({ sequence, options: shuffle([...sequence, ...distractors]) });
  }
  return questions;
}

function showDirectionsSetup() {
  directionsQuestions = [];
  directionIndex = 0;
  document.getElementById('directions-setup').style.display = 'block';
  document.getElementById('directions-game').style.display = 'none';
  document.getElementById('directions-result').style.display = 'none';
  focusElement(document.getElementById('directions-setup').querySelector('h3'));
}

function startDirections(level) {
  directionsLevel = Math.max(1, Math.min(3, Number(level) || 1));
  directionsQuestions = generateDirectionQuestions(6, directionsLevel);
  directionIndex = 0;
  directionsFirstTry = 0;
  directionsWithSupport = 0;
  document.getElementById('directions-setup').style.display = 'none';
  document.getElementById('directions-game').style.display = 'block';
  document.getElementById('directions-result').style.display = 'none';
  renderDirectionQuestion();
}

function restartDirections() {
  startDirections(directionsLevel);
}

function renderDirectionQuestion() {
  const question = directionsQuestions[directionIndex];
  if (!question) return;
  directionStepIndex = 0;
  directionAnswered = false;
  directionHadSupport = false;
  const instruction = directionInstruction(question.sequence);
  document.getElementById('d-progress').textContent =
    tf("directionsProgress",{number:directionIndex+1,total:directionsQuestions.length,level:directionsLevel});
  document.getElementById('d-adult-instruction').textContent = instruction;
  document.getElementById('d-feedback').textContent = '';
  document.getElementById('d-feedback').className = 'quiz-feedback';
  document.getElementById('d-next').style.display = 'none';
  renderDirectionSteps();

  const wrap = document.getElementById('d-options');
  wrap.replaceChildren();
  question.options.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'direction-opt';
    button.setAttribute('aria-label', item.word);
    const visual = document.createElement('span');
    visual.className = 'direction-visual';
    renderVisual(visual, item);
    button.appendChild(visual);
    button.onclick = () => selectDirectionItem(index);
    wrap.appendChild(button);
  });
  focusElement(document.getElementById('d-adult-instruction'));
}

function renderDirectionSteps() {
  const question = directionsQuestions[directionIndex];
  const wrap = document.getElementById('d-step-progress');
  wrap.replaceChildren();
  question.sequence.forEach((item, index) => {
    const step = document.createElement('span');
    step.className = index < directionStepIndex ? 'step-dot complete' : 'step-dot';
    step.textContent = index < directionStepIndex ? '✓' : String(index + 1);
    wrap.appendChild(step);
  });
}

function resetDirectionAttempt() {
  directionStepIndex = 0;
  Array.from(document.getElementById('d-options').children).forEach(button => {
    button.disabled = false;
    button.classList.remove('selected');
  });
  renderDirectionSteps();
}

function selectDirectionItem(index) {
  const question = directionsQuestions[directionIndex];
  if (activeTab !== 'directions' || !question || directionAnswered ||
      !Number.isInteger(index) || !question.options[index]) return;
  const selected = question.options[index];
  const expected = question.sequence[directionStepIndex];
  const feedback = document.getElementById('d-feedback');
  if (selected.id !== expected.id) {
    directionHadSupport = true;
    resetDirectionAttempt();
    feedback.textContent = tf('directionsRetry');
    feedback.className = 'quiz-feedback';
    return;
  }

  const button = document.getElementById('d-options').children[index];
  button.disabled = true;
  button.classList.add('selected');
  directionStepIndex++;
  renderDirectionSteps();
  if (directionStepIndex < question.sequence.length) {
    feedback.textContent = tf('directionsContinue');
    return;
  }

  directionAnswered = true;
  if (directionHadSupport) directionsWithSupport++;
  else directionsFirstTry++;
  feedback.textContent = tf('directionsWellDone');
  feedback.className = 'quiz-feedback correct';
  Array.from(document.getElementById('d-options').children).forEach(option => { option.disabled = true; });
  const next = document.getElementById('d-next');
  next.textContent = directionIndex === directionsQuestions.length - 1 ? tf('seeSummary') : tf('next');
  next.style.display = 'inline-flex';
  next.focus();
}

function nextDirectionQuestion() {
  if (activeTab !== 'directions' || !directionAnswered || directionIndex >= directionsQuestions.length) return;
  directionIndex++;
  if (directionIndex < directionsQuestions.length) {
    renderDirectionQuestion();
    return;
  }
  document.getElementById('directions-game').style.display = 'none';
  document.getElementById('directions-result').style.display = 'block';
  document.getElementById('dr-msg').textContent =
    tf("directionsSummary",{level:directionsLevel, independent:directionsFirstTry,supported:directionsWithSupport});
  focusElement(document.getElementById('dr-msg'));
}

// ── DESCRIBE Y COMPARA ─────────────────────────────────────────────────────

let expressiveQuestions = [];
let expressiveLevel = 'name';
let expressiveIndex = 0;
let expressiveAnswered = false;
let expressiveSupportShown = false;
let expressiveCounts = { independent: 0, cue: 0, model: 0, practice: 0 };

function vocabularyItemById(id) {
  return categories.flatMap(category => category.items).find(item => item.id === id);
}

function generateExpressiveQuestions(count, level) {
  const safeCount = Math.max(0, Number(count) || 0);
  if (level === 'compare') {
    return shuffle(expressiveComparePairs).slice(0, safeCount).map(pair => ({
      ...pair,
      items: pair.ids.map(vocabularyItemById)
    }));
  }
  return shuffle(expressiveProfiles).slice(0, safeCount).map(profile => ({
    ...profile,
    item: vocabularyItemById(profile.id)
  }));
}

function expressiveLevelName(level) {
  return { name: tf('expressiveName'), describe: tf('expressiveDescribe'), compare: tf('expressiveCompare') }[level] || tf('expressiveName');
}

function showExpressiveSetup() {
  expressiveQuestions = [];
  expressiveIndex = 0;
  document.getElementById('expressive-setup').style.display = 'block';
  document.getElementById('expressive-game').style.display = 'none';
  document.getElementById('expressive-result').style.display = 'none';
  focusElement(document.getElementById('expressive-setup').querySelector('h3'));
}

function startExpressive(level) {
  expressiveLevel = ['name', 'describe', 'compare'].includes(level) ? level : 'name';
  expressiveQuestions = generateExpressiveQuestions(6, expressiveLevel);
  expressiveIndex = 0;
  expressiveCounts = { independent: 0, cue: 0, model: 0, practice: 0 };
  document.getElementById('expressive-setup').style.display = 'none';
  document.getElementById('expressive-game').style.display = 'block';
  document.getElementById('expressive-result').style.display = 'none';
  renderExpressiveQuestion();
}

function restartExpressive() {
  startExpressive(expressiveLevel);
}

function createExpressiveVisual(item, showWord) {
  const card = document.createElement('div');
  card.className = 'expressive-visual-card';
  card.setAttribute('aria-label', item.word);
  const visual = document.createElement('div');
  visual.className = 'expressive-visual';
  renderVisual(visual, item);
  card.appendChild(visual);
  if (showWord) {
    const word = document.createElement('strong');
    word.className = 'expressive-word';
    word.textContent = item.word;
    card.appendChild(word);
  }
  return card;
}

function expressivePrompt(question) {
  if (expressiveLevel === 'name') return tf('expressiveWhat');
  if (expressiveLevel === 'describe') return tf('expressiveTell',{word:question.item.word.toLocaleLowerCase(currentLanguage)});
  return tf('expressiveComparePrompt');
}

function renderExpressiveQuestion() {
  const question = expressiveQuestions[expressiveIndex];
  if (!question) return;
  expressiveAnswered = false;
  expressiveSupportShown = false;
  document.getElementById('e-progress').textContent =
    tf("expressiveProgress",{level:expressiveLevelName(expressiveLevel),number:expressiveIndex+1,total:expressiveQuestions.length});
  document.getElementById('e-prompt').textContent = expressivePrompt(question);
  document.getElementById('e-feedback').textContent = '';
  document.getElementById('e-feedback').className = 'quiz-feedback';
  document.getElementById('e-next').style.display = 'none';
  const support = document.getElementById('e-support');
  support.style.display = 'none';
  support.replaceChildren();
  const supportButton = document.getElementById('e-support-btn');
  supportButton.style.display = 'inline-flex';
  supportButton.disabled = false;
  Array.from(document.getElementById('e-outcomes').children).forEach(button => { button.disabled = false; });

  const stage = document.getElementById('e-stage');
  stage.replaceChildren();
  if (expressiveLevel === 'compare') {
    question.items.forEach(item => stage.appendChild(createExpressiveVisual(item, true)));
  } else {
    stage.appendChild(createExpressiveVisual(question.item, expressiveLevel === 'describe'));
  }
  focusElement(document.getElementById('e-prompt'));
}

function addSupportLine(container, label, text) {
  const line = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = `${label}: `;
  line.append(strong);
  const content = document.createElement('span');
  content.textContent = text;
  line.append(content);
  container.appendChild(line);
}

function showExpressiveSupport() {
  const question = expressiveQuestions[expressiveIndex];
  if (!question || expressiveAnswered) return;
  expressiveSupportShown = true;
  const support = document.getElementById('e-support');
  support.replaceChildren();
  const note = document.createElement('p');
  note.className = 'support-note';
  note.textContent = tf('expressiveNote');
  support.appendChild(note);
  if (expressiveLevel === 'compare') {
    addSupportLine(support, 'Se parecen', question.same);
    addSupportLine(support, tf('expressiveDifferent'), question.different);
    addSupportLine(support, tf('expressiveModel'), question.model);
  } else {
    addSupportLine(support, tf('expressiveCategory'), tf('expressiveIs',{category:question.category}));
    if (expressiveLevel === 'describe') {
      addSupportLine(support, tf('expressiveAttributes'), question.attributes.join(', '));
      addSupportLine(support, tf('expressiveFunction'), question.function);
      addSupportLine(support, tf('expressiveLocation'), question.location);
    }
    addSupportLine(support, tf('expressiveModel'), question.model);
  }
  support.style.display = 'block';
  document.getElementById('e-support-btn').style.display = 'none';
  focusElement(support);
}

function recordExpressiveOutcome(outcome) {
  const valid = ['independent', 'cue', 'model', 'practice'];
  if (activeTab !== 'expressive' || expressiveAnswered || !valid.includes(outcome) || !expressiveQuestions[expressiveIndex]) return;
  expressiveAnswered = true;
  expressiveCounts[outcome]++;
  Array.from(document.getElementById('e-outcomes').children).forEach(button => { button.disabled = true; });
  document.getElementById('e-support-btn').disabled = true;
  const feedback = document.getElementById('e-feedback');
  feedback.textContent = outcome === 'practice'
    ? tf('expressivePractice')
    : tf('expressiveSaved');
  feedback.className = 'quiz-feedback correct';
  const next = document.getElementById('e-next');
  next.textContent = expressiveIndex === expressiveQuestions.length - 1 ? tf('seeSummary') : tf('next');
  next.style.display = 'inline-flex';
  next.focus();
}

function nextExpressiveQuestion() {
  if (activeTab !== 'expressive' || !expressiveAnswered || expressiveIndex >= expressiveQuestions.length) return;
  expressiveIndex++;
  if (expressiveIndex < expressiveQuestions.length) {
    renderExpressiveQuestion();
    return;
  }
  document.getElementById('expressive-game').style.display = 'none';
  document.getElementById('expressive-result').style.display = 'block';
  document.getElementById('er-msg').textContent =
    tf("expressiveSummary",{level:expressiveLevelName(expressiveLevel),independent:expressiveCounts.independent,cue:expressiveCounts.cue,model:expressiveCounts.model,practice:expressiveCounts.practice});
  focusElement(document.getElementById('er-msg'));
}

buildHome();
initializeLanguage();
