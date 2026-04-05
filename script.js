const categories = [
  {
    id: "animales",
    name: "Animales",
    emoji: "🐾",
    items: [
      { word: "Perro", emoji: "🐶" },
      { word: "Gato", emoji: "🐱" },
      { word: "Vaca", emoji: "🐮" },
      { word: "Caballo", emoji: "🐴" },
      { word: "Pájaro", emoji: "🐦" },
      { word: "Pez", emoji: "🐟" },
      { word: "Conejo", emoji: "🐰" },
      { word: "Cerdo", emoji: "🐷" }
    ]
  },
  {
    id: "frutas",
    name: "Frutas",
    emoji: "🍓",
    items: [
      { word: "Manzana", emoji: "🍎" },
      { word: "Banana", emoji: "🍌" },
      { word: "Naranja", emoji: "🍊" },
      { word: "Fresa", emoji: "🍓" },
      { word: "Uvas", emoji: "🍇" },
      { word: "Piña", emoji: "🍍" },
      { word: "Mango", emoji: "🥭" },
      { word: "Melón", emoji: "🍈" }
    ]
  },
  {
    id: "ropa",
    name: "Ropa",
    emoji: "👕",
    items: [
      { word: "Camisa", emoji: "👕" },
      { word: "Pantalón", emoji: "👖" },
      { word: "Zapatos", emoji: "👟" },
      { word: "Vestido", emoji: "👗" },
      { word: "Sombrero", emoji: "🎩" },
      { word: "Calcetines", emoji: "🧦" },
      { word: "Bufanda", emoji: "🧣" },
      { word: "Guantes", emoji: "🧤" }
    ]
  },
  {
    id: "vehiculos",
    name: "Vehículos",
    emoji: "🚗",
    items: [
      { word: "Carro", emoji: "🚗" },
      { word: "Autobús", emoji: "🚌" },
      { word: "Avión", emoji: "✈️" },
      { word: "Barco", emoji: "🚢" },
      { word: "Tren", emoji: "🚂" },
      { word: "Bicicleta", emoji: "🚲" },
      { word: "Moto", emoji: "🏍️" },
      { word: "Helicóptero", emoji: "🚁" }
    ]
  },
  {
    id: "comida",
    name: "Comida",
    emoji: "🍕",
    items: [
      { word: "Pizza", emoji: "🍕" },
      { word: "Arroz", emoji: "🍚" },
      { word: "Pan", emoji: "🍞" },
      { word: "Pollo", emoji: "🍗" },
      { word: "Huevo", emoji: "🥚" },
      { word: "Queso", emoji: "🧀" },
      { word: "Sopa", emoji: "🍜" },
      { word: "Tacos", emoji: "🌮" }
    ]
  },
  {
    id: "cuerpo",
    name: "Cuerpo",
    emoji: "🧍",
    items: [
      { word: "Cabeza", emoji: "🙂" },
      { word: "Ojos", emoji: "👀" },
      { word: "Nariz", emoji: "👃" },
      { word: "Boca", emoji: "👄" },
      { word: "Oreja", emoji: "👂" },
      { word: "Mano", emoji: "✋" },
      { word: "Pie", emoji: "🦶" },
      { word: "Dientes", emoji: "🦷" }
    ]
  },
  {
    id: "colores",
    name: "Colores",
    emoji: "🎨",
    items: [
      { word: "Rojo", emoji: "🔴" },
      { word: "Azul", emoji: "🔵" },
      { word: "Verde", emoji: "🟢" },
      { word: "Amarillo", emoji: "🟡" },
      { word: "Naranja", emoji: "🟠" },
      { word: "Morado", emoji: "🟣" },
      { word: "Negro", emoji: "⚫" },
      { word: "Blanco", emoji: "⚪" }
    ]
  },
  {
    id: "juguetes",
    name: "Juguetes",
    emoji: "🧸",
    items: [
      { word: "Pelota", emoji: "⚽" },
      { word: "Muñeca", emoji: "🪆" },
      { word: "Oso", emoji: "🧸" },
      { word: "Bloques", emoji: "🧱" },
      { word: "Cometa", emoji: "🪁" },
      { word: "Yoyó", emoji: "🪀" },
      { word: "Rompecabezas", emoji: "🧩" },
      { word: "Tren", emoji: "🚂" }
    ]
  },
  {
    id: "escuela",
    name: "Escuela",
    emoji: "✏️",
    items: [
      { word: "Lápiz", emoji: "✏️" },
      { word: "Libro", emoji: "📚" },
      { word: "Mochila", emoji: "🎒" },
      { word: "Cuaderno", emoji: "📓" },
      { word: "Regla", emoji: "📏" },
      { word: "Tijeras", emoji: "✂️" },
      { word: "Borrador", emoji: "🧽" },
      { word: "Marcador", emoji: "🖍️" }
    ]
  },
  {
    id: "naturaleza",
    name: "Naturaleza",
    emoji: "🌿",
    items: [
      { word: "Árbol", emoji: "🌳" },
      { word: "Flor", emoji: "🌸" },
      { word: "Sol", emoji: "☀️" },
      { word: "Luna", emoji: "🌙" },
      { word: "Lluvia", emoji: "🌧️" },
      { word: "Nube", emoji: "☁️" },
      { word: "Montaña", emoji: "⛰️" },
      { word: "Río", emoji: "🏞️" }
    ]
  }
];

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
    const card = document.createElement("div");
    card.className = "cat-card";
    card.innerHTML = `
      <span class="emoji">${cat.emoji}</span>
      <div class="cat-name">${cat.name}</div>
      <div class="cat-count">${cat.items.length} palabras</div>
    `;
    card.onclick = () => openFlashcards(cat.id);
    grid.appendChild(card);
  });
}

function showTab(tab) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(`screen-${tab}`).classList.add("active");

  const navMap = {
    home: 0,
    flashcards: 1,
    quiz: 2
  };

  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons[navMap[tab]].classList.add("active");

  if (tab === "flashcards" && currentCat) {
    renderFlashcard();
  }

  if (tab === "quiz" && quizQuestions.length === 0) {
    buildQuiz();
  }
}

function goHome() {
  showTab("home");
}

function openFlashcards(catId) {
  currentCat = categories.find((cat) => cat.id === catId);
  fcIndex = 0;
  showTab("flashcards");
  renderFlashcard();
}

function openDefaultFlashcards() {
  if (!currentCat) {
    currentCat = categories[0];
    fcIndex = 0;
  }

  showTab("flashcards");
  renderFlashcard();
}

function renderFlashcard() {
  if (!currentCat || currentCat.items.length === 0) return;

  const item = currentCat.items[fcIndex];
  const total = currentCat.items.length;

  document.getElementById("flashcard-category-title").textContent = currentCat.name;
  document.getElementById("flashcard-category-subtitle").textContent = "Escucha, observa y repite";
  document.getElementById("fc-num").textContent = `${fcIndex + 1} / ${total}`;
  document.getElementById("fc-emoji").textContent = item.emoji;
  document.getElementById("fc-word").textContent = item.word;
  document.getElementById("fc-progress").style.width = `${((fcIndex + 1) / total) * 100}%`;

  const nextBtn = document.getElementById("fc-next-btn");
  nextBtn.textContent = fcIndex === total - 1 ? "Finalizar" : "Siguiente →";

  const card = document.getElementById("flashcard");
  card.style.animation = "none";
  card.offsetHeight;
  card.style.animation = "fadePop 0.28s ease";

  if (document.getElementById("autoSpeakToggle").checked) {
    setTimeout(() => {
      speakCurrentWord();
    }, 200);
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
  if (!("speechSynthesis" in window)) {
    alert("Este navegador no soporta lectura por voz.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const spanishVoice =
    voices.find((voice) => voice.lang.toLowerCase().includes("es")) || null;

  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }

  window.speechSynthesis.speak(utterance);
}

window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};

function buildQuiz() {
  quizQuestions = generateQuizQuestions(10);
  quizIndex = 0;
  qCorrect = 0;
  qWrong = 0;

  document.getElementById("quiz-game").style.display = "block";
  document.getElementById("quiz-result").style.display = "none";

  updateScoreUI();
  renderQuestion();
}

function generateQuizQuestions(count) {
  const questions = [];

  for (let i = 0; i < count; i++) {
    const mainCat = categories[Math.floor(Math.random() * categories.length)];
    const otherCats = categories.filter((cat) => cat.id !== mainCat.id);
    const oddCat = otherCats[Math.floor(Math.random() * otherCats.length)];

    const mainItems = [...mainCat.items].sort(() => Math.random() - 0.5).slice(0, 3);
    const oddItem = oddCat.items[Math.floor(Math.random() * oddCat.items.length)];

    const options = [...mainItems, oddItem].sort(() => Math.random() - 0.5);

    questions.push({
      mainCat: mainCat.name,
      options,
      correctIndex: options.findIndex((item) => item.word === oddItem.word && item.emoji === oddItem.emoji)
    });
  }

  return questions;
}

function renderQuestion() {
  const q = quizQuestions[quizIndex];

  document.getElementById("q-question").textContent = "¿Cuál NO pertenece?";
  document.getElementById("q-subtitle").textContent = `Tema: ${q.mainCat}`;
  document.getElementById("q-feedback").textContent = "";
  document.getElementById("q-feedback").className = "quiz-feedback";
  document.getElementById("q-next").style.display = "none";

  const optionsWrap = document.getElementById("q-options");
  optionsWrap.innerHTML = "";

  q.options.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt";
    btn.innerHTML = `
      <span class="opt-emoji">${item.emoji}</span>
      <span>${item.word}</span>
    `;
    btn.onclick = () => selectAnswer(index);
    optionsWrap.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  const q = quizQuestions[quizIndex];
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
  document.getElementById("q-next").style.display = "inline-flex";
  document.getElementById("q-next").textContent =
    quizIndex === quizQuestions.length - 1 ? "Ver resultado" : "Siguiente →";
}

function nextQuestion() {
  quizIndex++;

  if (quizIndex >= quizQuestions.length) {
    showResult();
    return;
  }

  renderQuestion();
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
  document.getElementById("r-msg").textContent = `Respondiste ${qCorrect} de ${total} correctamente.`;
}

function restartQuiz() {
  buildQuiz();
}

buildHome();