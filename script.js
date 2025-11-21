/* global lucide */
(function () {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('[data-nav-overlay]');
  const backToTopBtn = document.querySelector('.back-to-top');
  const faqItems = document.querySelectorAll('.faq-item');
  const yearTarget = document.querySelector('[data-current-year]');

  const setNavigationState = (isOpen) => {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navLinks.classList.toggle('active', isOpen);
    document.body.classList.toggle('nav-open', isOpen);

    if (navOverlay) {
      navOverlay.classList.toggle('active', isOpen);
    }
  };

  const toggleNavigation = () => {
    if (!navToggle) return;
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    setNavigationState(!expanded);
  };

  if (navToggle) {
    navToggle.addEventListener('click', toggleNavigation);
  }

  if (navLinks) {
    navLinks.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        setNavigationState(false);
      }
    });
  }

  const closeNavOnResize = () => {
    if (!navLinks) return;
    if (window.innerWidth > 1024 && navLinks.classList.contains('active')) {
      setNavigationState(false);
    }
  };

  window.addEventListener('resize', closeNavOnResize);

  if (navOverlay) {
    navOverlay.addEventListener('click', () => setNavigationState(false));
  }

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

  const updateBackToTopVisibility = () => {
    if (!backToTopBtn) return;
    const shouldShow = window.scrollY > 400;
    backToTopBtn.style.opacity = shouldShow ? '1' : '0';
    backToTopBtn.style.pointerEvents = shouldShow ? 'auto' : 'none';
  };

  window.addEventListener('scroll', updateBackToTopVisibility);
  updateBackToTopVisibility();

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
})();
