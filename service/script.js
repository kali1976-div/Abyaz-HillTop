const servicesData = [
  {
    icon: "bi-file-earmark-check",
    image: "https://picsum.photos/seed/svcpassport/500/300",
    title: "Visa Assistance",
    desc: "Get expert guidance and hassle-free visa processing for your dream destination."
  },
  {
    icon: "bi-airplane",
    image: "https://picsum.photos/seed/svcflight/500/300",
    title: "Flight Bookings",
    desc: "Best deals on domestic and international flights with top airlines."
  },
  {
    icon: "bi-building",
    image: "https://picsum.photos/seed/svchotel/500/300",
    title: "Hotel Bookings",
    desc: "Comfortable stays at the best hotels around the world."
  },
  {
    icon: "bi-map",
    image: "https://picsum.photos/seed/svctour/500/300",
    title: "Tour Packages",
    desc: "Explore amazing destinations with our customized tour packages."
  },
  {
    icon: "bi-moon-stars",
    image: "https://picsum.photos/seed/svcumrah/500/300",
    title: "Umrah Services",
    desc: "Spiritual journeys made easier with complete Umrah packages."
  },
  {
    icon: "bi-car-front",
    image: "https://picsum.photos/seed/svctransport/500/300",
    title: "Transport Services",
    desc: "Safe and reliable transport for all your travel needs."
  }
];

/* Example of adding a new service purely through JS —
   uncomment to see it appear in the scroller automatically:

servicesData.push({
  icon: "bi-heart",
  image: "https://picsum.photos/seed/svchoneymoon/500/300",
  title: "Honeymoon Packages",
  desc: "Romantic getaways tailored for newlyweds, planned down to the last detail."
});
*/

const track = document.getElementById('servicesTrack');
const dotsWrap = document.getElementById('svcDots');

function renderServices(list){
  track.innerHTML = '';
  dotsWrap.innerHTML = '';
  list.forEach((svc, i) => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="img-wrap"><img src="${svc.image}" alt="${svc.title}"></div>
      <div class="body">
        <div class="icon-circle"><i class="bi ${svc.icon}"></i></div>
        <h5>${svc.title}</h5>
        <p>${svc.desc}</p>
        <a href="#" class="learn-more">Learn More <i class="bi bi-arrow-right"></i></a>
      </div>`;
    track.appendChild(card);

    const dot = document.createElement('span');
    if(i === 0) dot.classList.add('active');
    dotsWrap.appendChild(dot);
  });
}
renderServices(servicesData);

/* ---------- Horizontal scroll controls (left <-> right) ---------- */
const prevBtn = document.getElementById('svcPrev');
const nextBtn = document.getElementById('svcNext');

function cardStep(){
  const card = track.querySelector('.service-card');
  if(!card) return 300;
  const style = getComputedStyle(track);
  const gap = parseFloat(style.columnGap || style.gap || 24);
  return card.getBoundingClientRect().width + gap;
}

function updateScrollerButtons(){
  const maxScroll = track.scrollWidth - track.clientWidth - 2;
  prevBtn.disabled = track.scrollLeft <= 0;
  nextBtn.disabled = track.scrollLeft >= maxScroll;

  // Update dots based on nearest card index
  const step = cardStep();
  const active = Math.round(track.scrollLeft / step);
  [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === active));
}

nextBtn.addEventListener('click', () => {
  track.scrollBy({ left: cardStep(), behavior: 'smooth' });
});
prevBtn.addEventListener('click', () => {
  track.scrollBy({ left: -cardStep(), behavior: 'smooth' });
});
track.addEventListener('scroll', updateScrollerButtons);
window.addEventListener('resize', updateScrollerButtons);
updateScrollerButtons();

/* ---------- Drag-to-scroll with mouse (desktop) ---------- */
let isDown = false, startX, scrollStart;
track.addEventListener('mousedown', (e) => {
  isDown = true;
  track.classList.add('dragging');
  startX = e.pageX;
  scrollStart = track.scrollLeft;
});
window.addEventListener('mouseup', () => {
  isDown = false;
  track.classList.remove('dragging');
});
window.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const walk = e.pageX - startX;
  track.scrollLeft = scrollStart - walk;
});

/* ---------- Optional: mouse-wheel maps vertical wheel to horizontal scroll ---------- */
track.addEventListener('wheel', (e) => {
  if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  }
}, { passive: false });

/* Close mobile nav on link click */
document.querySelectorAll('#mainNav .nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    const nav = document.getElementById('mainNav');
    if(nav.classList.contains('show')){
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});