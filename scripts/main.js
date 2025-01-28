// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference in localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
  body.classList.add('dark');
  darkModeToggle.textContent = '☀️';
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    localStorage.setItem('dark-mode', 'enabled');
    darkModeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('dark-mode', 'disabled');
    darkModeToggle.textContent = '🌙';
  }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form Validation
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}

// Email Validation Helper
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}