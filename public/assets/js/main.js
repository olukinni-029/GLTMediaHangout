/**
* Template Name: TheEvent
* Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
* Updated: Jun 06 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.getElementById('studentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    const formData = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      unit: document.getElementById('unit').value,
      status: document.getElementById('status').value,
      zodiac: document.getElementById('zodiac').value,
      workStatus: document.getElementById('workStatus').value
    };
  
    try {
      // Send a POST request to the server
      const response = await fetch('https://theeventservice.onrender.com/registerStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      // Check if the registration was successful
      if (response.ok) {
          // Clear form fields after successful submission
          document.getElementById('name').value = '';
          document.getElementById('phone').value = '';
          document.getElementById('email').value = '';
          document.getElementById('unit').value = 'Select your unit';
          document.getElementById('status').value = 'Select your status';
          document.getElementById('zodiac').value = 'Cancer';
          document.getElementById('workStatus').value = 'Student'; 
          
        // Redirect to success.html
        window.location.href = '/TheEvent/public/Success.html';
      } else {
        // Handle errors (e.g., display an error message)
        const errorData = await response.json();
        alert('ErrorMessage: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
});
  
document.getElementById('workingClassForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way
  
  // Gather the form data
  const formData = {
    name1: document.getElementById('name1').value,
    phone1: document.getElementById('phone1').value,
    email1: document.getElementById('email1').value,
    unit1: document.getElementById('unit1').value,
    status1: document.getElementById('status1').value,
    zodiac1: document.getElementById('zodiac1').value,
    workStatus1: document.getElementById('workStatus1').value
  };

  // Debugging: Log formData to verify
  console.log('Form Data:', formData);

  try {
    // Send a POST request to the server
    const response = await fetch('https://theeventservice.onrender.com/registerWorkingClass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Debugging: Log response status
    console.log('Response Status:', response.status);

    // Check if the registration was successful
    if (response.ok) {
      // Clear form fields upon successful registration
      document.getElementById('name1').value = '';
      document.getElementById('phone1').value = '';
      document.getElementById('email1').value = '';
      document.getElementById('unit1').value = 'Select your unit';
      document.getElementById('status1').value = 'Select your status';
      document.getElementById('zodiac1').value = 'Cancer';
      document.getElementById('workStatus1').value = 'Working Class';

      // Redirect to success.html
      window.location.href = '/TheEvent/public/Success2.html';
    } else {
      // Handle errors (e.g., display an error message)
      const errorData = await response.json();
      alert('ErrorMessage: ' + errorData.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred',error);
  }
});


})();