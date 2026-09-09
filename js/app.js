let activeTab = 'home';
let speechTimer = null;
let activeUtterance = null;
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

function stopSpeech() {
  clearTimeout(speechTimer);
  speechTimer = null;
  activeUtterance = null;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
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
      <span class="cat-count">${cat.items.length} palabras</span>
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
    match: 3
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
  stopSpeech();
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
  stopSpeech();
  if (!currentCat || currentCat.items.length === 0) return;

  const item = currentCat.items[fcIndex];
  const total = currentCat.items.length;

  document.getElementById("flashcard-category-title").textContent = currentCat.name;
  document.getElementById("flashcard-category-subtitle").textContent = "Escucha, observa y repite";
  document.getElementById("fc-num").textContent = `${fcIndex + 1} / ${total}`;
  renderVisual(document.getElementById("fc-emoji"), item);
  document.getElementById('fc-prev-btn').disabled = fcIndex === 0;
  document.getElementById("fc-word").textContent = item.word;
  document.getElementById("fc-progress").style.width = `${((fcIndex + 1) / total) * 100}%`;

  const nextBtn = document.getElementById("fc-next-btn");
  nextBtn.textContent = fcIndex === total - 1 ? "Finalizar" : "Siguiente →";

  const card = document.getElementById("flashcard");
  card.style.animation = "none";
  card.offsetHeight;
  card.style.animation = "fadePop 0.28s ease";

  const autoSpeak = document.getElementById("autoSpeakToggle");
  if (autoSpeak && autoSpeak.checked) {
    speechTimer = setTimeout(() => {
      if (activeTab === 'flashcards' && autoSpeak.checked) speakCurrentWord();
    }, 180);
  }
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

function speakCurrentWord() {
  if (!currentCat) return;

  const item = currentCat.items[fcIndex];
  speakText(item.word);
}

function speakText(text) {
  stopSpeech();
  const status = document.getElementById('speech-status');
  status.textContent = '';
  if (!("speechSynthesis" in window) || !('SpeechSynthesisUtterance' in window)) {
    status.textContent = 'La lectura por voz no está disponible en este navegador.';
    return;
  }
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;
    utterance.lang = "es-ES";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const spanishVoice =
      voices.find(voice => voice.lang.toLowerCase() === 'es-es') ||
      voices.find(voice => /^es(?:-|$)/i.test(voice.lang)) || null;

    if (spanishVoice) {
      utterance.voice = spanishVoice;
      utterance.lang = spanishVoice.lang;
    }
    utterance.onend = () => { if (activeUtterance === utterance) activeUtterance = null; };
    utterance.onerror = event => {
      if (activeUtterance !== utterance) return;
      activeUtterance = null;
      if (!['canceled', 'interrupted'].includes(event.error)) {
        status.textContent = 'No se pudo reproducir la voz. Pulsa Escuchar para intentarlo de nuevo.';
      }
    };
    window.speechSynthesis.speak(utterance);
  } catch {
    activeUtterance = null;
    status.textContent = 'No se pudo iniciar la lectura por voz en este navegador.';
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

  document.getElementById("q-question").textContent = "¿Cuál NO pertenece?";
  document.getElementById("q-subtitle").textContent = `Pregunta ${quizIndex + 1} de ${quizQuestions.length} · Tema: ${q.mainCat}`;
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
    feedback.textContent = "¡Muy bien!";
    feedback.className = "quiz-feedback correct";
    qCorrect++;
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[q.correctIndex].classList.add("correct");
    feedback.textContent = `La respuesta correcta era ${q.options[q.correctIndex].word}`;
    feedback.className = "quiz-feedback wrong";
    qWrong++;
  }

  updateScoreUI();

  const nextBtn = document.getElementById("q-next");
  nextBtn.style.display = "inline-flex";
  nextBtn.textContent =
    quizIndex === quizQuestions.length - 1 ? "Ver resultado" : "Siguiente →";
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
  let title = "Buen intento";

  if (percent >= 90) {
    emoji = "🏆";
    title = "¡Excelente!";
  } else if (percent >= 70) {
    emoji = "🌟";
    title = "¡Muy bien!";
  } else if (percent >= 50) {
    emoji = "😊";
    title = "¡Vas bien!";
  }

  document.getElementById("r-emoji").textContent = emoji;
  document.getElementById("r-title").textContent = title;
  document.getElementById("r-msg").textContent =
    `Respondiste ${qCorrect} de ${total} correctamente.`;
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
  document.getElementById('m-progress').textContent = `Pregunta ${matchIndex + 1} de ${matchQuestions.length}`;
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
    feedback.textContent = "¡Correcto! 🎉";
    feedback.className = "quiz-feedback correct";
    mCorrect++;
  } else {
    const correctOpt = q.options.find((o) => o.id === q.correctId);
    feedback.textContent = `Pertenece a: ${correctOpt.name}`;
    feedback.className = "quiz-feedback wrong";
    mWrong++;
  }

  updateMatchScore();

  const nextBtn = document.getElementById("m-next");
  nextBtn.style.display = "inline-flex";
  nextBtn.textContent =
    matchIndex === matchQuestions.length - 1 ? "Ver resultado" : "Siguiente →";
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
  let title = "¡Sigue practicando!";

  if (percent >= 90) {
    emoji = "🏆";
    title = "¡Excelente!";
  } else if (percent >= 70) {
    emoji = "🌟";
    title = "¡Muy bien!";
  } else if (percent >= 50) {
    emoji = "😊";
    title = "¡Vas bien!";
  }

  document.getElementById("mr-emoji").textContent = emoji;
  document.getElementById("mr-title").textContent = title;
  document.getElementById("mr-msg").textContent =
    `Respondiste ${mCorrect} de ${total} correctamente.`;
  focusElement(document.getElementById("mr-msg"));
}

buildHome();

document.getElementById('autoSpeakToggle').addEventListener('change', event => {
  stopSpeech();
  if (event.target.checked && activeTab === 'flashcards') speakCurrentWord();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) stopSpeech(); });
window.addEventListener('pagehide', stopSpeech);
