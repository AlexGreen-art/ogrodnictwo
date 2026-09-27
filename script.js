const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.dot')];
let current=0,timer;

function show(n){
  current=(n+slides.length)%slides.length;
  slides.forEach((s,i)=>s.classList.toggle('active',i===current));
  dots.forEach((d,i)=>d.classList.toggle('active',i===current));
}
function restart(){clearInterval(timer);timer=setInterval(()=>show(current+1),5500)}

document.getElementById('prev')?.addEventListener('click',()=>{show(current-1);restart()});
document.getElementById('next')?.addEventListener('click',()=>{show(current+1);restart()});
dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart()}));
restart();

// Menu mobilne
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('main-nav');
menu?.addEventListener('click',()=>{
  const open=nav.style.display==='flex';
  nav.style.display=open?'none':'flex';
  if(!open){
    nav.style.position='absolute';
    nav.style.top='74px';
    nav.style.left='0';
    nav.style.right='0';
    nav.style.padding='20px';
    nav.style.background='#fff';
    nav.style.flexDirection='column';
  }
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  if(window.innerWidth<=980) nav.style.display='none';
}));

// Efekt wejścia elementów podczas przewijania.
const revealItems=document.querySelectorAll('.section,.values-grid>div,.card,.month,.style-grid article,.real-grid img,.contact-data a');
revealItems.forEach((item,index)=>{
  item.classList.add('js-reveal');
  item.style.transitionDelay=`${Math.min(index%4,3)*70}ms`;
});

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add('is-visible'));
}

// Kalendarz: kliknięcie miesiąca pokazuje konkretne prace i porady.
const months=[...document.querySelectorAll('.month')];
const calendarDetail=document.getElementById('calendar-detail');
const calendarAdvice={
  'Styczeń':['sprawdź stan zimowych zabezpieczeń','planuj nasadzenia i prace na nowy sezon','kontroluj drzewa po opadach śniegu'],
  'Luty':['przygotuj pierwsze rozsady','po silnych mrozach można rozpocząć wybrane cięcia','sprawdź narzędzia i zaplanuj prace w ogrodzie'],
  'Marzec':['wykonuj cięcie drzew i krzewów zgodnie z gatunkiem i pogodą','przygotuj grządki po zimie','rozpocznij pierwsze nasadzenia, gdy pozwalają warunki'],
  'Kwiecień':['zakładaj nowe rabaty i przygotuj podłoże','siej i sadź rośliny odpowiednie dla terminu','przygotuj miejsca pod trawnik'],
  'Maj':['pielęgnuj młode nasadzenia','w razie potrzeby nawoź rośliny zgodnie z ich wymaganiami','kontroluj wilgotność gleby podczas intensywnego wzrostu'],
  'Czerwiec':['regularnie podlewaj i ściółkuj rabaty','kontroluj wzrost chwastów','zbieraj pierwsze owoce i obserwuj zdrowotność roślin'],
  'Lipiec':['zbieraj dojrzewające owoce','utrzymuj wilgotność gleby podczas upałów','kontynuuj letnią pielęgnację roślin'],
  'Sierpień':['zbieraj owoce i usuwaj uszkodzone części roślin','przygotuj ogród do jesiennych nasadzeń','wykonuj cięcia właściwe dla gatunków po zbiorach'],
  'Wrzesień':['dobry czas na wiele jesiennych nasadzeń','przygotuj trawnik do jesieni','zbieraj owoce i porządkuj rabaty'],
  'Październik':['sadź drzewa i krzewy, jeśli warunki są odpowiednie','zbieraj opadłe liście i wykorzystuj je do kompostu','przygotuj wrażliwe rośliny do zimy'],
  'Listopad':['grab i wykorzystuj zdrowe liście do kompostu lub ściółkowania','zabezpiecz wrażliwe rośliny przed mrozem','uporządkuj narzędzia i przygotuj ogród do zimy'],
  'Grudzień':['kontroluj zimowe zabezpieczenia','sprawdzaj stan drzew i krzewów po śniegu','zaplanuj nasadzenia i prace na kolejny sezon']
};

months.forEach(month=>{
  month.setAttribute('role','button');
  month.setAttribute('tabindex','0');
  month.setAttribute('aria-pressed','false');
  const select=()=>{
    months.forEach(m=>{
      const selected=m===month;
      m.classList.toggle('js-selected',selected);
      m.setAttribute('aria-pressed',String(selected));
    });
    const name=month.querySelector('h3')?.textContent?.trim()||'';
    const advice=calendarAdvice[name]||[];
    if(calendarDetail){
      calendarDetail.innerHTML=`<h3>${name}</h3><p>Najważniejsze prace i wskazówki:</p><ul>${advice.map(item=>`<li>${item}</li>`).join('')}</ul>`;
      calendarDetail.classList.add('is-visible');
    }
  };
  month.addEventListener('click',select);
  month.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();select();}
  });
});
