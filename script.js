/* global lucide */
(function () {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTopBtn = document.querySelector('.back-to-top');
  const faqItems = document.querySelectorAll('.faq-item');

  const toggleNavigation = () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('active');
  };

  if (navToggle) {
    navToggle.addEventListener('click', toggleNavigation);
  }

  if (navLinks) {
    navLinks.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const closeNavOnResize = () => {
    if (window.innerWidth > 1024 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  };

  window.addEventListener('resize', closeNavOnResize);

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const expanded = questionBtn.getAttribute('aria-expanded') === 'true';
      questionBtn.setAttribute('aria-expanded', String(!expanded));
      item.classList.toggle('active');

      if (!expanded) {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      } else {
        answer.style.maxHeight = '0';
        setTimeout(() => {
          answer.style.maxHeight = '';
        }, 300);
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    const shouldShow = window.scrollY > 400;
    backToTopBtn.style.opacity = shouldShow ? '1' : '0';
    backToTopBtn.style.pointerEvents = shouldShow ? 'auto' : 'none';
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
})();
