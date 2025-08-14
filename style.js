// ==========================
    // Small JS for interactions & animations
    // ==========================
    document.getElementById('year').textContent = new Date().getFullYear();

    // Intersection Observer to reveal elements
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      })
    },{threshold:0.12});

    document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

    // Animate skill bars when visible (they already have widths inline; this will animate from 0)
    document.querySelectorAll('.bar > i').forEach(el=>{
      const final = el.style.width || '0%';
      el.style.width = '0%';
      // when parent comes into view, animate
      const parent = el.closest('.fade-in') || el;
      io.observe(parent);
      parent.addEventListener('transitionend', ()=>{});
      // simple timeout fallback
      setTimeout(()=>{ el.style.width = final; }, 600);
    });

    // Contact form handler (client-side only)
    function handleContact(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const msg = document.getElementById('message').value.trim();
      if(!name||!email||!msg){ alert('Fill the form'); return }
      // Replace this with your backend endpoint or Formspree / EmailJS integration
      alert('Thanks '+name+" — message sent (demo). Update the form handler to actually send messages.");
      e.target.reset();
    }

    function openProject(url){
      if(url&&url!=='#') window.open(url,'_blank');
      else alert('Replace the project link in the HTML to open a live demo or repo.');
    }

    // Smooth link scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (ev)=>{
        ev.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if(target) target.scrollIntoView({behavior:'smooth'});
      })
    });