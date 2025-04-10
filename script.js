
document.addEventListener('DOMContentLoaded', function () {
  // Hide loader when page is fully loaded
  setTimeout(() => {
    document.querySelector('.loader').classList.add('hidden');
  }, 2000);

  // Initialize variables
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');
  const backToTop = document.querySelector('.back-to-top');
  const scrollDown = document.querySelector('.scroll-down');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuCategories = document.querySelectorAll('.menu-category');
  const adminBtn = document.getElementById('adminLoginBtn');
  const adminModal = document.getElementById('adminModal');
  const adminPanelModal = document.getElementById('adminPanelModal');
  const closeBtns = document.querySelectorAll('.close-modal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const saveChangesBtn = document.getElementById('saveChanges');
  const adminLogoutBtn = document.getElementById('adminLogout');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const statusSelects = document.querySelectorAll('.status-select');

  // Admin credentials (in a real-world scenario, this would be server-side)
  const adminUsername = 'admin';
  const adminPassword = 'rrav123';

  // WhatsApp number (replace with your actual number)
  const whatsappNumber = '1234567890';

  // Update order buttons with your WhatsApp number
  const updateWhatsAppLinks = () => {
    const orderBtns = document.querySelectorAll('.order-btn');
    orderBtns.forEach(btn => {
      if (!btn.classList.contains('disabled')) {
        const product = btn.getAttribute('data-product');
        btn.href = `https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20buying%20${encodeURIComponent(product)}`;
      }
    });
  };

  // Call the function to update WhatsApp links
  updateWhatsAppLinks();

  // Sticky header
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      header.classList.add('sticky');
      backToTop.classList.add('active');
    } else {
      header.classList.remove('sticky');
      backToTop.classList.remove('active');
    }

    // Reveal animations on scroll
    revealElements();
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');

      // Update active link
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#' && !this.getAttribute('href').includes('modal')) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scroll down button
  if (scrollDown) {
    scrollDown.addEventListener('click', function () {
      window.scrollTo({
        top: document.querySelector('#about').offsetTop - 80,
        behavior: 'smooth'
      });
    });
  }

  // Back to top button
  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Menu tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const category = this.getAttribute('data-category');

      // Update active tab
      tabBtns.forEach(tabBtn => tabBtn.classList.remove('active'));
      this.classList.add('active');

      // Show selected category
      menuCategories.forEach(menuCat => {
        if (menuCat.getAttribute('data-category') === category) {
          menuCat.classList.add('active');

          // Trigger reveal animations for the new category
          const revealItems = menuCat.querySelectorAll('.reveal-up');
          revealItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('active');
            }, 100 * index);
          });
        } else {
          menuCat.classList.remove('active');
        }
      });
    });
  });

  // Admin login button
  adminBtn.addEventListener('click', function (e) {
    e.preventDefault();
    adminModal.classList.add('active');
  });

  // Close modal buttons
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      adminModal.classList.remove('active');
      adminPanelModal.classList.remove('active');
    });
  });

  // Close modals when clicking outside
  window.addEventListener('click', function (e) {
    if (e.target === adminModal) {
      adminModal.classList.remove('active');
    }
    if (e.target === adminPanelModal) {
      adminPanelModal.classList.remove('active');
    }
  });

  // Admin login form
  adminLoginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById('adminUsername').value;
    const passwordInput = document.getElementById('adminPassword').value;

    if (usernameInput === adminUsername && passwordInput === adminPassword) {
      adminModal.classList.remove('active');
      adminPanelModal.classList.add('active');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  });

  // Save product status changes
  saveChangesBtn.addEventListener('click', function () {
    const productCards = document.querySelectorAll('.product-card');

    statusSelects.forEach(select => {
      const productName = select.getAttribute('data-product');
      const newStatus = select.value;

      productCards.forEach(card => {
        const cardProductName = card.querySelector('.product-info h3').textContent;

        if (cardProductName === productName) {
          const statusElement = card.querySelector('.product-status');
          const orderBtn = card.querySelector('.order-btn');

          if (newStatus === 'available') {
            statusElement.textContent = 'Available';
            statusElement.className = 'product-status available';
            orderBtn.classList.remove('disabled');
          } else {
            statusElement.textContent = 'Sold Out';
            statusElement.className = 'product-status sold-out';
            orderBtn.classList.add('disabled');
          }
        }
      });
    });

    // Update WhatsApp links after changing product status
    updateWhatsAppLinks();

    alert('Changes saved successfully!');
  });

  // Admin logout
  adminLogoutBtn.addEventListener('click', function () {
    adminPanelModal.classList.remove('active');
  });

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // In a real implementation, you would send this data to a server
      console.log(`Contact Form Submission:
              Name: ${name}
              Email: ${email}
              Subject: ${subject}
              Message: ${message}
          `);

      alert('Your message has been sent successfully!');
      contactForm.reset();
    });
  }

  // Newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      // In a real implementation, you would send this data to a server
      console.log(`Newsletter Subscription: ${email}`);

      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    });
  }

  // Reveal animations function
  function revealElements() {
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-down');

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  }

  // Call reveal function on load
  revealElements();

  // Highlight nav link based on scroll position
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Listen for scroll to highlight nav items
  window.addEventListener('scroll', highlightNavOnScroll);

  // Call once on load
  highlightNavOnScroll();
});
