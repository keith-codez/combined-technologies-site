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

const portal = document.getElementById('ui-portal');

portal.innerHTML = `
  <!-- Back to Top (Bottom Left) -->
  <button
    id="backToTopBtn"
    onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
    style="
      position:fixed;
      bottom:24px;
      left:24px;
      z-index:2147483647;
      width:48px;
      height:48px;
      border-radius:9999px;
      background:rgb(8, 54, 222);
      color:white;
      border:none;
      cursor:pointer;
      display:flex;
      align-items:center;
      justify-content:center;
      box-shadow:0 10px 25px rgba(63, 18, 211, 0.38);
      transition:transform .2s ease, box-shadow .2s ease;
    "
    aria-label="Back to top"
    onmouseover="this.style.transform='translateY(-2px)'"
    onmouseout="this.style.transform='translateY(0)'"
  >
    <!-- Arrow Up Icon -->
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  </button>

  <!-- WhatsApp (Bottom Right) -->
  <a
    href="https://wa.me/263773186236"
    target="_blank"
    rel="noopener"
    style="
      position:fixed;
      bottom:24px;
      right:24px;
      z-index:2147483647;
      width:56px;
      height:56px;
      border-radius:9999px;
      background:#22c55e;
      color:white;
      display:flex;
      align-items:center;
      justify-content:center;
      text-decoration:none;
      box-shadow:0 12px 30px rgba(34,197,94,.45);
      transition:transform .2s ease, box-shadow .2s ease;
    "
    aria-label="Chat on WhatsApp"
    onmouseover="this.style.transform='scale(1.05)'"
    onmouseout="this.style.transform='scale(1)'"
  >
    <!-- WhatsApp Official SVG -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
      <path d="M16.02 3C8.83 3 3 8.83 3 16c0 2.82.74 5.48 2.02 7.78L3 29l5.47-1.97A12.96 12.96 0 0016.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3zm0 23.5a10.9 10.9 0 01-5.55-1.52l-.4-.24-3.25 1.17 1.06-3.36-.22-.43A10.93 10.93 0 1116.02 26.5zm6.02-7.93c-.33-.17-1.94-.96-2.24-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.37.25-.7.08-.33-.17-1.4-.52-2.66-1.67-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.51.15-.68.15-.15.33-.37.5-.56.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.79-1.01-2.45-.26-.63-.52-.55-.74-.56-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.89.41-.3.33-1.16 1.14-1.16 2.75s1.19 3.17 1.36 3.39c.17.22 2.35 3.59 5.7 5.04.8.34 1.42.54 1.9.69.8.25 1.53.21 2.11.13.63-.09 1.94-.8 2.22-1.58.28-.78.28-1.45.19-1.58-.08-.13-.3-.22-.63-.39z"/>
    </svg>
  </a>
`;


// Enquiry Form WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
  const enquiryForm = document.getElementById('enquiryForm');
  
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields: Name, Email, and Message');
        return;
      }
      
      // Format the message for WhatsApp
      const whatsappMessage = formatWhatsAppMessage(name, email, phone, subject, message);
      
      // Replace with your actual WhatsApp number (remove X's and add country code without +)
      const whatsappNumber = '263773186236'; // Example: 263772283650 for Zimbabwe
      
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappURL, '_blank');
      
      // Optional: Show confirmation message
      showFormConfirmation();
      
      // Optional: Reset form after submission
      // enquiryForm.reset();
    });
  }
  
  function formatWhatsAppMessage(name, email, phone, subject, message) {
    let formattedMessage = `*New Enquiry from Combined Technologies Website*\n\n`;
    formattedMessage += `*Name:* ${name}\n`;
    formattedMessage += `*Email:* ${email}\n`;
    
    if (phone) {
      formattedMessage += `*Phone:* ${phone}\n`;
    }
    
    if (subject) {
      formattedMessage += `*Subject:* ${subject}\n`;
    }
    
    formattedMessage += `\n*Message:*\n${message}\n\n`;
    formattedMessage += `_Sent via Combined Technologies Website Contact Form_`;
    
    return formattedMessage;
  }
  
  function showFormConfirmation() {
    // Create a temporary confirmation message
    const submitButton = enquiryForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Change button text to show success
    submitButton.textContent = '✓ Message Ready!';
    submitButton.style.backgroundColor = '#22c55e'; // Green color for success
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.backgroundColor = ''; // Reset to original
    }, 3000);
    
    // Optional: Show a toast notification
    showToast('Form prepared! Opening WhatsApp...');
  }
  
  function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 2147483647;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      animation: fadeInOut 3s ease-in-out;
    `;
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    // Remove toast after animation
    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 3000);
  }
});



