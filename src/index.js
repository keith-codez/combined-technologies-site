// Hamburger toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Scroll animation: blur + shadow on scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
      if(window.scrollY > 50){
        header.classList.add('backdrop-blur-md', 'bg-white/30', 'shadow-md');
      } else {
        header.classList.remove('backdrop-blur-md', 'bg-white/30', 'shadow-md');
      }
    });

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });
    
// Feather icons
feather.replace();

// 3D tilt for service cards
const cards = document.querySelectorAll('.service-card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X inside card
    const y = e.clientY - rect.top;  // mouse Y inside card
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const dx = (x - cx) / cx; // normalize -1 to 1
    const dy = (y - cy) / cy;

    card.style.transform = `rotateX(${dy * 5}deg) rotateY(${dx * 5}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  });
});

