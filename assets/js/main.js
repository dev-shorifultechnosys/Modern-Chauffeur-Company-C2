
const defaultHeroSlides = [
  'assets/images/executive-arrival-woman-opening-car-door-for-man-2026-03-24-23-20-37-utc.jpg',
  'assets/images/business-professionals-arriving-at-stylish-urban-b-2026-03-24-06-21-55-utc.JPG',
  'assets/images/middle-aged-woman-arriving-at-hotel-with-luggage-a-2026-03-26-23-23-51-utc.jpg',
  'assets/images/woman-with-driver-in-limousine-city-setting-2026-03-27-02-24-11-utc.jpg',
  'assets/images/professionals-with-luggage-by-cars-on-city-street-2026-01-08-07-49-17-utc.JPG'
];

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initHeroSlides();
  initReveal();
  initForms();
  setActiveNav();
  initFleetSlider();
});
function initHeader(){const header=document.querySelector('.site-header');const onScroll=()=>{if(window.scrollY>20) header.classList.add('is-scrolled'); else header.classList.remove('is-scrolled');};onScroll();window.addEventListener('scroll', onScroll, {passive:true});}
function initMobileMenu(){const toggle=document.querySelector('.menu-toggle');const menu=document.querySelector('.nav-menu');if(!toggle||!menu)return;toggle.addEventListener('click',()=>{menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded', menu.classList.contains('is-open')?'true':'false');});menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menu.classList.remove('is-open')));}
function setActiveNav(){const current=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-menu a').forEach(a=>{const href=a.getAttribute('href');if(href===current)a.classList.add('active');});}
function initHeroSlides(){document.querySelectorAll('[data-hero-slides]').forEach(hero=>{let slides=[];try{slides=JSON.parse(hero.dataset.heroSlides);}catch(e){slides=defaultHeroSlides;}if(!Array.isArray(slides)||!slides.length) slides=defaultHeroSlides;const bgA=document.createElement('div');const bgB=document.createElement('div');bgA.className='hero-bg is-zooming';bgB.className='hero-bg-next';bgA.style.backgroundImage=`url("${slides[0]}")`;hero.prepend(bgB);hero.prepend(bgA);let active=0;let showingA=true;slides.forEach(src=>{const img=new Image();img.src=src;});setInterval(()=>{const next=(active+1)%slides.length;const visible=showingA?bgA:bgB;const hidden=showingA?bgB:bgA;hidden.style.backgroundImage=`url("${slides[next]}")`;hidden.classList.add('is-zooming');hidden.style.opacity='1';visible.style.opacity='0';setTimeout(()=>{visible.classList.remove('is-zooming');visible.style.opacity='0';},1400);active=next;showingA=!showingA;},5200);});}
function initReveal(){const items=document.querySelectorAll('.reveal');if(!items.length)return;const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.14});items.forEach(item=>observer.observe(item));}
function initForms(){document.querySelectorAll('[data-contact-form]').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const alert=form.querySelector('.alert');const formType=form.dataset.contactForm||'Website Enquiry';const email=form.dataset.email||'bookings@yourcompany.com';const lines=[`${formType} from website`, ''];data.forEach((value,key)=>{if(value) lines.push(`${formatLabel(key)}: ${value}`);});const subject=encodeURIComponent(formType);const body=encodeURIComponent(lines.join('\n'));const mailto=`mailto:${email}?subject=${subject}&body=${body}`;if(alert){alert.textContent='Thank you. Your email app will open with the enquiry details. For automatic email sending, connect this form to Formspree, EmailJS, or a hosting/PHP mail endpoint.';alert.classList.add('is-visible');}window.location.href=mailto;form.reset();});});}
function formatLabel(key){return key.replaceAll('-', ' ').replaceAll('_', ' ').replace(/\b\w/g, char => char.toUpperCase());}

function initFleetSlider(){
  document.querySelectorAll('[data-fleet-slider]').forEach(slider=>{
    const imgs=[...slider.querySelectorAll('img')];
    if(!imgs.length)return;
    let i=0;
    imgs[0].classList.add('is-active');
    setInterval(()=>{
      imgs[i].classList.remove('is-active');
      i=(i+1)%imgs.length;
      imgs[i].classList.add('is-active');
    },3600);
  });
}
