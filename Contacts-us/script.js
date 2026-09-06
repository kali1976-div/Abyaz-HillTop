/* ============================================================
   QUICK CONTACT CARDS — single source of truth.
   ============================================================ */
const contactInfo = [
  { icon: "bi-telephone-fill", color: "blue",   title: "Call Us",    value: "+92 300 123 4567",     href: "tel:+923001234567" },
  { icon: "bi-envelope-fill",  color: "green",  title: "Email Us",   value: "info@abyaztravel.com", href: "mailto:info@abyaztravel.com" },
  { icon: "bi-geo-alt-fill",   color: "purple", title: "Visit Us",   value: "Peshawar, Pakistan",   href: "#form" },
  { icon: "bi-clock-fill",     color: "orange", title: "Working Hours", value: "Mon – Sat, 9AM – 8PM", href: "#form" }
];

const infoGrid = document.getElementById('contactInfoGrid');
contactInfo.forEach(item => {
  const col = document.createElement('div');
  col.className = 'col-6 col-lg-3';
  col.innerHTML = `
    <div class="contact-card">
      <div class="icon-circle bg-${item.color}-tint"><i class="bi ${item.icon}"></i></div>
      <h6>${item.title}</h6>
      <a class="value" href="${item.href}">${item.value}</a>
    </div>`;
  infoGrid.appendChild(col);
});

/* ============================================================
   OFFICE BRANCHES — add a new branch by pushing an object here;
   the grid rebuilds automatically. No HTML editing required.
   ============================================================ */
const officesData = [
  {
    hq: true,
    city: "Peshawar",
    address: "University Road, Peshawar, Pakistan",
    phone: "+92 300 123 4567",
    hours: "Mon – Sat, 9:00 AM – 8:00 PM"
  },
  {
    hq: false,
    city: "Islamabad",
    address: "Blue Area, Islamabad, Pakistan",
    phone: "+92 300 765 4321",
    hours: "Mon – Sat, 10:00 AM – 7:00 PM"
  },
  {
    hq: false,
    city: "Lahore",
    address: "Gulberg III, Lahore, Pakistan",
    phone: "+92 300 999 8877",
    hours: "Mon – Sat, 10:00 AM – 7:00 PM"
  }
];

/* Example — add a new branch purely through JS:
officesData.push({
  hq: false,
  city: "Karachi",
  address: "Clifton, Karachi, Pakistan",
  phone: "+92 300 555 1122",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM"
});
*/

const officesGrid = document.getElementById('officesGrid');
function renderOffices(list){
  officesGrid.innerHTML = '';
  list.forEach(o => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="office-card">
        ${o.hq ? '<span class="badge-hq">Head Office</span>' : ''}
        <h5>${o.city}</h5>
        <div class="row-line"><i class="bi bi-geo-alt-fill"></i><span>${o.address}</span></div>
        <div class="row-line"><i class="bi bi-telephone-fill"></i><span>${o.phone}</span></div>
        <div class="row-line"><i class="bi bi-clock-fill"></i><span>${o.hours}</span></div>
        <a href="https://www.google.com/maps?q=${encodeURIComponent(o.city)}" target="_blank" class="directions">Get Directions <i class="bi bi-arrow-right"></i></a>
      </div>`;
    officesGrid.appendChild(col);
  });
}
renderOffices(officesData);

/* ============================================================
   CONTACT FORM — client-side validation + simulated submission.
   ============================================================ */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formAlert = document.getElementById('formAlert');
const formAlertText = document.getElementById('formAlertText');

function showFieldError(id, show){
  const field = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  field.classList.toggle('is-invalid-field', show);
  if(err) err.style.display = show ? 'block' : 'none';
}

function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', function(e){
  e.preventDefault();
  formAlert.style.display = 'none';

  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const message = document.getElementById('fMessage').value.trim();

  let valid = true;
  if(name === ''){ showFieldError('fName', true); valid = false; } else { showFieldError('fName', false); }
  if(!isValidEmail(email)){ showFieldError('fEmail', true); valid = false; } else { showFieldError('fEmail', false); }
  if(message.length < 5){ showFieldError('fMessage', true); valid = false; } else { showFieldError('fMessage', false); }

  if(!valid) return;

  // Simulate sending (no backend wired up yet)
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-send me-1"></i> Send Message';
    formAlertText.textContent = `Thanks, ${name.split(' ')[0]}! Your message has been sent — we'll be in touch soon.`;
    formAlert.style.display = 'flex';
    form.reset();
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 900);
});

/* Close mobile nav on link click */
document.querySelectorAll('#mainNav .nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    const nav = document.getElementById('mainNav');
    if(nav.classList.contains('show')){
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});