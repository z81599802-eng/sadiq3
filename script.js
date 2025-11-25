/* global lucide */
(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('[data-nav-overlay]');
  const backToTopBtn = document.querySelector('.back-to-top');
  const faqItems = document.querySelectorAll('.faq-item');
  const yearTarget = document.querySelector('[data-current-year]');
  const typewriterTargets = document.querySelectorAll('[data-typewriter]');

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

  document.addEventListener('click', (event) => {
    if (!navLinks || !navToggle) return;
    if (!navLinks.classList.contains('active')) return;

    const target = event.target;
    const clickedInsideNav = navbar && target instanceof Node && navbar.contains(target);
    const clickedToggle = target instanceof Node && navToggle.contains(target);

    if (!clickedInsideNav && !clickedToggle) {
      setNavigationState(false);
    }
  });

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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const runTypewriter = (element) => {
    if (!element) return;
    const text = element.getAttribute('data-text');

    if (!text) return;

    element.setAttribute('aria-label', text);

    if (prefersReducedMotion) {
      element.textContent = text;
      element.classList.add('no-caret');
      return;
    }

    let currentIndex = 0;
    let isRemoving = false;

    const tick = () => {
      element.textContent = text.slice(0, currentIndex);

      if (!isRemoving && currentIndex === text.length) {
        setTimeout(() => {
          isRemoving = true;
          tick();
        }, 1600);
        return;
      }

      if (isRemoving && currentIndex === 0) {
        isRemoving = false;
        setTimeout(tick, 400);
        return;
      }

      const delta = isRemoving ? -1 : 1;
      const delay = isRemoving ? 45 : 85;
      currentIndex += delta;
      setTimeout(tick, delay);
    };

    tick();
  };

  if (typewriterTargets.length) {
    typewriterTargets.forEach((element) => runTypewriter(element));
  }

  const initTestimonialSlider = () => {
    const slider = document.querySelector('[data-testimonial-slider]');
    if (!slider) return;

    const scroller = slider.querySelector('[data-slider-scroller]');
    const slides = Array.from(slider.querySelectorAll('[data-slider-slide]'));
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');
    const dotsContainer = slider.parentElement ? slider.parentElement.querySelector('[data-slider-dots]') : null;

    if (!scroller || !slides.length) return;

    let slidesPerView = 1;
    let pageCount = 1;

    const getSlidesPerView = () => {
      if (window.innerWidth >= 1200) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };

    const scrollToPage = (pageIndex) => {
      const target = Math.max(0, Math.min(pageIndex, pageCount - 1));
      scroller.scrollTo({ left: target * scroller.clientWidth, behavior: 'smooth' });
    };

    const syncControls = () => {
      const activePage = Math.round(scroller.scrollLeft / scroller.clientWidth) || 0;

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, index) => {
          if (index === activePage) {
            dot.setAttribute('aria-current', 'true');
          } else {
            dot.removeAttribute('aria-current');
          }
        });
      }

      if (prevBtn) prevBtn.disabled = activePage === 0;
      if (nextBtn) nextBtn.disabled = activePage >= pageCount - 1;
    };

    const renderDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      pageCount = Math.max(1, Math.ceil(slides.length / slidesPerView));

      for (let index = 0; index < pageCount; index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
        if (index === 0) {
          dot.setAttribute('aria-current', 'true');
        }
        dot.addEventListener('click', () => scrollToPage(index));
        dotsContainer.appendChild(dot);
      }
    };

    const updateSlidesPerView = () => {
      slidesPerView = getSlidesPerView();
      scroller.style.setProperty('--slides-per-view', String(slidesPerView));
      renderDots();
      scrollToPage(Math.round(scroller.scrollLeft / scroller.clientWidth) || 0);
      syncControls();
    };

    const handleNav = (direction) => {
      const activePage = Math.round(scroller.scrollLeft / scroller.clientWidth) || 0;
      scrollToPage(activePage + direction);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => handleNav(-1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => handleNav(1));
    }

    scroller.addEventListener('scroll', () => {
      window.requestAnimationFrame(syncControls);
    });

    window.addEventListener('resize', () => {
      window.requestAnimationFrame(updateSlidesPerView);
    });

    updateSlidesPerView();
  };

  initTestimonialSlider();
})();
