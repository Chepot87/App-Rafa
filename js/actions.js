// Adult-guided language practice. No speech recognition, recordings or child data.
const actionCatalog = {
 es: {
  title:'¿Quién hace qué?', nav:'Acciones', subtitle:'Expresión oral y morfosintaxis · Con un adulto · Referencia: 3–8 años',
  guide:'Acepta palabras, gestos o selecciones. Modela y amplía lo que comunica el niño; no exijas una frase exacta. La edad es orientativa: elige según su lenguaje actual.',
  levels:['1 · Nombra la acción','2 · Quién + acción','3 · Amplía la oración'],
  goals:['Comunica una acción, por ejemplo «lee».','Combina quién y qué hace, por ejemplo «la niña lee».','Añade un objeto o lugar, por ejemplo «la niña lee un libro».'],
  count:'Oportunidades', set:'Escenas', all:'Todas las acciones', start:'Comenzar', back:'← Inicio', settings:'⚙ Elegir nivel y escenas', restart:'↻ Reiniciar',
  prompts:['¿Qué hace?','¿Quién es y qué hace?','¿Quién hace qué? Añade qué usa o dónde está.'],
  hint:'Mostrar pista', model:'Mostrar modelo', choices:'Puedes señalar una opción o comunicarlo a tu manera.', adult:'Para el adulto: registra el apoyo utilizado',
  outcomes:['Sin ayuda','Con pista o elección','Con modelo','Seguir practicando'], saved:'Anotado. Pueden volver a intentarlo antes de continuar.', next:'Siguiente →', finish:'Ver resumen', done:'¡Práctica completada!', summary:'Resumen para el adulto',
  limit:'Este registro describe esta práctica; no es una evaluación, diagnóstico ni prueba de progreso terapéutico.',
  mission:'Fuera de la pantalla: busquen una acción cotidiana. Pregunta qué hace la persona y amplía su respuesta con una palabra más.',
  practice:'Práctica', of:'de', level:'Nivel', cue:'Señala lo que está haciendo la persona. Puedes ofrecer dos opciones sin exigir que hable.',
  scenes:[
   ['read','La niña lee un libro en casa.','lee','La niña lee.','La niña lee un libro.','lee|pinta'],
   ['kick','El niño patea una pelota en el parque.','patea','El niño patea.','El niño patea una pelota.','patea|lee'],
   ['water','La niña riega una planta en el jardín.','riega','La niña riega.','La niña riega una planta.','riega|construye'],
   ['paint','El niño pinta un dibujo en la mesa.','pinta','El niño pinta.','El niño pinta un dibujo.','pinta|lava'],
   ['wash','La niña lava sus manos en el lavabo.','lava','La niña lava.','La niña lava sus manos.','lava|patea'],
   ['build','El niño construye una torre con bloques.','construye','El niño construye.','El niño construye una torre.','construye|riega']]
 },
 en: {
  title:'Who is doing what?',nav:'Actions',subtitle:'Expressive language and grammar · With an adult · Approximate ages: 3–8',
  guide:'Accept words, gestures or selections. Model and expand the child’s message without requiring an exact sentence. Choose the level by current language skills, rather than age alone.',
  levels:['1 · Name the action','2 · Who + action','3 · Expand the sentence'],goals:['Communicate an action, such as “reads”.','Combine who and what they do, such as “the girl reads”.','Add an object or place, such as “the girl reads a book”.'],
  count:'Opportunities',set:'Scenes',all:'All actions',start:'Start',back:'← Home',settings:'⚙ Choose level and scenes',restart:'↻ Restart',prompts:['What are they doing?','Who is it and what are they doing?','Who is doing what? Add what they use or where they are.'],
  hint:'Show a hint',model:'Show a model',choices:'Point to an option or communicate in your own way.',adult:'For the adult: record the support used',outcomes:['Without help','With a hint or choice','With a model','Keep practicing'],saved:'Recorded. You can try again before continuing.',next:'Next →',finish:'See summary',done:'Practice completed!',summary:'Summary for the adult',limit:'This log describes this practice; it is not an assessment, diagnosis or evidence of therapeutic progress.',mission:'Away from the screen: find an everyday action. Ask what the person is doing and expand the response with one more word.',practice:'Practice',of:'of',level:'Level',cue:'Point to what the person is doing. Offer two choices without requiring speech.',
  scenes:[['read','The girl reads a book at home.','reads','The girl reads.','The girl reads a book.','reads|paints'],['kick','The boy kicks a ball at the park.','kicks','The boy kicks.','The boy kicks a ball.','kicks|reads'],['water','The girl waters a plant in the garden.','waters','The girl waters.','The girl waters a plant.','waters|builds'],['paint','The boy paints a picture at the table.','paints','The boy paints.','The boy paints a picture.','paints|washes'],['wash','The girl washes her hands at the sink.','washes','The girl washes.','The girl washes her hands.','washes|kicks'],['build','The boy builds a tower with blocks.','builds','The boy builds.','The boy builds a tower.','builds|waters']]
 },
 pt: {
  title:'Quem faz o quê?',nav:'Ações',subtitle:'Linguagem expressiva e gramática · Com um adulto · Referência: 3–8 anos',guide:'Aceite palavras, gestos ou escolhas. Modele e amplie a mensagem da criança sem exigir uma frase exata. Escolha o nível conforme a linguagem atual; a idade é apenas uma referência.',
  levels:['1 · Nomeie a ação','2 · Quem + ação','3 · Amplie a frase'],goals:['Comunique uma ação, como “lê”.','Combine quem e o que faz, como “a menina lê”.','Acrescente um objeto ou lugar, como “a menina lê um livro”.'],
  count:'Oportunidades',set:'Cenas',all:'Todas as ações',start:'Começar',back:'← Início',settings:'⚙ Escolher nível e cenas',restart:'↻ Reiniciar',prompts:['O que está fazendo?','Quem é e o que faz?','Quem faz o quê? Acrescente o que usa ou onde está.'],hint:'Mostrar dica',model:'Mostrar modelo',choices:'Aponte uma opção ou comunique do seu jeito.',adult:'Para o adulto: registre o apoio utilizado',outcomes:['Sem ajuda','Com dica ou escolha','Com modelo','Continuar praticando'],saved:'Registrado. Podem tentar novamente antes de continuar.',next:'Próxima →',finish:'Ver resumo',done:'Prática concluída!',summary:'Resumo para o adulto',limit:'Este registro descreve esta prática; não é uma avaliação, diagnóstico ou prova de progresso terapêutico.',mission:'Fora da tela: encontrem uma ação cotidiana. Pergunte o que a pessoa faz e amplie a resposta com mais uma palavra.',practice:'Prática',of:'de',level:'Nível',cue:'Aponte o que a pessoa está fazendo. Ofereça duas opções sem exigir uma resposta falada.',
  scenes:[['read','A menina lê um livro em casa.','lê','A menina lê.','A menina lê um livro.','lê|pinta'],['kick','O menino chuta uma bola no parque.','chuta','O menino chuta.','O menino chuta uma bola.','chuta|lê'],['water','A menina rega uma planta no jardim.','rega','A menina rega.','A menina rega uma planta.','rega|constrói'],['paint','O menino pinta um desenho na mesa.','pinta','O menino pinta.','O menino pinta um desenho.','pinta|lava'],['wash','A menina lava as mãos na pia.','lava','A menina lava.','A menina lava as mãos.','lava|chuta'],['build','O menino constrói uma torre com blocos.','constrói','O menino constrói.','O menino constrói uma torre.','constrói|rega']]
 }
};
let actionState;
function actionText() { return actionCatalog[currentLanguage] || actionCatalog.es; }
function actionElement(tag, text, className) {
 const element=document.createElement(tag);
 if(text)element.textContent=text;
 if(className)element.className=className;
 return element;
}
function actionButton(text, handler, className='secondary-btn') {
 const button=actionElement('button',text,className);button.type='button';button.onclick=handler;return button;
}
function resetActions() {
 actionState={level:1,scene:'all',count:6,questions:[],index:0,answered:false,support:0,counts:[0,0,0,0]};
 document.getElementById('actions-nav').textContent=actionText().nav;
 renderActionsSetup();
}
function actionShell() {
 const t=actionText(), screen=document.getElementById('screen-actions');screen.replaceChildren();
 const top=actionElement('div',null,'screen-top');top.appendChild(actionButton(t.back,goHome,'ghost-btn'));
 const wrap=actionElement('div',null,'screen-title-wrap'),title=actionElement('h2',t.title);title.id='actions-title';
 wrap.append(title,actionElement('p',t.subtitle));top.appendChild(wrap);screen.appendChild(top);
 return screen;
}
function renderActionsSetup() {
 actionState.questions=[];actionState.answered=false;
 const t=actionText(),screen=actionShell(),card=actionElement('div',null,'quiz-card');
 card.appendChild(actionElement('p',t.guide,'adult-note'));
 const settings=actionElement('div',null,'action-settings');
 for(const [key,label,options] of [['count',t.count,[[3,'3'],[6,'6']]],['scene',t.set,[['all',t.all],...t.scenes.map(s=>[s[0],s[2]])]]]) {
  const field=actionElement('label',label),select=actionElement('select');select.id='actions-'+key;select.setAttribute('aria-label',label);
  options.forEach(([value,text])=>{const opt=actionElement('option',text);opt.value=value;select.appendChild(opt);});
  select.value=actionState[key];select.onchange=()=>{actionState[key]=key==='count'?Number(select.value):select.value;};
  field.appendChild(select);settings.appendChild(field);
 }
 card.appendChild(settings);
 const levels=actionElement('div',null,'level-options');
 t.levels.forEach((text,index)=>{const b=actionButton('',()=>startActions(index+1),'level-btn');b.append(actionElement('strong',text),actionElement('span',t.goals[index]));levels.appendChild(b);});
 card.appendChild(levels);screen.appendChild(card);
}
function startActions(level) {
 const t=actionText();actionState.level=[1,2,3].includes(level)?level:1;
 const pool=t.scenes.filter(s=>actionState.scene==='all'||s[0]===actionState.scene);
 const mixed=shuffle(pool);actionState.questions=Array.from({length:actionState.count},(_,i)=>mixed[i%mixed.length]);
 actionState.index=0;actionState.counts=[0,0,0,0];renderActionQuestion();
}
function renderActionQuestion() {
 const t=actionText(),s=actionState,q=s.questions[s.index];if(!q)return;
 s.answered=false;s.support=0;
 const screen=actionShell(),toolbar=actionElement('div',null,'directions-toolbar');
 toolbar.append(actionButton(t.settings,()=>{s.questions=[];renderActionsSetup();focusElement(document.getElementById('actions-title'));},'ghost-btn'),actionButton(t.restart,()=>startActions(s.level),'ghost-btn'));screen.appendChild(toolbar);
 const card=actionElement('div',null,'quiz-card expressive-card');
 card.appendChild(actionElement('p',`${t.level} ${s.level} · ${s.index+1} ${t.of} ${s.questions.length}`));
 const prompt=actionElement('h3',t.prompts[s.level-1]);prompt.id='action-prompt';card.appendChild(prompt);
 const img=actionElement('img',null,'action-scene');img.src=`img/actions/${q[0]}.svg`;img.alt=q[1];img.width=440;img.height=300;card.appendChild(img);
 const supports=actionElement('div',null,'action-choice'),hint=actionElement('div',null,'expressive-support');hint.id='action-support';hint.style.display='none';hint.setAttribute('role','status');
 const hintBtn=actionButton(t.hint,()=>{
  if(s.answered)return;
  s.support=Math.max(s.support,1);hint.replaceChildren(actionElement('p',t.cue),actionElement('p',t.choices));
  const choices=actionElement('div',null,'action-choice');
  shuffle(q[5].split('|')).forEach(word=>choices.appendChild(actionButton(word,()=>{choices.children && Array.from(choices.children).forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===word))); },'secondary-btn')));
  hint.appendChild(choices);hint.style.display='block';hintBtn.disabled=true;focusElement(hint);
 });
 const modelBtn=actionButton(t.model,()=>{if(s.answered)return;s.support=2;hint.replaceChildren(actionElement('p',q[s.level+1]));hint.style.display='block';hintBtn.disabled=true;modelBtn.disabled=true;focusElement(hint);});
 supports.append(hintBtn,modelBtn);card.append(supports,hint);
 const panel=actionElement('div',null,'outcome-panel');panel.appendChild(actionElement('p',t.adult));
 const outcomes=actionElement('div',null,'outcome-options');outcomes.id='action-outcomes';
 t.outcomes.forEach((label,index)=>outcomes.appendChild(actionButton(label,()=>recordActionOutcome(index),'')));panel.appendChild(outcomes);card.appendChild(panel);
 const feedback=actionElement('p',null,'quiz-feedback');feedback.id='action-feedback';feedback.setAttribute('role','status');card.appendChild(feedback);
 const next=actionButton(s.index===s.questions.length-1?t.finish:t.next,nextAction,'primary-btn');next.id='action-next';next.style.display='none';card.appendChild(next);
 screen.appendChild(card);focusElement(prompt);
}
function recordActionOutcome(outcome) {
 const s=actionState;if(activeTab!=='actions'||s.answered||!s.questions[s.index]||![0,1,2,3].includes(outcome))return;
 // A revealed cue/model counts as support even if the adult selects “without help”.
 const recorded=outcome===3?3:Math.max(outcome,s.support);s.counts[recorded]++;s.answered=true;
 Array.from(document.getElementById('action-outcomes').children).forEach(b=>b.disabled=true);
 document.getElementById('action-feedback').textContent=actionText().saved;
 document.getElementById('action-next').style.display='inline-flex';document.getElementById('action-next').focus();
}
function nextAction() {
 const s=actionState;if(activeTab!=='actions'||!s.answered||s.index>=s.questions.length)return;
 s.index++;if(s.index<s.questions.length){renderActionQuestion();return;}
 const t=actionText(),screen=actionShell(),card=actionElement('div',null,'result-card');
 card.appendChild(actionElement('h3',t.done));
 const summary=actionElement('div',null,'adult-summary');summary.id='action-summary';summary.appendChild(actionElement('h3',t.summary));
 summary.appendChild(actionElement('p',`${t.levels[s.level-1]} · ${s.questions.length} ${t.count.toLocaleLowerCase(currentLanguage)}`));
 s.counts.forEach((count,i)=>summary.appendChild(actionElement('p',`${t.outcomes[i]}: ${count}`)));
 summary.append(actionElement('p',t.limit),actionElement('p',t.mission));card.appendChild(summary);
 const buttons=actionElement('div',null,'result-actions');buttons.append(actionButton(t.restart,()=>startActions(s.level),'primary-btn'),actionButton(t.settings,renderActionsSetup),actionButton(t.back,goHome));card.appendChild(buttons);screen.appendChild(card);focusElement(summary);
}
