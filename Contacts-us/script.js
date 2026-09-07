
// SUPABASE

const SUPABASE_URL = "https://lywgpqykwnoijlhkvogz.supabase.co";

const SUPABASE_KEY = "sb_publishable_KkS0VK5PfEPK9mLs_ZCpwA_vgabastT";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


  //  QUICK CONTACT CARDS — single source of truth.

const contactInfo = [
  { icon: "bi-telephone-fill", color: "blue",   title: "Call Us",    value: "+92 313 5187440",     href: "https://wa.me/923135187440" },
  { icon: "bi-envelope-fill",  color: "green",  title: "Email Us",   value: "abyazhilltoptravelandtours", href: "https://mail.google.com/mail/?view=cm&fs=1&to=abyazhilltoptravelandtours@gmail.com" },
  { icon: "bi-geo-alt-fill",   color: "purple", title: "Visit Us",   value: "Deans , Peshawar, Pakistan",   href: "https://www.google.com/maps/place/Deans+centre+peshawar+saddar+Lesar+vision/@34.0011791,71.5409391,16.21z/data=!4m14!1m7!3m6!1s0x38d917006ff7dd25:0x4b469d142c41334d!2sDeans+centre+peshawar+saddar+Lesar+vision!8m2!3d34.0007963!4d71.5458297!16s%2Fg%2F11xkwb71r3!3m5!1s0x38d917006ff7dd25:0x4b469d142c41334d!8m2!3d34.0007963!4d71.5458297!16s%2Fg%2F11xkwb71r3?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" },
  { icon: "bi-clock-fill",     color: "orange", title: "Working Hours", value: "Mon – Sat, 9AM – 8PM", href: "#contactInfoGrid" }
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
    address: "Deans Centre, Peshawar, Pakistan",
    phone: "+92 313 518 7440",
    hours: "Mon – Sat, 9:00 AM – 8:00 PM"
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
        <a href="https://www.google.com/maps/place/Deans+centre+peshawar+saddar+Lesar+vision/@34.0011791,71.5409391,16.21z/data=!4m14!1m7!3m6!1s0x38d917006ff7dd25:0x4b469d142c41334d!2sDeans+centre+peshawar+saddar+Lesar+vision!8m2!3d34.0007963!4d71.5458297!16s%2Fg%2F11xkwb71r3!3m5!1s0x38d917006ff7dd25:0x4b469d142c41334d!8m2!3d34.0007963!4d71.5458297!16s%2Fg%2F11xkwb71r3?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="directions">Get Directions <i class="bi bi-arrow-right"></i></a>
      </div>`;
    officesGrid.appendChild(col);
  });
}
renderOffices(officesData);


  //  CONTACT FORM — validation + PHP/MySQL submission


const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formAlert = document.getElementById("formAlert");
const formAlertText = document.getElementById("formAlertText");

function showFieldError(id, show) {
    const field = document.getElementById(id);
    const err = document.getElementById("err-" + id);

    field.classList.toggle("is-invalid-field", show);

    if (err) {
        err.style.display = show ? "block" : "none";
    }
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    formAlert.style.display = "none";

    const name = document.getElementById("fName").value.trim();
    const email = document.getElementById("fEmail").value.trim();
    const phone = document.getElementById("fPhone").value.trim();
    const service = document.getElementById("fService").value;
    const message = document.getElementById("fMessage").value.trim();

    let valid = true;

    // Name validation
    if (name === "") {
        showFieldError("fName", true);
        valid = false;
    } else {
        showFieldError("fName", false);
    }

    // Email validation
    if (!isValidEmail(email)) {
        showFieldError("fEmail", true);
        valid = false;
    } else {
        showFieldError("fEmail", false);
    }

    // Message validation
    if (message.length < 5) {
        showFieldError("fMessage", true);
        valid = false;
    } else {
        showFieldError("fMessage", false);
    }

    if (!valid) {
        return;
    }

    // Loading state
    submitBtn.disabled = true;

    submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';

    try {

        // Send data to Supabase
        const { error } = await supabaseClient
            .from("contact_messages")
            .insert([
                {
                    full_name: name,
                    email: email,
                    phone: phone,
                    service: service,
                    message: message
                }
            ]);

        // Check for database error
        if (error) {
            console.error("Supabase error:", error);
            throw error;
        }

        // Success
        submitBtn.disabled = false;

        submitBtn.innerHTML =
            '<i class="bi bi-send me-1"></i> Send Message';

        formAlert.classList.remove("alert-danger");
        formAlert.classList.add("alert-success");

        formAlertText.textContent =
            `Thanks, ${name.split(" ")[0]}! Your message has been sent — we'll be in touch soon.`;

        formAlert.style.display = "flex";

        form.reset();

        formAlert.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    } catch (error) {

        console.error("Error submitting form:", error);

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            '<i class="bi bi-send me-1"></i> Send Message';

        formAlert.classList.remove("alert-success");
        formAlert.classList.add("alert-danger");

        formAlertText.textContent =
            "Sorry, we couldn't send your message. Please try again.";

        formAlert.style.display = "flex";
    }
});
