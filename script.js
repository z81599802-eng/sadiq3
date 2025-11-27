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
    const originalSlides = Array.from(slider.querySelectorAll('[data-slider-slide]'));
    const dotsContainer = slider.parentElement ? slider.parentElement.querySelector('[data-slider-dots]') : null;

    if (!scroller || !originalSlides.length) return;

    const totalSlides = originalSlides.length;
    const AUTO_PLAY_INTERVAL = 4800;
    const getSlidesPerView = () => (window.matchMedia('(min-width: 1024px)').matches ? 3 : 1);

    let slideFullWidth = 0;
    let slidesPerView = getSlidesPerView();
    let currentIndex = 0;
    let autoPlayTimer = null;

    const buildTrack = () => {
      scroller.innerHTML = '';
      const prefixClones = originalSlides.slice(-slidesPerView).map((slide) => slide.cloneNode(true));
      const suffixClones = originalSlides.slice(0, slidesPerView).map((slide) => slide.cloneNode(true));

      prefixClones.forEach((clone) => scroller.appendChild(clone));
      originalSlides.forEach((slide) => scroller.appendChild(slide));
      suffixClones.forEach((clone) => scroller.appendChild(clone));

      scroller.style.setProperty('--slides-per-view', String(slidesPerView));
    };

    const getGapValue = () => {
      const styles = window.getComputedStyle(scroller);
      const gapValue = parseFloat(styles.columnGap || styles.gap || '0');
      return Number.isNaN(gapValue) ? 0 : gapValue;
    };

    const measureSlideWidth = () => {
      const firstSlide = scroller.querySelector('[data-slider-slide]');
      const gap = getGapValue();
      if (!firstSlide) return 0;
      const { width } = firstSlide.getBoundingClientRect();
      return width + gap;
    };

    const syncDots = () => {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.slider-dot').forEach((dot, index) => {
        if (index === currentIndex) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        window.clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };

    const goToIndex = (targetIndex, behavior = 'smooth') => {
      const normalizedIndex = ((targetIndex % totalSlides) + totalSlides) % totalSlides;
      let destinationIndex = targetIndex + slidesPerView;

      if (targetIndex >= totalSlides) {
        destinationIndex = totalSlides + slidesPerView;
      } else if (targetIndex < 0) {
        destinationIndex = slidesPerView - 1;
      }

      scroller.scrollTo({ left: destinationIndex * slideFullWidth, behavior });
      currentIndex = normalizedIndex;
      syncDots();
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      if (totalSlides <= 1) return;
      autoPlayTimer = window.setInterval(() => {
        goToIndex(currentIndex + 1);
      }, AUTO_PLAY_INTERVAL);
    };

    const renderDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let index = 0; index < totalSlides; index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
        if (index === 0) {
          dot.setAttribute('aria-current', 'true');
        }
        dot.addEventListener('click', () => {
          goToIndex(index);
          startAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }
    };

    const recalcWidthAndPosition = () => {
      slideFullWidth = measureSlideWidth();
      if (slideFullWidth <= 0) return;
      scroller.scrollTo({ left: (currentIndex + slidesPerView) * slideFullWidth, behavior: 'auto' });
    };

    const handleInfiniteEdges = () => {
      if (slideFullWidth <= 0) return;

      const forwardResetPoint = slideFullWidth * (totalSlides + slidesPerView);
      const backwardResetPoint = slideFullWidth * (slidesPerView - 1);

      if (scroller.scrollLeft >= forwardResetPoint) {
        const offsetIntoLoop = scroller.scrollLeft - forwardResetPoint;
        scroller.scrollTo({ left: slideFullWidth * slidesPerView + offsetIntoLoop, behavior: 'auto' });
      } else if (scroller.scrollLeft <= backwardResetPoint) {
        const offsetIntoLoop = backwardResetPoint - scroller.scrollLeft;
        scroller.scrollTo({ left: slideFullWidth * (totalSlides + slidesPerView) - offsetIntoLoop, behavior: 'auto' });
      }
    };

    const syncIndexFromScroll = () => {
      if (slideFullWidth <= 0) return;
      const rawIndex = Math.round(scroller.scrollLeft / slideFullWidth) - slidesPerView;
      currentIndex = ((rawIndex % totalSlides) + totalSlides) % totalSlides;
      syncDots();
    };

    scroller.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        handleInfiniteEdges();
        syncIndexFromScroll();
      });
    });

    const rebuildForLayout = () => {
      const nextSlidesPerView = getSlidesPerView();
      if (nextSlidesPerView === slidesPerView) {
        recalcWidthAndPosition();
        return;
      }

      slidesPerView = nextSlidesPerView;
      stopAutoPlay();
      buildTrack();
      recalcWidthAndPosition();
      startAutoPlay();
    };

    window.addEventListener('resize', () => {
      window.requestAnimationFrame(() => {
        rebuildForLayout();
      });
    });

    slider.addEventListener('pointerenter', stopAutoPlay);
    slider.addEventListener('pointerleave', startAutoPlay);
    slider.addEventListener('focusin', stopAutoPlay);
    slider.addEventListener('focusout', startAutoPlay);

    renderDots();
    window.requestAnimationFrame(() => {
      buildTrack();
      slideFullWidth = measureSlideWidth();
      scroller.scrollTo({ left: slideFullWidth * slidesPerView, behavior: 'auto' });
      startAutoPlay();
    });
  };

  initTestimonialSlider();
})();
