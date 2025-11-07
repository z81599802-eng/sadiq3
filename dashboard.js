const DASHBOARD_URL = 'https://bi.wissenglanz.in/public/dashboard/1fe01e7d-b155-4054-bc71-d55799eb9b22';

const PAGE_CONFIG = {
  'dashboard': {
    title: 'Dashboard overview',
    content: {
      type: 'iframe',
      src: DASHBOARD_URL,
      title: 'Wissen dashboard'
    }
  },
  'action-list': {
    title: 'Action list',
    content: {
      type: 'iframe',
      src: DASHBOARD_URL,
      title: 'Action list insights'
    }
  },
  'account-health': {
    title: 'Account health',
    content: {
      type: 'iframe',
      src: DASHBOARD_URL,
      title: 'Account health overview'
    }
  },
  'ad-spend': {
    title: 'Ad spend overview',
    content: {
      type: 'iframe',
      src: DASHBOARD_URL,
      title: 'Ad spend performance'
    }
  },
  'campaigns': {
    title: 'Campaigns',
    content: {
      type: 'message',
      text: 'Welcome to the Campaigns page. Review and manage your campaigns here.'
    }
  },
  'inventory': {
    title: 'Inventory overview',
    content: {
      type: 'iframe',
      src: DASHBOARD_URL,
      title: 'Inventory analytics'
    }
  },
  'profile': {
    title: 'Profile',
    content: {
      type: 'message',
      text: 'Welcome to the Profile page. Update your personal details and preferences here.'
    }
  }
};

function isMobileView() {
  return window.matchMedia('(max-width: 840px)').matches;
}

function initDashboardShell() {
  const shell = document.querySelector('.dashboard-shell');
  const sidebar = document.querySelector('.sidebar');
  const navButtons = Array.from(document.querySelectorAll('.nav-link[data-page]'));
  const pageTitle = document.querySelector('[data-page-title]');
  const contentContainer = document.querySelector('[data-page-content]');
  const toggle = document.querySelector('.sidebar-toggle');
  const overlay = document.querySelector('[data-sidebar-overlay]');
  const mainArea = document.querySelector('.main-area');

  if (!shell || !sidebar || navButtons.length === 0 || !pageTitle || !contentContainer || !toggle || !mainArea) {
    return;
  }

  // Initialize lucide icons after module load
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  } else {
    window.addEventListener('load', () => {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  }

  const updateLucideIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  const renderPageContent = (pageKey) => {
    const config = PAGE_CONFIG[pageKey];
    if (!config) {
      console.warn(`Unknown page key: ${pageKey}`);
      return;
    }

    pageTitle.textContent = config.title;
    contentContainer.innerHTML = '';

    if (config.content?.type === 'message') {
      const message = document.createElement('div');
      message.className = 'page-message';
      message.textContent = config.content.text ?? '';
      contentContainer.appendChild(message);
      return;
    }

    const frame = document.createElement('iframe');
    frame.className = 'dashboard-frame';
    frame.title = config.content?.title || config.title;
    frame.src = config.content?.src || DASHBOARD_URL;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer';
    frame.setAttribute('allowfullscreen', '');
    contentContainer.appendChild(frame);
  };

  const sidebarFocusableElements = Array.from(
    sidebar.querySelectorAll('a, button, [role="button"], input, select, textarea')
  );

  const setSidebarState = (nextState) => {
    const isOpen = nextState === 'open';
    shell.dataset.sidebarState = nextState;
    toggle.setAttribute('aria-expanded', String(isOpen));
    sidebar.setAttribute('aria-hidden', String(!isOpen));
    const shouldLockScroll = isMobileView() && isOpen;
    document.body.classList.toggle('sidebar-open', shouldLockScroll);

    sidebarFocusableElements.forEach((element) => {
      if (isOpen) {
        if (Object.prototype.hasOwnProperty.call(element.dataset, 'prevTabindex')) {
          const previousValue = element.dataset.prevTabindex;
          if (previousValue) {
            element.setAttribute('tabindex', previousValue);
          } else {
            element.removeAttribute('tabindex');
          }
          delete element.dataset.prevTabindex;
        } else {
          element.removeAttribute('tabindex');
        }
      } else {
        if (element.hasAttribute('tabindex')) {
          element.dataset.prevTabindex = element.getAttribute('tabindex') || '';
        }
        element.setAttribute('tabindex', '-1');
      }
    });

    if (overlay) {
      overlay.setAttribute('aria-hidden', String(!(isMobileView() && isOpen)));
    }

    const desktopIcon = toggle.querySelector('.icon-desktop');
    if (desktopIcon) {
      desktopIcon.setAttribute('data-lucide', isOpen ? 'panel-left-close' : 'panel-left-open');
      updateLucideIcons();
    }
  };

  setSidebarState(shell.dataset.sidebarState === 'closed' ? 'closed' : 'open');

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const pageKey = button.dataset.page;
      if (!pageKey) {
        return;
      }

      if (!PAGE_CONFIG[pageKey]) {
        console.warn(`Unknown page key: ${pageKey}`);
        return;
      }

      navButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('is-active', isActive);
        if (isActive) {
          btn.setAttribute('aria-current', 'page');
        } else {
          btn.removeAttribute('aria-current');
        }
      });

      renderPageContent(pageKey);

      if (isMobileView()) {
        setSidebarState('closed');
      }
    });
  });

  toggle.addEventListener('click', () => {
    const nextState = shell.dataset.sidebarState === 'open' ? 'closed' : 'open';
    setSidebarState(nextState);
  });

  overlay?.addEventListener('click', () => {
    if (shell.dataset.sidebarState === 'open') {
      setSidebarState('closed');
    }
  });

  mainArea.addEventListener('click', (event) => {
    if (!isMobileView()) {
      return;
    }

    if (shell.dataset.sidebarState !== 'open') {
      return;
    }

    if (sidebar.contains(event.target) || toggle.contains(event.target)) {
      return;
    }

    setSidebarState('closed');
  });

  window.addEventListener('resize', () => {
    if (!isMobileView()) {
      document.body.classList.remove('sidebar-open');
      setSidebarState('open');
      return;
    }

    const currentState = shell.dataset.sidebarState === 'open' ? 'open' : 'closed';
    setSidebarState(currentState);
  });

  const defaultPage = navButtons.find((btn) => btn.classList.contains('is-active'))?.dataset.page || 'dashboard';
  renderPageContent(defaultPage);
  updateLucideIcons();

  if (isMobileView()) {
    setSidebarState('closed');
  }
}

document.addEventListener('DOMContentLoaded', initDashboardShell);
