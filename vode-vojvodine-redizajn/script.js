'use strict';
const BASE='https://www.vodevojvodine.com/';
const srSearch = text => `${BASE}?s=${encodeURIComponent(text)}`;
const navData=[
 {title:'Почетна',url:'./'},
 {title:'О нама',groups:[
   {name:'Основни подаци',items:['Основни подаци']},
   {name:'Организациона структура',items:['Директор','Надзорни одбор','Организациона шема','Статут предузећа']},
   {name:'Делатности',items:['Одбрана од поплава','Одводњавање','Наводњавање','Пловидба','Рибарство','Шумарство','Заштита природе','Заштита вода','Међународна сарадња']},
   {name:'Водни ресурси',items:['Природни водотоци','Хидросистем Дунав-Тиса-Дунав']},
   {name:'Инвестиције',items:['Пројекти Абу Даби фонда','Прва фаза радова','Друга фаза радова','Трећа фаза радова','Пројекти Европске уније','Домаћи пројекти','Двонаменски системи']},
   {name:'Програми, извештаји, документи',items:['Програм пословања','Финансијски извештаји','Информатор о раду','Приступ информацијама од јавног значаја','Родна равноправност','Документи']},
   {name:'Литература',items:[]}
 ]},
 {title:'Вести',groups:[{name:'Радови',items:['Инвестиције','Редовно одржавање','Међународни пројекти']},{name:'Вести',items:['Одбрана од поплава','Накнада за одводњавање','Мелиорације','Пловидба','Регата','Одбрана од леда','Заштићена подручја','Јегричка','Бегечка јама','Бељанска бара','Рибарство','Рекреативни риболов','Привредни риболов','Рибочуварска служба','Шумарство','Међународна сарадња','Сајмови и конференције','Друштвена одговорност']}]},
 {title:'Јавне набавке',url:srSearch('Јавне набавке')},
 {title:'Огласи',url:srSearch('Огласи')},
 {title:'Водно земљиште',groups:[{name:'Водно земљиште',items:['Регулатива','Вађење речног наноса','Сенокос и испаша','Плутајући објекти','Монтажни објекти','Пољопривредне сврхе','Рибњаци']}]},
 {title:'Живот на води',groups:[{name:'Живот на води',items:['Регата Воде Војводине','Заштићена подручја','Бегечка јама','Јегричка','Бељанска бара','Потамишје','Мртваје горњег Потисја','Храст Лужњак','Катамаран Чигра','Хидротехничко наслеђе','Рекреативни риболов']}]},
 {title:'Кориснички сервис',groups:[{name:'Кориснички сервис',items:['Водна акта','Издавање потврда','Обрасци за преузимање','Електронско подношење захтева','Накнада за одводњавање','Најчешћа питања']}]},
 {title:'Контакт',url:'#contact'}
];
// These are outgoing links to the existing site: no other pages are recreated here.
const lookup={
 'Електронско подношење захтева':'https://odvod.vodevojvodine.com/',
 'Кориснички сервис':srSearch('Кориснички сервис')
};
function buildNav(){
 const desktop=document.getElementById('desktopNav');
 const mobile=document.getElementById('mobileNav');
 for(const entry of navData){
  const item=document.createElement('div');item.className='nav-item';
  const main=document.createElement('a');main.className='nav-link';main.textContent=entry.title;main.href=entry.url||srSearch(entry.title);item.appendChild(main);
  if(entry.groups){
   const chevron=document.createElement('span');chevron.className='nav-chevron';chevron.textContent='⌄';main.appendChild(chevron);
   const drop=document.createElement('div');drop.className='nav-dropdown';
   for(const group of entry.groups){const heading=document.createElement('div');heading.className='nav-group-label';heading.textContent=group.name;drop.appendChild(heading);for(const title of group.items){const a=document.createElement('a');a.textContent=title;a.href=lookup[title]||srSearch(title);drop.appendChild(a);}}
   item.appendChild(drop);
  }
  desktop.appendChild(item);
  if(!entry.groups){const a=document.createElement('a');a.textContent=entry.title;a.href=entry.url;mobile.appendChild(a);}
  else{const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent=entry.title;details.appendChild(summary);for(const group of entry.groups){const s=document.createElement('details'),sm=document.createElement('summary');sm.textContent=group.name;s.appendChild(sm);for(const label of group.items){const a=document.createElement('a');a.textContent=label;a.href=lookup[label]||srSearch(label);s.appendChild(a)}details.appendChild(s)}mobile.appendChild(details)}
 }
}
buildNav();
document.getElementById('contact')?.setAttribute('id','contact');
const footer=document.querySelector('.footer');footer.id='contact';
const mobileToggle=document.querySelector('.mobile-toggle');const mobileNav=document.getElementById('mobileNav');
mobileToggle.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;mobileToggle.setAttribute('aria-expanded',String(open));mobileToggle.setAttribute('aria-label',open?'Затвори мени':'Отвори мени')});
const searchButton=document.querySelector('.search-toggle');const searchPanel=document.getElementById('searchPanel');
searchButton.addEventListener('click',()=>{const open=searchPanel.hidden;searchPanel.hidden=!open;searchButton.setAttribute('aria-expanded',String(open));if(open)document.getElementById('siteSearch').focus()});
const mapCyr={'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Ђ':'Đ','Е':'E','Ж':'Ž','З':'Z','И':'I','Ј':'J','К':'K','Л':'L','Љ':'Lj','М':'M','Н':'N','Њ':'Nj','О':'O','П':'P','Р':'R','С':'S','Т':'T','Ћ':'Ć','У':'U','Ф':'F','Х':'H','Ц':'C','Ч':'Č','Џ':'Dž','Ш':'Š','а':'a','б':'b','в':'v','г':'g','д':'d','ђ':'đ','е':'e','ж':'ž','з':'z','и':'i','ј':'j','к':'k','л':'l','љ':'lj','м':'m','н':'n','њ':'nj','о':'o','п':'p','р':'r','с':'s','т':'t','ћ':'ć','у':'u','ф':'f','х':'h','ц':'c','ч':'č','џ':'dž','ш':'š'};
const originalTexts=new WeakMap();const originalAttrs=new WeakMap();
function transliterate(source){return source.replace(/[А-ШЂЈЉЊЋЏа-шђјљњћџ]/g,letter=>mapCyr[letter]||letter)}
function updateScript(mode){
 const translit=mode==='lat';document.documentElement.lang=translit?'sr-Latn':'sr-Cyrl';
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let node;while((node=walker.nextNode())){if(node.parentElement?.closest('script,style,textarea,.stat-number'))continue;if(!originalTexts.has(node))originalTexts.set(node,node.nodeValue);const source=originalTexts.get(node);node.nodeValue=translit?transliterate(source):source;}
 document.querySelectorAll('[alt],[aria-label],[placeholder],[title]').forEach(el=>{for(const name of ['alt','aria-label','placeholder','title']){if(!el.hasAttribute(name))continue;let original=originalAttrs.get(el);if(!original){original={};originalAttrs.set(el,original)}if(!(name in original))original[name]=el.getAttribute(name);el.setAttribute(name,translit?transliterate(original[name]):original[name])}});
 document.title=translit?transliterate('ЈВП „Воде Војводине“ Нови Сад'):'ЈВП „Воде Војводине“ Нови Сад';
 document.querySelectorAll('.lang').forEach(b=>{const active=b.dataset.lang===mode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 try{localStorage.setItem('vode-vojvodine-pismo',mode)}catch{}
}
const saved=(()=>{try{return localStorage.getItem('vode-vojvodine-pismo')}catch{return null}})();
document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click',()=>updateScript(b.dataset.lang)));
updateScript(saved==='lat'?'lat':'cyr');


// Continuous partner logo ribbon. Clones are decorative and removed from the accessibility tree.
const partnersTrack=document.querySelector('.partners-grid');
if(partnersTrack){
 const originals=[...partnersTrack.children];
 for(const partner of originals){const clone=partner.cloneNode(true);clone.classList.add('partner-clone');clone.setAttribute('aria-hidden','true');clone.tabIndex=-1;clone.querySelectorAll('a').forEach(el=>el.tabIndex=-1);clone.removeAttribute('href');partnersTrack.appendChild(clone)}
}
// Counters only run in view; values are drawn from the organization's published statistics.
const counters=[...document.querySelectorAll('.stat-number')];
const numberFormatter=(value,decimals)=>new Intl.NumberFormat('sr-RS',{minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(value);
const animateCount=el=>{
 if(el.dataset.finished)return;
 el.dataset.finished='true';
 const target=Number(el.dataset.target),decimals=Number(el.dataset.decimals||0);
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=numberFormatter(target,decimals);return}
 const start=performance.now(),duration=1650;
 function update(now){const t=Math.min(1,(now-start)/duration);const eased=1-Math.pow(1-t,3);el.textContent=numberFormatter(target*eased,decimals);if(t<1)requestAnimationFrame(update)}
 requestAnimationFrame(update);
};
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){animateCount(entry.target);io.unobserve(entry.target)}}},{threshold:.3});counters.forEach(el=>io.observe(el))}else{counters.forEach(animateCount)}

updateScript(saved==='lat'?'lat':'cyr');
