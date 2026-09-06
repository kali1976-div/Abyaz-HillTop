/* ============================================================
   TEAM DATA — single source of truth for the "Meet the Team"
   section. Add a new team member by pushing a new object here;
   the grid rebuilds automatically. No HTML editing required.
   ============================================================ */
const teamData = [
  {
    name: "Abyaz Durrani",
    role: "Founder & CEO",
    photo: "https://picsum.photos/seed/teambilal/400/450",
    socials: { facebook: "#", instagram: "#", whatsapp: "https://wa.me/923001234567" }
  },
  {
    name: "Zulkifal Jan",
    role: "Main Developer & Mantainer",
    photo: "https://picsum.photos/seed/teamayesha/400/450",
    socials: { facebook: "#", instagram: "#", whatsapp: "https://wa.me/923045242523" }
  }

];

/* Example — add a new team member purely through JS:
teamData.push({
  name: "Hamza Farooq",
  role: "Flight Booking Specialist",
  photo: "https://picsum.photos/seed/teamhamza/400/450",
  socials: { facebook: "#", instagram: "#", linkedin: "#" }
});
*/

const teamGrid = document.getElementById('teamGrid');

function renderTeam(list){
  teamGrid.innerHTML = '';
  list.forEach(member => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <div class="team-card">
        <div class="photo-wrap">
          <img src="${member.photo}" alt="${member.name}">
          <div class="socials">
            <a href="${member.socials.facebook}"><i class="bi bi-facebook"></i></a>
            <a href="${member.socials.instagram}"><i class="bi bi-instagram"></i></a>
            <a href="${member.socials.whatsapp}"><i class="bi bi-whatsapp"></i></a>
          </div>
        </div>
        <div class="body">
          <h6>${member.name}</h6>
          <div class="role">${member.role}</div>
        </div>
      </div>`;
    teamGrid.appendChild(col);
  });
}
renderTeam(teamData);

/* Close mobile nav on link click */
document.querySelectorAll('#mainNav .nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    const nav = document.getElementById('mainNav');
    if(nav.classList.contains('show')){
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});