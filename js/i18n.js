// Offline, dependency-free localization. Spanish source data stays canonical.
const originalRafa = {
  categories: categories.map(cat => ({id:cat.id,name:cat.name,items:cat.items.map(item=>({id:item.id,word:item.word}))})),
  profiles: expressiveProfiles.map(profile=>({...profile,attributes:[...profile.attributes]})),
  comparePairs: expressiveComparePairs.map(pair=>({...pair}))
};
const spanishMessages = {
  "wordCount": "{count} palabras",
  "flashSubtitle": "Observa, nombra y repite",
  "finish": "Finalizar",
  "next": "Siguiente →",
  "seeResult": "Ver resultado",
  "quizQuestion": "¿Cuál NO pertenece?",
  "quizSubtitle": "Pregunta {number} de {total} · Tema: {category}",
  "quizGood": "¡Muy bien!",
  "quizWrong": "La respuesta correcta era {word}",
  "resultExcellent": "¡Excelente!",
  "resultVeryGood": "¡Muy bien!",
  "resultGood": "¡Vas bien!",
  "resultTry": "Buen intento",
  "quizSummary": "Respondiste {correct} de {total} correctamente.",
  "matchQuestion": "Pregunta {number} de {total}",
  "matchGood": "¡Correcto! 🎉",
  "matchWrong": "Pertenece a: {category}",
  "matchTry": "¡Sigue practicando!",
  "imagePhrase": "la imagen de {word}",
  "colorPhrase": "el color {word}",
  "directionOne": "Toca {first}.",
  "directionTwo": "Primero toca {first}. Después, {second}.",
  "directionThree": "Primero toca {first}. Luego, {second}. Al final, {third}.",
  "directionsProgress": "Instrucción {number} de {total} · Nivel {level}",
  "directionsRetry": "Vamos a leer la instrucción otra vez y comenzar desde el principio.",
  "directionsContinue": "¡Bien! Continúa con el próximo paso.",
  "directionsWellDone": "¡Muy bien! Seguiste toda la instrucción.",
  "seeSummary": "Ver resumen",
  "directionsSummary": "Nivel {level}: {independent} al primer intento y {supported} con repetición o apoyo.",
  "expressiveName": "Nombra",
  "expressiveDescribe": "Describe",
  "expressiveCompare": "Compara",
  "expressiveWhat": "¿Qué es?",
  "expressiveTell": "Dime dos cosas sobre {word}.",
  "expressiveComparePrompt": "¿En qué se parecen y en qué son diferentes?",
  "expressiveProgress": "{level} · Oportunidad {number} de {total}",
  "expressiveNote": "Son ejemplos de apoyo; otras respuestas correctas también cuentan.",
  "expressiveSame": "Se parecen",
  "expressiveDifferent": "Son diferentes",
  "expressiveModel": "Modelo",
  "expressiveCategory": "Categoría",
  "expressiveAttributes": "Atributos",
  "expressiveFunction": "Función",
  "expressiveLocation": "Lugar",
  "expressiveIs": "Es {category}.",
  "expressivePractice": "Anotado. Pueden modelar una frase corta y seguir practicando.",
  "expressiveSaved": "¡Muy bien! Respuesta registrada para el resumen de hoy.",
  "expressiveSummary": "{level}: {independent} sin ayuda, {cue} con una pista, {model} repitiendo un modelo y {practice} para seguir practicando."
};
let currentLanguage='es';
function tf(key, variables={}) {
  const catalog = currentLanguage==='en' ? enLocale : currentLanguage==='pt' ? ptLocale : null;
  const template = (catalog && catalog.messages[key]) || spanishMessages[key] || key;
  return template.replace(/\{(\w+)\}/g,(_,name)=>String(variables[name] ?? ''));
}
function translateVocabulary(language) {
 const catalog = language==='en' ? enLocale : language==='pt' ? ptLocale : null;
 categories.forEach((cat,index)=>{
   const source=originalRafa.categories[index];
   cat.name = catalog?.categories[cat.id] || source.name;
   cat.items.forEach((item,itemIndex)=>item.word = catalog?.items[item.id] || source.items[itemIndex].word);
 });
 expressiveProfiles.forEach((profile,index)=>{
   const source=originalRafa.profiles[index];
   const translated=catalog?.profiles[profile.id];
   Object.assign(profile,translated ? {...translated,attributes:[...translated.attributes]} : {...source,attributes:[...source.attributes]});
 });
 expressiveComparePairs.forEach((pair,index)=>{
   const source=originalRafa.comparePairs[index];
   const translated=catalog?.comparePairs[index];
   Object.assign(pair,translated || source);
 });
}
function translatePage(language) {
 const catalog= language==='en' ? enLocale : language==='pt' ? ptLocale : null;
 const elements = document.querySelectorAll('[data-i18n]');
 elements.forEach(element=>{
   const key=element.getAttribute('data-i18n');
   if(key) element.textContent = catalog?.ui[key] || key;
 });
 document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
 document.title = (catalog?.ui['Categorías Semánticas'] || 'Categorías Semánticas') + ' · App Rafa';
 const control=document.getElementById('language-select');
 if(control)control.value=language;
 const label=document.getElementById('language-label');
 if(label)label.textContent='🌐 '+(catalog?.ui.Idioma || 'Idioma');
 const notice=document.getElementById('language-notice');
 if(notice)notice.textContent=catalog?.ui['Cambiar de idioma reinicia las actividades.'] || 'Cambiar de idioma reinicia las actividades.';
}
function setLanguage(language) {
 if(!['es','en','pt'].includes(language))language='es';
 currentLanguage=language;
 translateVocabulary(language);
 translatePage(language);
 // A new locale starts fresh: never mix questions, scoring, or feedback from different languages.
 quizQuestions=[];quizIndex=0;qCorrect=0;qWrong=0;quizAnswered=false;
 matchQuestions=[];matchIndex=0;mCorrect=0;mWrong=0;matchAnswered=false;
 directionsQuestions=[];directionIndex=0;directionAnswered=false;
 expressiveQuestions=[];expressiveIndex=0;expressiveAnswered=false;
 currentCat=null;fcIndex=0;
 for(const name of ['quiz','match','directions','expressive']) {
   const game=document.getElementById(name === 'quiz' ? 'quiz-game' : name==='match' ? 'match-game' : name+'-game');
   const result=document.getElementById(name === 'quiz' ? 'quiz-result' : name==='match' ? 'match-result' : name+'-result');
   if(game)game.style.display=name==='directions'||name==='expressive'?'none':'block';
   if(result)result.style.display='none';
 }
 for(const name of ['directions','expressive']) {
   const setup=document.getElementById(name+'-setup');
   if(setup)setup.style.display='block';
 }
 if(typeof buildHome==='function')buildHome();
 if(typeof showTab==='function')showTab('home');
 try{ if(typeof localStorage!=='undefined')localStorage.setItem('rafa-language',language); }catch(_){}
}
function initializeLanguage(){
 let language='es';
 try{if(typeof localStorage!=='undefined')language=localStorage.getItem('rafa-language')||'es';}catch(_){}
 if(language!=='es')setLanguage(language);
 else translatePage('es');
}
