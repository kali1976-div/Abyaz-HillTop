/* ============================================================
   VISA PACKAGES DATA — single source of truth.
   Add a new visa package by pushing a new object here; the grid
   and the category filter tabs both rebuild automatically.
   ============================================================ */
const visaPackages = [
  {
    category: "Tourist",
    icon: "bi-airplane",
    color: "blue",
    country: "UAE / Dubai",
    title: "Tourist Visa",
    price: 149,
    duration: "30 Days",
    processing: "3-5 Business Days",
    popular: true,
    features: ["Single/Multiple entry options", "Document review included", "Real-time status updates"]
  },
  {
    category: "Business",
    icon: "bi-briefcase",
    color: "purple",
    country: "Schengen / Europe",
    title: "Business Visa",
    price: 219,
    duration: "90 Days",
    processing: "10-15 Business Days",
    popular: false,
    features: ["Invitation letter guidance", "Appointment scheduling", "Application tracking"]
  },
  {
    category: "Study",
    icon: "bi-mortarboard",
    color: "green",
    country: "UK / Canada",
    title: "Student Visa",
    price: 299,
    duration: "Course Duration",
    processing: "2-6 Weeks",
    popular: false,
    features: ["University document checklist", "Financial proof guidance", "Interview preparation"]
  },
  {
    category: "Umrah",
    icon: "bi-moon-stars",
    color: "teal",
    country: "Saudi Arabia",
    title: "Umrah Visa",
    price: 179,
    duration: "30 Days",
    processing: "3-7 Business Days",
    popular: true,
    features: ["Group & individual options", "Ziyarat guidance included", "24/7 support during travel"]
  },
  {
    category: "Work",
    icon: "bi-tools",
    color: "orange",
    country: "Gulf Countries",
    title: "Work Visa",
    price: 349,
    duration: "1-2 Years",
    processing: "3-8 Weeks",
    popular: false,
    features: ["Employer document handling", "Medical & labor clearance", "Contract attestation support"]
  },
  {
    category: "Tourist",
    icon: "bi-airplane-engines",
    color: "pink",
    country: "Malaysia / Thailand",
    title: "Transit & Tourist Visa",
    price: 99,
    duration: "15-30 Days",
    processing: "2-4 Business Days",
    popular: false,
    features: ["Fast-track processing", "Low document requirement", "Best for short trips"]
  }
];

/* Example — add a brand new package purely through JS:
visaPackages.push({
  category: "Business",
  icon: "bi-globe",
  color: "blue",
  country: "USA",
  title: "B1/B2 Visa Support",
  price: 259,
  duration: "Up to 10 Years",
  processing: "Varies by embassy",
  popular: false,
  features: ["DS-160 form assistance", "Interview coaching", "Document folder prep"]
});
*/

const grid = document.getElementById('visaGrid');
const tabsWrap = document.getElementById('filterTabs');
const emptyState = document.getElementById('emptyState');
let activeCategory = "All";

function uniqueCategories(list){
  return ["All", ...new Set(list.map(p => p.category))];
}

function renderTabs(){
  tabsWrap.innerHTML = '';
  uniqueCategories(visaPackages).forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === activeCategory ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      renderTabs();
      renderGrid();
    });
    tabsWrap.appendChild(btn);
  });
}

function renderGrid(){
  const list = activeCategory === "All"
    ? visaPackages
    : visaPackages.filter(p => p.category === activeCategory);

  grid.innerHTML = '';
  emptyState.style.display = list.length ? 'none' : 'block';

  list.forEach(pkg => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';
    col.innerHTML = `
      <div class="visa-card">
        <div class="top-strip">
          <div class="flag-icon bg-${pkg.color}-tint"><i class="bi ${pkg.icon}"></i></div>
          ${pkg.popular ? '<span class="badge-pop">Most Popular</span>' : ''}
        </div>
        <div class="body">
          <h5>${pkg.title}</h5>
          <div class="country"><i class="bi bi-geo-alt me-1"></i>${pkg.country}</div>
          <div class="price">$${pkg.price}<span> / applicant</span></div>
          <ul>
            ${pkg.features.map(f => `<li><i class="bi bi-check-circle-fill"></i>${f}</li>`).join('')}
          </ul>
          <div class="meta-row">
            <span><i class="bi bi-clock me-1"></i>${pkg.processing}</span>
            <span><i class="bi bi-calendar3 me-1"></i>${pkg.duration}</span>
          </div>
          <button class="btn-apply">Apply Now</button>
        </div>
      </div>`;
    grid.appendChild(col);
  });
}

renderTabs();
renderGrid();

/* Close mobile nav on link click */
document.querySelectorAll('#mainNav .nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    const nav = document.getElementById('mainNav');
    if(nav.classList.contains('show')){
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});