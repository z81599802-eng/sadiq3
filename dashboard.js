const PAGE_CONFIG = {
  'dashboard': { title: 'Dashboard overview' },
  'action-list': { title: 'Action list' },
  'account-health': { title: 'Account health' },
  'ad-spend': { title: 'Ad spend overview' },
  'campaigns': { title: 'Campaigns' },
  'inventory': { title: 'Inventory overview' },
  'profile': { title: 'Profile' }
};

const DASHBOARD_URL = 'https://bi.wissenglanz.in/public/dashboard/1fe01e7d-b155-4054-bc71-d55799eb9b22';

function initDashboardShell() {
  const shell = document.querySelector('.dashboard-shell');
  const navButtons = Array.from(document.querySelectorAll('.nav-link[data-page]'));
  const pageTitle = document.querySelector('[data-page-title]');
  const iframe = document.querySelector('.dashboard-frame');
  const toggle = document.querySelector('.sidebar-toggle');

  if (!shell || navButtons.length === 0 || !pageTitle || !iframe || !toggle) {
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

      pageTitle.textContent = PAGE_CONFIG[pageKey].title;

      if (iframe.getAttribute('src') !== DASHBOARD_URL) {
        iframe.setAttribute('src', DASHBOARD_URL);
      }

      if (window.innerWidth <= 840) {
        shell.dataset.sidebarState = 'closed';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  toggle.addEventListener('click', () => {
    const isOpen = shell.dataset.sidebarState !== 'open';
    const nextState = isOpen ? 'open' : 'closed';
    shell.dataset.sidebarState = nextState;
    toggle.setAttribute('aria-expanded', String(nextState === 'open'));
  });

  // Default iframe load
  iframe.setAttribute('src', DASHBOARD_URL);

  if (window.innerWidth <= 840) {
    shell.dataset.sidebarState = 'closed';
    toggle.setAttribute('aria-expanded', 'false');
  }
}

document.addEventListener('DOMContentLoaded', initDashboardShell);
