
  // Hero dot indicators — cycle background tint / active dot every 4s
  const dots = document.querySelectorAll('#heroDots button');
  let heroIndex = 0;
  function setHeroDot(i){
    dots.forEach(d=>d.classList.remove('active'));
    dots[i].classList.add('active');
    heroIndex = i;
  }
  dots.forEach(d=>{
    d.addEventListener('click',()=> setHeroDot(parseInt(d.dataset.i)));
  });
  setInterval(()=>{
    setHeroDot((heroIndex+1) % dots.length);
  },4000);

  // Testimonial arrows
  const track = document.getElementById('testiTrack');
  const slideWidth = () => track.querySelector('.testi-slide').getBoundingClientRect().width + 24;
  document.getElementById('testiNext').addEventListener('click', ()=>{
    track.scrollBy({left: slideWidth(), behavior:'smooth'});
  });
  document.getElementById('testiPrev').addEventListener('click', ()=>{
    track.scrollBy({left: -slideWidth(), behavior:'smooth'});
  });

  // Close mobile nav on link click
  document.querySelectorAll('#mainNav .nav-link').forEach(link=>{
    link.addEventListener('click', ()=>{
      const nav = document.getElementById('mainNav');
      if(nav.classList.contains('show')){
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });