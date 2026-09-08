
/* ============================================================
   SUPABASE
   ============================================================ */

const SUPABASE_URL = "https://lywgpqykwnoijlhkvogz.supabase.co";

const SUPABASE_KEY = "sb_publishable_KkS0VK5PfEPK9mLs_ZCpwA_vgabastT";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

/* ============================================================
   VISA PACKAGES DATA — single source of truth.
   ============================================================ */

const visaPackages = [
  {
    category: "study",
    icon: "bi-mortarboard",
    color: "blue",
    country: "Turkey",
    title: "Student Visa",
    price: 3000,
    duration: "30 Days",
    processing: "20 - 22 Business Days",
    popular: true,
    features: [
      "University document checklist",
      "Financial proof guidance",
      "Interview preparation"
    ]
  },

  {
    category: "Tourist",
    icon: "bi-airplane",
    color: "purple",
    country: "Dubai / UAE",
    title: "Tourist Visa",
    price: 820,
    duration: "30 days",
    processing: "2 - 3 Business Days",
    popular: false,
    features: [
      "Fast-track processing",
      "Low document requirement",
      "Best for short trips"
    ]
  },
// done
  {
    category: "work",
    icon: "bi-briefcase",
    color: "green",
    country: "Serbia",
    title: "Work Visa",
    price: 17000,
    duration: "1 Year",
    processing: "5 - 6 months",
    popular: false,
    features: [
      "University document checklist",
      "Financial proof guidance",
      "Interview preparation"
    ]
  },

  {
    category: "Umrah",
    icon: "bi-moon-stars",
    color: "teal",
    country: "Saudi Arabia",
    title: "Umrah Visa",
    price: 920,
    duration: "14 / 21 Days",
    processing: "15 - 20 Business Days",
    popular: true,
    features: [
      "Group & individual options",
      "Ziyarat guidance included",
      "24/7 support during travel"
    ]
  },

  {
    category: "Business",
    icon: "bi-briefcase",
    color: "orange",
    country: "Dubai / UAE",
    title: "Business Visa",
    price: 950,
    duration: "5 Years",
    processing: "25 - 30 Business Days",
    popular: false,
    features: [
      "Employer document handling",
      "Medical & labor clearance",
      "Contract attestation support"
    ]
  },
     {
    category: "work",
    icon: "bi-briefcase",
    color: "blue",
    country: "Greece",
    title: "Work Visa",
    price: 21000,
    duration: "1 Year",
    processing: "5 - 6 months",
    popular: false,
    features: [
      "University document checklist",
      "Financial proof guidance",
      "Interview preparation"
    ]
  },
    {
    category: "work",
    icon: "bi-briefcase",
    color: "purple",
    country: "Bulgaria",
    title: "Work Visa",
    price: 20000,
    duration: "1 Year",
    processing: "5 - 6 months",
    popular: true,
    features: [
      "University document checklist",
      "Financial proof guidance",
      "Interview preparation"
    ]
  },

  {
    category: "Tourist",
    icon: "bi-airplane-engines",
    color: "pink",
    country: "Malaysia / Thailand",
    title: "Transit & Tourist Visa",
    price: 1100,
    duration: "30 Days",
    processing: "25 - 30 Business Days",
    popular: false,
    features: [
      "Fast-track processing",
      "Low document requirement",
      "Best for short trips"
    ]
  },
    {
    category: "Tourist",
    icon: "bi-airplane-engines",
    color: "red",
    country: "Sri Lanka / Azerbaijan",
    title: "Transit & Tourist Visa",
    price: 1100,
    duration: "30 Days",
    processing: "25 - 30 Business Days",
    popular: true,
    features: [
      "Fast-track processing",
      "Low document requirement",
      "Best for short trips"
    ]
  }
];


/* ============================================================
   ELEMENTS
   ============================================================ */

const grid = document.getElementById("visaGrid");
const tabsWrap = document.getElementById("filterTabs");
const emptyState = document.getElementById("emptyState");

let activeCategory = "All";



  //  CATEGORY FILTER


function uniqueCategories(list) {
  return ["All", ...new Set(list.map(p => p.category))];
}


function renderTabs() {
  tabsWrap.innerHTML = "";
  uniqueCategories(visaPackages).forEach(cat => {
    const btn = document.createElement("button");

    btn.className =
      "filter-btn" +
      (cat === activeCategory ? " active" : "");

    btn.textContent = cat;

btn.addEventListener("click", () => {

  activeCategory = cat;

  // Start from first row again
  visiblePackages = 3;

  renderTabs();
  renderGrid();

});
    tabsWrap.appendChild(btn);

  });

}


/* ============================================================
   VISA GRID
   ============================================================ */

let visiblePackages = 3;
const packagesPerRow = 3;

function renderGrid() {

  const list =
    activeCategory === "All"
      ? visaPackages
      : visaPackages.filter(
          p => p.category === activeCategory
        );

  grid.innerHTML = "";

  emptyState.style.display =
    list.length ? "none" : "block";

  // Show only currently visible packages
  const visibleList = list.slice(0, visiblePackages);

  visibleList.forEach(pkg => {

    const col = document.createElement("div");

    col.className = "col-12 col-sm-6 col-lg-4";

    col.innerHTML = `
      <div class="visa-card">

        <div class="top-strip">

          <div class="flag-icon bg-${pkg.color}-tint">
            <i class="bi ${pkg.icon}"></i>
          </div>

          ${
            pkg.popular
              ? '<span class="badge-pop">Most Popular</span>'
              : ""
          }

        </div>

        <div class="body">

          <h5>${pkg.title}</h5>

          <div class="country">
            <i class="bi bi-geo-alt me-1"></i>
            ${pkg.country}
          </div>

          <div class="price">
            $${pkg.price}
            <span> / applicant</span>
          </div>

          <ul>
            ${pkg.features
              .map(
                f => `
                  <li>
                    <i class="bi bi-check-circle-fill"></i>
                    ${f}
                  </li>
                `
              )
              .join("")}
          </ul>

          <div class="meta-row">

            <span>
              <i class="bi bi-clock me-1"></i>
              ${pkg.processing}
            </span>

            <span>
              <i class="bi bi-calendar3 me-1"></i>
              ${pkg.duration}
            </span>

          </div>

          <button
            class="btn-apply"
            type="button"
          >
            Apply Now
          </button>

        </div>

      </div>
    `;

    /* Apply Now */
    const applyButton =
      col.querySelector(".btn-apply");

    applyButton.addEventListener("click", () => {
      openVisaApplication(pkg);
    });

    grid.appendChild(col);

  });


  /* ============================================================
     VIEW MORE BUTTON
     ============================================================ */

  let viewMoreContainer =
    document.getElementById("viewMoreContainer");

  if (!viewMoreContainer) {

    viewMoreContainer =
      document.createElement("div");

    viewMoreContainer.id =
      "viewMoreContainer";

    viewMoreContainer.className =
      "text-center mt-4";

    grid.parentElement.appendChild(
      viewMoreContainer
    );
  }

  viewMoreContainer.innerHTML = "";


  /* Show View More only when packages remain */

  if (visiblePackages < list.length) {

    const viewMoreButton =
      document.createElement("button");

    viewMoreButton.className =
      "btn btn-primary px-4 py-2";

    viewMoreButton.innerHTML = `
      View More
      <i class="bi bi-chevron-down ms-2"></i>
    `;

    viewMoreButton.addEventListener(
      "click",
      () => {

        visiblePackages += packagesPerRow;

        renderGrid();

      }
    );

    viewMoreContainer.appendChild(
      viewMoreButton
    );

  }

}

/* ============================================================
   VISA APPLICATION MODAL
   ============================================================ */

function createVisaModal() {

  if (document.getElementById("visaApplicationModal")) {
    return;
  }


  const modalHTML = `

    <div
      class="modal fade"
      id="visaApplicationModal"
      tabindex="-1"
      aria-hidden="true"
    >

      <div
        class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
      >

        <div class="modal-content">


          <div class="modal-header">

            <div>

              <h5 class="modal-title">
                <i class="bi bi-passport me-2"></i>
                Visa Application
              </h5>

              <small
                id="selectedVisaPackage"
                class="text-muted"
              ></small>

            </div>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>


          <form id="visaApplicationForm">

            <div class="modal-body">


              <!-- PERSONAL INFORMATION -->

              <h6 class="mb-3">
                <i class="bi bi-person me-2"></i>
                Personal Information
              </h6>


              <div class="row g-3">


                <div class="col-md-6">

                  <label class="form-label">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="visaFullName"
                    required
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Email *
                  </label>

                  <input
                    type="email"
                    class="form-control"
                    id="visaEmail"
                    required
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Phone / WhatsApp *
                  </label>

                  <input
                    type="tel"
                    class="form-control"
                    id="visaPhone"
                    required
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    class="form-control"
                    id="visaDOB"
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Nationality
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="visaNationality"
                    placeholder="e.g. Pakistani"
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Current City
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="visaCity"
                    placeholder="e.g. Peshawar"
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Passport Number
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="visaPassport"
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Occupation
                  </label>

                  <select
                    class="form-select"
                    id="visaOccupation"
                  >

                    <option value="">
                      Select occupation
                    </option>

                    <option>Student</option>
                    <option>Employed</option>
                    <option>Business Owner</option>
                    <option>Self Employed</option>
                    <option>Government Employee</option>
                    <option>Other</option>

                  </select>

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Marital Status
                  </label>

                  <select
                    class="form-select"
                    id="visaMaritalStatus"
                  >

                    <option value="">
                      Select status
                    </option>

                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>

                  </select>

                </div>

              </div>


              <hr class="my-4">


              <!-- TRAVEL INFORMATION -->

              <h6 class="mb-3">

                <i class="bi bi-airplane me-2"></i>
                Travel Information

              </h6>


              <div class="row g-3">


                <div class="col-md-6">

                  <label class="form-label">
                    Destination
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="visaDestination"
                    readonly
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Visa Type
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="visaType"
                    readonly
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Intended Travel Date
                  </label>

                  <input
                    type="date"
                    class="form-control"
                    id="visaTravelDate"
                  >

                </div>


                <div class="col-md-6">

                  <label class="form-label">
                    Intended Return Date
                  </label>

                  <input
                    type="date"
                    class="form-control"
                    id="visaReturnDate"
                  >

                </div>


                <div class="col-12">

                  <label class="form-label">
                    Previous Visa / Travel History
                  </label>

                  <textarea
                    class="form-control"
                    id="visaPrevious"
                    rows="3"
                    placeholder="Tell us about previous visas or international travel, if applicable."
                  ></textarea>

                </div>


                <div class="col-12">

                  <label class="form-label">
                    Additional Information
                  </label>

                  <textarea
                    class="form-control"
                    id="visaAdditional"
                    rows="4"
                    placeholder="Any other information you want our visa consultant to know..."
                  ></textarea>

                </div>

              </div>


              <div class="alert alert-info mt-4">

                <i class="bi bi-info-circle me-2"></i>

                Please provide accurate information. Our team will
                review your application and contact you regarding
                the next steps.

              </div>


              <div
                id="visaFormMessage"
                class="mt-3"
              ></div>


            </div>


            <div class="modal-footer">

              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>


              <button
                type="submit"
                class="btn btn-primary"
                id="visaSubmitButton"
              >

                <i class="bi bi-send me-2"></i>
                Submit Application

              </button>

            </div>


          </form>

        </div>

      </div>

    </div>

  `;


  document.body.insertAdjacentHTML(
    "beforeend",
    modalHTML
  );


  document
    .getElementById("visaApplicationForm")
    .addEventListener(
      "submit",
      submitVisaApplication
    );

}


  //  CURRENT SELECTED PACKAGE
let selectedPackage = null;


  //  OPEN VISA APPLICATION

function openVisaApplication(pkg) {
  selectedPackage = pkg;
  createVisaModal();
  document.getElementById(
    "selectedVisaPackage"
  ).textContent =
    `${pkg.title} — ${pkg.country} — $${pkg.price} / applicant`;

  document.getElementById(
    "visaDestination"
  ).value = pkg.country;

  document.getElementById(
    "visaType"
  ).value = pkg.title;

  document.getElementById(
    "visaFormMessage"
  ).innerHTML = "";


  const modalElement =
    document.getElementById(
      "visaApplicationModal"
    );


  const modal =
    bootstrap.Modal.getOrCreateInstance(
      modalElement
    );


  modal.show();

}


  //  SUBMIT VISA APPLICATION


async function submitVisaApplication(event) {

  event.preventDefault();
  if (!selectedPackage) {
    alert("Please select a visa package first.");
    return;
  }


  const submitButton =
    document.getElementById(
      "visaSubmitButton"
    );


  const message =
    document.getElementById(
      "visaFormMessage"
    );


  submitButton.disabled = true;


  submitButton.innerHTML = `
    <span
      class="spinner-border spinner-border-sm me-2"
    ></span>
    Submitting...
  `;


  message.innerHTML = "";
  const applicationData = {
    full_name:
      document.getElementById(
        "visaFullName"
      ).value.trim(),

    email:
      document.getElementById(
        "visaEmail"
      ).value.trim(),

    phone:
      document.getElementById(
        "visaPhone"
      ).value.trim(),

    passport_number:
      document.getElementById(
        "visaPassport"
      ).value.trim(),

    date_of_birth:
      document.getElementById(
        "visaDOB"
      ).value || null,

    nationality:
      document.getElementById(
        "visaNationality"
      ).value.trim(),

    current_city:
      document.getElementById(
        "visaCity"
      ).value.trim(),

    destination:
      selectedPackage.country,

    visa_type:
      selectedPackage.title,

    travel_date:
      document.getElementById(
        "visaTravelDate"
      ).value || null,

    return_date:
      document.getElementById(
        "visaReturnDate"
      ).value || null,

    occupation:
      document.getElementById(
        "visaOccupation"
      ).value,

    marital_status:
      document.getElementById(
        "visaMaritalStatus"
      ).value,

    previous_visa:
      document.getElementById(
        "visaPrevious"
      ).value.trim(),

    additional_info:
      document.getElementById(
        "visaAdditional"
      ).value.trim(),

    package_name:
      selectedPackage.title,

    package_price:
      selectedPackage.price

  };


  try {

    const { error } = await supabaseClient
      .from("visa_applications")
      .insert([applicationData]);

    if (error) {
      console.error(
        "Supabase error:",
        error
      );
      throw error;
    }


    message.innerHTML = `

      <div class="alert alert-success">
        <i class="bi bi-check-circle-fill me-2"></i>
        <strong>Application submitted successfully!</strong>
        <br>
        Our visa team will contact you soon.
      </div>

    `;

    document
      .getElementById(
        "visaApplicationForm"
      )
      .reset();

    document.getElementById(
      "visaDestination"
    ).value =
      selectedPackage.country;


    document.getElementById(
      "visaType"
    ).value =
      selectedPackage.title;


  } catch (error) {
    message.innerHTML = `
      <div class="alert alert-danger">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        Something went wrong while submitting
        your application. Please try again later or contact support.

      </div>

    `;

  }


  submitButton.disabled = false;

  submitButton.innerHTML = `
    <i class="bi bi-send me-2"></i>
    Submit Application
  `;

}



  //  INITIAL RENDER


renderTabs();
renderGrid();



  //  CLOSE MOBILE NAV ON LINK CLICK
document
  .querySelectorAll("#mainNav .nav-link")
  .forEach(link => {

    link.addEventListener("click", () => {

      const nav =
        document.getElementById("mainNav");


      if (
        nav.classList.contains("show")
      ) {

        bootstrap.Collapse
          .getOrCreateInstance(nav)
          .hide();

      }

    });

  });

