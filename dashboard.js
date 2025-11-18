const DASHBOARD_URL = 'https://bi.wissenglanz.in/public/dashboard/1fe01e7d-b155-4054-bc71-d55799eb9b22';

const CAMPAIGN_DATA = [
  {
    name: 'A2 - B0F63GWCMJ - PAT',
    id: '292521029217110',
    status: 'Enabled',
    dailyBudget: 200,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:04',
    action: 'Pause Update',
    isSelected: true,
  },
  {
    name: 'A2W - B0F63GWCMJ - PAT',
    id: '470103395458909',
    status: 'Enabled',
    dailyBudget: 100,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:04',
    action: 'Pause Update',
  },
  {
    name: 'Campaign with presets - B0FM3KK3S9 - 12/11/2025 18:35:42.895',
    id: '450713614110696',
    status: 'Enabled',
    dailyBudget: 50,
    budgetUsedPercent: 19,
    updatedAt: '2025-11-13 16:24',
    action: 'Pause Update',
  },
  {
    name: 'CG - 1 kg ghee - EXT',
    id: '285997086560150',
    status: 'Enabled',
    dailyBudget: 200,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:03',
    action: 'Pause Update',
  },
  {
    name: 'CG - 1kg ghee - EXT',
    id: '328655310802192',
    status: 'Enabled',
    dailyBudget: 200,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:03',
    action: 'Pause Update',
  },
  {
    name: 'CG - a2 ghee 1 litre offer - EXT',
    id: '464237842896578',
    status: 'Enabled',
    dailyBudget: 200,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:03',
    action: 'Pause Update',
  },
  {
    name: 'CG - aroma ghee 500ml - EXT',
    id: '441064906964837',
    status: 'Enabled',
    dailyBudget: 200,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:03',
    action: 'Pause Update',
  },
  {
    name: 'CG - best ghee cow - EXT',
    id: '391085913169533',
    status: 'Enabled',
    dailyBudget: 200,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:03',
    action: 'Pause Update',
  },
  {
    name: 'CG - best ghee - EXT',
    id: '292337863324167',
    status: 'Enabled',
    dailyBudget: 200,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:03',
    action: 'Pause Update',
  },
  {
    name: 'CG - cow ghee 1 litre offer - EXT',
    id: '423889340608413',
    status: 'Enabled',
    dailyBudget: 200,
    budgetUsedPercent: null,
    updatedAt: '2025-11-13 00:03',
    action: 'Pause Update',
  },
];

const PROFILE_OPTIONS = [
  'Demo Retailer',
  'Haus & Co. Stores',
  'North Hub Partners',
  'Seasonal Specials',
];

const CAMPAIGN_OPTIONS = [
  'A2 - B0F63GWCMJ - PAT | 292521029217110',
  'A2W - B0F63GWCMJ - PAT | 470103395458909',
  'Campaign with presets - B0FM3KK3S9 - 12/11/2025 18:35:42.895',
  'CG - 1 kg ghee - EXT | 285997086560150',
];

const DAY_CONFIG = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const CAMPAIGN_PAGINATION = {
  currentPage: 1,
  totalPages: 13,
};

const PROFILE_DETAILS = {
  name: 'fifty_fifty_offer_zone',
  email: '-',
  sellerId: 'fifty_fifty_offer_zone',
  joinedOn: 'Oct 29, 2025',
  lastLogin: 'Nov 12, 2025 20:16',
};

const ADS_AUTH_DETAILS = {
  profileId: '420471957462008',
  region: 'IN',
  lastUpdated: 'Oct 29, 2025 17:44',
};

const PROFILE_TABS = [
  { key: 'subscription', label: 'Subscription', icon: 'badge-check' },
  { key: 'seller', label: 'Amazon Seller Central', icon: 'store' },
  { key: 'ads', label: 'Amazon Ads', icon: 'megaphone' },
  { key: 'support', label: 'Support', icon: 'lifebuoy' },
];

function refreshLucideIcons() {
  if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

function formatDisplayTime(value) {
  const [hour, minute] = value.split(':').map((part) => Number(part));
  const period = hour >= 12 ? 'PM' : 'AM';
  const normalizedHour = hour % 12 || 12;
  return `${normalizedHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

function buildTimeOptions() {
  const steps = [];
  for (let hour = 0; hour < 24; hour += 1) {
    for (const minute of [0, 30]) {
      const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      steps.push({
        value,
        label: formatDisplayTime(value),
      });
    }
  }
  return steps;
}

const TIME_OPTIONS = buildTimeOptions();

function createCampaignPage() {
  const container = document.createElement('div');
  container.className = 'campaign-page';

  const heroBlock = buildCampaignHero();
  container.appendChild(heroBlock.section);

  const filterBlock = buildCampaignFilters();
  container.appendChild(filterBlock.section);

  const tableBlock = buildCampaignTableSection();
  container.appendChild(tableBlock.section);

  const updateBlock = buildCampaignUpdateSection();
  container.appendChild(updateBlock.section);

  const scheduleBlock = buildCampaignScheduleSection();
  container.appendChild(scheduleBlock.section);

  initHeroScheduleAction(heroBlock.scheduleButton, scheduleBlock.section);
  initCampaignFilters(filterBlock.form, tableBlock.tableBody, tableBlock.paginationLabel);
  initUpdateForm(updateBlock.form);
  initScheduleInteractions(scheduleBlock.section);

  refreshLucideIcons();
  return container;
}

function createProfilePage() {
  const container = document.createElement('div');
  container.className = 'profile-page';

  const heroCard = buildProfileHeroCard();
  const tabNavigation = buildProfileTabs();
  const panels = buildProfilePanels();

  container.appendChild(heroCard);
  container.appendChild(tabNavigation);
  container.appendChild(panels.wrapper);

  initProfileTabs(tabNavigation, panels);
  refreshLucideIcons();
  return container;
}

function buildProfileHeroCard() {
  const card = document.createElement('section');
  card.className = 'profile-hero-card';

  const avatarInitial = PROFILE_DETAILS.name ? PROFILE_DETAILS.name[0].toUpperCase() : 'U';

  card.innerHTML = `
    <div class="profile-banner" aria-hidden="true"></div>
    <div class="profile-hero__content">
      <div class="profile-identity">
        <div class="profile-avatar" aria-hidden="true">${avatarInitial}</div>
        <div>
          <p class="eyebrow-text">Demo profile</p>
          <h2>${PROFILE_DETAILS.name}</h2>
          <p class="profile-subtext">${PROFILE_DETAILS.email !== '-' ? PROFILE_DETAILS.email : 'No email on file'}</p>
        </div>
      </div>
      <div class="profile-quick-actions">
        <a class="btn btn-secondary" href="#contact" aria-label="Contact support for profile updates">Update details</a>
        <button type="button" class="btn btn-ghost" aria-label="Download profile report">
          <i data-lucide="download" aria-hidden="true"></i>
          <span>Download profile</span>
        </button>
      </div>
    </div>
    <dl class="profile-hero__meta" aria-label="Account quick facts">
      ${buildDetailRow('Seller ID', PROFILE_DETAILS.sellerId)}
      ${buildDetailRow('Joined on', PROFILE_DETAILS.joinedOn)}
      ${buildDetailRow('Last login', PROFILE_DETAILS.lastLogin)}
      ${buildDetailRow('Status', '<span class="status-pill status-pill--active">Verified</span>')}
    </dl>
  `;

  return card;
}

function buildProfileTabs() {
  const tablist = document.createElement('div');
  tablist.className = 'profile-tablist';
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', 'Profile sections');

  PROFILE_TABS.forEach((tab, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `profile-tab ${index === 0 ? 'is-active' : ''}`;
    button.dataset.target = tab.key;
    button.role = 'tab';
    button.ariaSelected = index === 0 ? 'true' : 'false';
    button.tabIndex = index === 0 ? '0' : '-1';
    button.innerHTML = `
      <i data-lucide="${tab.icon}" aria-hidden="true"></i>
      <span>${tab.label}</span>
    `;
    tablist.appendChild(button);
  });

  return tablist;
}

function buildProfilePanels() {
  const panels = document.createElement('div');
  panels.className = 'profile-panels';

  const panelMap = {
    subscription: buildSubscriptionPanel(),
    seller: buildSellerPanel(),
    ads: buildAdsPanel(),
    support: buildSupportPanel(),
  };

  Object.entries(panelMap).forEach(([key, panel], index) => {
    panel.dataset.panel = key;
    panel.role = 'tabpanel';
    panel.hidden = index !== 0;
    panels.appendChild(panel);
  });

  return { wrapper: panels, panelMap };
}

function buildSubscriptionPanel() {
  const section = document.createElement('section');
  section.className = 'profile-card profile-card--highlight';
  section.innerHTML = `
    <header class="profile-card__header">
      <div>
        <p class="eyebrow-text">Subscription plan</p>
        <h2>Wissen Ecom Monthly · Active</h2>
        <p class="profile-subtext">Billing, renewals, and entitlements for your workspace.</p>
      </div>
      <span class="status-pill status-pill--active" aria-label="Subscription active">Active</span>
    </header>
    <div class="profile-details-grid profile-details-grid--two-cols">
      ${buildDetailRow('Price', 'Rs.999 per month')}
      ${buildDetailRow('Next renewal', 'Dec 17, 2025')}
      ${buildDetailRow('Plan perks', 'Full Amazon insights, alerts, and exports')}
      ${buildDetailRow('Payment method', '•••• 7823 · Auto-renew enabled')}
    </div>
    <div class="profile-actions">
      <a class="btn btn-primary" href="index.html#contact">Upgrade or downgrade</a>
      <a class="text-link" href="index.html#contact">View billing history</a>
    </div>
  `;
  return section;
}

function buildSellerPanel() {
  const section = document.createElement('section');
  section.className = 'profile-card';
  section.innerHTML = `
    <header class="profile-card__header">
      <div>
        <p class="eyebrow-text">Amazon Seller Central</p>
        <h2>Keep your seller connection healthy.</h2>
        <p class="profile-subtext">Authorize, monitor syncs, and view identifiers tied to your workspace.</p>
      </div>
      <span class="status-pill status-pill--active">Connected</span>
    </header>
    <dl class="profile-details-grid profile-details-grid--two-cols">
      ${buildDetailRow('Seller ID', PROFILE_DETAILS.sellerId)}
      ${buildDetailRow('Region', 'India (IN)')}
      ${buildDetailRow('Last sync', 'Nov 12, 2025 · 20:16')}
      ${buildDetailRow('Sync health', '<span class="health-pill health-pill--good">No issues</span>')}
    </dl>
    <div class="profile-actions">
      <button type="button" class="btn btn-secondary">Refresh connection</button>
      <a class="text-link" href="#">View permissions</a>
    </div>
  `;
  return section;
}

function buildAdsPanel() {
  const section = document.createElement('section');
  section.className = 'profile-card';
  section.innerHTML = `
    <header class="profile-card__header">
      <div>
        <p class="eyebrow-text">Amazon Ads authorization</p>
        <h2>Control ad data access from one place.</h2>
        <p class="profile-subtext">We only request read access to sync Ads performance. Reconnect anytime.</p>
      </div>
    </header>
    <dl class="profile-details-grid profile-details-grid--two-cols">
      ${buildDetailRow('Profile ID', ADS_AUTH_DETAILS.profileId)}
      ${buildDetailRow('Region', ADS_AUTH_DETAILS.region)}
      ${buildDetailRow('Last updated', ADS_AUTH_DETAILS.lastUpdated)}
      ${buildDetailRow('Permissions', 'Read-only metrics & spend insights')}
    </dl>
    <div class="profile-actions">
      <button type="button" class="btn btn-secondary">Reconnect Ads</button>
      <a class="text-link" href="#">Manage tokens securely</a>
    </div>
  `;
  return section;
}

function buildSupportPanel() {
  const section = document.createElement('section');
  section.className = 'profile-card profile-card--support';
  section.innerHTML = `
    <header class="profile-card__header">
      <div>
        <p class="eyebrow-text">Support & guidance</p>
        <h2>Need help with subscriptions or authorizations?</h2>
        <p class="profile-subtext">Reach our team directly. We respond within one business day.</p>
      </div>
    </header>
    <div class="profile-actions">
      <a class="btn btn-primary" href="index.html#contact">Open support form</a>
      <a class="text-link" href="mailto:support@wissenecom.com">Email support</a>
    </div>
  `;
  return section;
}

function initProfileTabs(tabNavigation, panels) {
  const tabButtons = Array.from(tabNavigation.querySelectorAll('.profile-tab'));
  const { panelMap } = panels;

  const setActiveTab = (targetKey) => {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.target === targetKey;
      button.classList.toggle('is-active', isActive);
      button.ariaSelected = isActive ? 'true' : 'false';
      button.tabIndex = isActive ? '0' : '-1';
    });

    Object.entries(panelMap).forEach(([key, panel]) => {
      panel.hidden = key !== targetKey;
    });

    refreshLucideIcons();
  };

  const focusTabByIndex = (targetIndex) => {
    const button = tabButtons[targetIndex];
    if (button) {
      setActiveTab(button.dataset.target);
      button.focus();
    }
  };

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => setActiveTab(button.dataset.target));
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActiveTab(button.dataset.target);
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        focusTabByIndex((index + 1) % tabButtons.length);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        focusTabByIndex((index - 1 + tabButtons.length) % tabButtons.length);
      } else if (event.key === 'Home') {
        event.preventDefault();
        focusTabByIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        focusTabByIndex(tabButtons.length - 1);
      }
    });
  });
}

function buildDetailRow(label, value) {
  return `
    <div class="detail-row">
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>
  `;
}



function buildCampaignHero() {
  const section = document.createElement('section');
  section.className = 'campaign-hero';
  section.innerHTML = `
    <div class="campaign-hero__text">
      <p class="eyebrow-text">Sponsored Products campaigns</p>
      <h2>Review campaign status, track budget usage, and push updates directly to Amazon Ads.</h2>
      <p>Bring transparency to every campaign touchpoint with a single dashboard designed for commerce operators.</p>
      <div class="campaign-hero__actions">
        <button type="button" class="btn btn-secondary" data-open-schedule aria-controls="campaign-schedule" aria-expanded="false">
          <i data-lucide="clock-4" aria-hidden="true"></i>
          <span>Scheduled OFF campaign</span>
        </button>
      </div>
    </div>
  `;

  return {
    section,
    scheduleButton: section.querySelector('[data-open-schedule]'),
  };
}

function buildCampaignFilters() {
  const section = document.createElement('section');
  section.className = 'campaign-filters';
  section.innerHTML = `
    <form class="filters-form" data-campaign-filter-form novalidate>
      <div class="filters-row">
        <label class="form-field">
          <span>Search campaigns</span>
          <input type="search" name="query" placeholder="Search by name or campaign ID" autocomplete="off" inputmode="search" />
        </label>
        <div class="filters-actions">
          <button type="submit" class="btn btn-primary">Search</button>
          <button type="button" class="btn btn-ghost" data-clear-filters>Clear filters</button>
        </div>
      </div>
      <div class="filters-grid">
        <label class="form-field">
          <span>Status</span>
          <div class="select-wrapper">
            <select name="status">
              <option value="all">All statuses</option>
              <option value="Enabled">Enabled</option>
            </select>
          </div>
        </label>
        <fieldset class="form-field">
          <legend>Daily budget range</legend>
          <div class="range-inputs">
            <input type="number" name="budgetMin" placeholder="Min" min="0" step="0.01" inputmode="decimal" />
            <span>to</span>
            <input type="number" name="budgetMax" placeholder="Max" min="0" step="0.01" inputmode="decimal" />
          </div>
          <small>Leave blank to ignore either boundary.</small>
        </fieldset>
        <fieldset class="form-field">
          <legend>Budget exhausted (%) range</legend>
          <div class="range-inputs">
            <input type="number" name="usedMin" placeholder="Min" min="0" max="900" step="1" inputmode="decimal" />
            <span>to</span>
            <input type="number" name="usedMax" placeholder="Max" min="0" max="900" step="1" inputmode="decimal" />
          </div>
          <small>Leave blank to ignore either boundary.</small>
        </fieldset>
      </div>
    </form>
  `;

  return {
    section,
    form: section.querySelector('[data-campaign-filter-form]'),
  };
}

function buildCampaignTableSection() {
  const section = document.createElement('section');
  section.className = 'campaign-table-section';
  section.innerHTML = `
    <div class="table-wrapper">
      <table class="campaign-table">
        <caption class="sr-only">Sponsored Products campaign activity</caption>
        <thead>
          <tr>
            <th scope="col">Campaign</th>
            <th scope="col">Status</th>
            <th scope="col">Daily Budget</th>
            <th scope="col">Budget Used</th>
            <th scope="col">Updated</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody data-campaign-table-body></tbody>
      </table>
    </div>
    <div class="table-pagination">
      <span data-pagination-label>Page ${CAMPAIGN_PAGINATION.currentPage} of ${CAMPAIGN_PAGINATION.totalPages}</span>
      <div class="pagination-actions">
        <button type="button" class="btn btn-ghost" disabled>Previous</button>
        <button type="button" class="btn btn-ghost" disabled>Next</button>
      </div>
    </div>
  `;

  return {
    section,
    tableBody: section.querySelector('[data-campaign-table-body]'),
    paginationLabel: section.querySelector('[data-pagination-label]'),
  };
}

function buildCampaignUpdateSection() {
  const section = document.createElement('section');
  section.className = 'campaign-update';
  section.innerHTML = `
    <div class="section-heading">
      <div>
        <h3>Update campaign</h3>
        <p>Currently editing <strong>A2 - B0F63GWCMJ - PAT</strong>.</p>
      </div>
      <span class="campaign-id-pill">ID 292521029217110</span>
    </div>
    <form class="update-form" data-update-form novalidate>
      <label class="form-field">
        <span>Campaign</span>
        <div class="select-wrapper">
          <select name="campaign">
            ${CAMPAIGN_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join('')}
          </select>
        </div>
        <small>Select the Sponsored Products campaign to update.</small>
      </label>
      <label class="form-field">
        <span>Daily budget</span>
        <input type="number" name="dailyBudget" min="0" step="0.01" value="200.00" placeholder="100" inputmode="decimal" />
        <small>Budget amount in the campaign's currency.</small>
      </label>
      <label class="form-field">
        <span>Budget type</span>
        <div class="select-wrapper">
          <select name="budgetType">
            <option value="daily">Daily</option>
            <option value="lifetime">Lifetime</option>
          </select>
        </div>
      </label>
      <label class="form-field">
        <span>Dynamic bidding strategy</span>
        <div class="select-wrapper">
          <select name="biddingStrategy">
            <option value="legacy-sales">Dynamic bidding: legacy for sales</option>
            <option value="up-down">Dynamic bidding: up and down</option>
            <option value="down-only">Dynamic bidding: down only</option>
          </select>
        </div>
      </label>
      <label class="form-field">
        <span>Top of search adjustment (%)</span>
        <input type="number" name="topSearch" min="0" max="900" step="1" value="0" />
        <small>Optional: increase bids for top of search placement (0-900).</small>
      </label>
      <label class="form-field">
        <span>Product page adjustment (%)</span>
        <input type="number" name="productPage" min="0" max="900" step="1" value="0" />
        <small>Optional: increase bids for product page placement (0-900).</small>
      </label>
      <label class="form-field">
        <span>Rest of search adjustment (%)</span>
        <input type="number" name="restOfSearch" min="0" max="900" step="1" value="0" />
        <small>Optional: increase bids for rest of search placement (0-900).</small>
      </label>
      <label class="checkbox-field">
        <input type="checkbox" data-day-toggle />
        <span>
          Return updated campaign details
          <small>Request the full campaign representation in the API response.</small>
        </span>
      </label>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </form>
  `;

  return {
    section,
    form: section.querySelector('[data-update-form]'),
  };
}

function buildCampaignScheduleSection() {
  const section = document.createElement('section');
  section.className = 'campaign-schedule';
  section.id = 'campaign-schedule';
  section.hidden = true;
  section.innerHTML = `
    <div class="section-heading">
      <div>
        <h3>Automate campaign hours</h3>
        <p>Choose weekly downtime windows where campaigns pause automatically. Outside of the selected windows your campaign stays active.</p>
      </div>
    </div>
    <div class="schedule-form">
      <label class="form-field">
        <span>Profile</span>
        <div class="select-wrapper">
          <select name="profile">
            ${PROFILE_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join('')}
          </select>
        </div>
      </label>
      <label class="form-field">
        <span>Campaign</span>
        <div class="select-wrapper">
          <select name="scheduledCampaign">
            ${CAMPAIGN_OPTIONS.map((option) => `<option value="${option}">${option}</option>`).join('')}
          </select>
        </div>
      </label>
    </div>
    <div class="downtime-grid" data-downtime-days></div>
    <div class="form-actions">
      <button type="button" class="btn btn-primary" data-save-downtime>
        <i data-lucide="save" aria-hidden="true"></i>
        <span>Save downtime</span>
      </button>
    </div>
  `;

  return {
    section,
  };
}

function initHeroScheduleAction(button, scheduleSection) {
  if (!button || !scheduleSection) {
    return;
  }

  button.setAttribute('aria-expanded', 'false');

  button.addEventListener('click', () => {
    scheduleSection.hidden = false;
    scheduleSection.classList.add('is-visible');
    scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    button.setAttribute('aria-expanded', 'true');
  });
}

function renderCampaignRows(tableBody, rows) {
  if (!tableBody) {
    return;
  }

  tableBody.innerHTML = '';

  if (rows.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = 6;
    emptyCell.className = 'table-empty-state';
    emptyCell.textContent = 'No campaigns match the current filters.';
    emptyRow.appendChild(emptyCell);
    tableBody.appendChild(emptyRow);
    return;
  }

  const fragment = document.createDocumentFragment();
  rows.forEach((campaign) => {
    const row = document.createElement('tr');

    const campaignCell = document.createElement('td');
    campaignCell.innerHTML = `
      <div class="campaign-title">${campaign.name}</div>
      <div class="campaign-meta">
        <span>ID: ${campaign.id}</span>
        ${campaign.isSelected ? '<span class="campaign-badge">Selected</span>' : ''}
      </div>
    `;

    const statusCell = document.createElement('td');
    statusCell.textContent = campaign.status;

    const budgetCell = document.createElement('td');
    budgetCell.textContent = formatCurrency(campaign.dailyBudget);

    const usedCell = document.createElement('td');
    usedCell.textContent = typeof campaign.budgetUsedPercent === 'number'
      ? `${campaign.budgetUsedPercent}%`
      : '--';

    const updatedCell = document.createElement('td');
    updatedCell.textContent = campaign.updatedAt;

    const actionCell = document.createElement('td');
    const actions = document.createElement('div');
    actions.className = 'table-actions';

    const updateButton = document.createElement('button');
    updateButton.type = 'button';
    updateButton.className = 'btn btn-primary btn-small';
    updateButton.textContent = 'Update';

    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'btn btn-outline btn-small';
    pauseButton.textContent = 'Pause';

    actions.append(updateButton, pauseButton);
    actionCell.appendChild(actions);

    row.append(campaignCell, statusCell, budgetCell, usedCell, updatedCell, actionCell);
    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);
}

function updatePaginationLabel(labelElement, filteredCount) {
  if (!labelElement) {
    return;
  }

  labelElement.textContent = `Page ${CAMPAIGN_PAGINATION.currentPage} of ${CAMPAIGN_PAGINATION.totalPages} · Showing ${filteredCount} of ${CAMPAIGN_DATA.length}`;
}

function initCampaignFilters(form, tableBody, paginationLabel) {
  if (!form || !tableBody) {
    return;
  }

  const applyFilters = () => {
    const formData = new FormData(form);
    const query = (formData.get('query') || '').toString().trim().toLowerCase();
    const status = (formData.get('status') || 'all').toString();
    const minBudget = Number.parseFloat(formData.get('budgetMin'));
    const maxBudget = Number.parseFloat(formData.get('budgetMax'));
    const minUsed = Number.parseFloat(formData.get('usedMin'));
    const maxUsed = Number.parseFloat(formData.get('usedMax'));

    const filtered = CAMPAIGN_DATA.filter((campaign) => {
      const matchesQuery = !query
        || campaign.name.toLowerCase().includes(query)
        || campaign.id.includes(query);
      const matchesStatus = status === 'all' || campaign.status === status;
      const matchesBudget = (
        Number.isNaN(minBudget) || campaign.dailyBudget >= minBudget
      ) && (
        Number.isNaN(maxBudget) || campaign.dailyBudget <= maxBudget
      );

      let matchesUsed = true;
      if (!Number.isNaN(minUsed) || !Number.isNaN(maxUsed)) {
        if (typeof campaign.budgetUsedPercent !== 'number') {
          matchesUsed = false;
        } else {
          matchesUsed = (
            (Number.isNaN(minUsed) || campaign.budgetUsedPercent >= minUsed)
            && (Number.isNaN(maxUsed) || campaign.budgetUsedPercent <= maxUsed)
          );
        }
      }

      return matchesQuery && matchesStatus && matchesBudget && matchesUsed;
    });

    renderCampaignRows(tableBody, filtered);
    updatePaginationLabel(paginationLabel, filtered.length);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilters();
  });

  form.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) {
      applyFilters();
    }
  });

  form.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement) {
      applyFilters();
    }
  });

  const clearButton = form.querySelector('[data-clear-filters]');
  clearButton?.addEventListener('click', () => {
    form.reset();
    applyFilters();
  });

  applyFilters();
}

function initUpdateForm(form) {
  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Saving...';
      window.setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Save changes';
      }, 1000);
    }
  });
}

function initScheduleInteractions(section) {
  if (!section) {
    return;
  }

  const daysContainer = section.querySelector('[data-downtime-days]');
  if (daysContainer) {
    DAY_CONFIG.forEach((dayLabel) => {
      const card = buildDowntimeCard(dayLabel);
      daysContainer.appendChild(card);
      initializeDowntimeCard(card);
    });
  }

  const saveButton = section.querySelector('[data-save-downtime]');
  saveButton?.addEventListener('click', () => {
    if (!(saveButton instanceof HTMLButtonElement)) {
      return;
    }
    saveButton.disabled = true;
    const originalText = saveButton.textContent || 'Save downtime';
    saveButton.textContent = 'Saving...';
    window.setTimeout(() => {
      saveButton.disabled = false;
      saveButton.textContent = originalText;
    }, 1000);
  });
}

function buildDowntimeCard(dayLabel) {
  const card = document.createElement('article');
  card.className = 'downtime-card';
  card.dataset.day = dayLabel;
  card.innerHTML = `
    <div class="downtime-card__header">
      <div>
        <p class="downtime-day">${dayLabel}</p>
        <p class="downtime-summary" data-window-summary>9:00 AM – 5:00 PM</p>
      </div>
      <label class="toggle-switch">
        <input type="checkbox" data-day-toggle checked />
        <span class="toggle-slider" aria-hidden="true"></span>
        <span class="sr-only">Enable downtime for ${dayLabel}</span>
      </label>
    </div>
    <div class="downtime-card__body">
      <div class="downtime-windows" data-day-windows></div>
      <button type="button" class="btn btn-ghost btn-small" data-add-window>
        <i data-lucide="plus" aria-hidden="true"></i>
        <span>Add window</span>
      </button>
    </div>
  `;
  return card;
}

function initializeDowntimeCard(card) {
  const windowsContainer = card.querySelector('[data-day-windows]');
  const toggle = card.querySelector('[data-day-toggle]');
  const summary = card.querySelector('[data-window-summary]');
  const addButton = card.querySelector('[data-add-window]');

  if (!windowsContainer || !(toggle instanceof HTMLInputElement) || !addButton) {
    return;
  }

  const addWindowRow = (startValue = '09:00', endValue = '17:00') => {
    const row = document.createElement('div');
    row.className = 'downtime-window';
    row.dataset.windowRow = '';

    const startField = document.createElement('label');
    startField.className = 'time-field';
    startField.textContent = 'Start';
    const startSelectWrapper = document.createElement('div');
    startSelectWrapper.className = 'select-wrapper';
    const startSelect = createTimeSelect(startValue);
    startSelect.dataset.windowStart = '';
    startSelectWrapper.appendChild(startSelect);
    startField.appendChild(startSelectWrapper);

    const endField = document.createElement('label');
    endField.className = 'time-field';
    endField.textContent = 'End';
    const endSelectWrapper = document.createElement('div');
    endSelectWrapper.className = 'select-wrapper';
    const endSelect = createTimeSelect(endValue);
    endSelect.dataset.windowEnd = '';
    endSelectWrapper.appendChild(endSelect);
    endField.appendChild(endSelectWrapper);

    const actions = document.createElement('div');
    actions.className = 'window-actions';
    const duplicateButton = document.createElement('button');
    duplicateButton.type = 'button';
    duplicateButton.className = 'icon-button';
    duplicateButton.dataset.duplicateWindow = '';
    duplicateButton.setAttribute('aria-label', 'Duplicate downtime window');
    duplicateButton.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i>';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'icon-button';
    deleteButton.dataset.deleteWindow = '';
    deleteButton.setAttribute('aria-label', 'Remove downtime window');
    deleteButton.innerHTML = '<i data-lucide="trash-2" aria-hidden="true"></i>';

    actions.append(duplicateButton, deleteButton);
    row.append(startField, endField, actions);
    windowsContainer.appendChild(row);

    const handleChange = () => {
      updateDowntimeSummary(summary, windowsContainer, toggle.checked);
    };

    startSelect.addEventListener('change', handleChange);
    endSelect.addEventListener('change', handleChange);

    duplicateButton.addEventListener('click', () => {
      addWindowRow(startSelect.value, endSelect.value);
      updateDowntimeSummary(summary, windowsContainer, toggle.checked);
      refreshLucideIcons();
    });

    deleteButton.addEventListener('click', () => {
      const totalRows = windowsContainer.querySelectorAll('[data-window-row]').length;
      if (totalRows <= 1) {
        startSelect.value = '09:00';
        endSelect.value = '17:00';
      } else {
        row.remove();
      }
      updateDowntimeSummary(summary, windowsContainer, toggle.checked);
    });

    refreshLucideIcons();
    return row;
  };

  addWindowRow();

  const setEnabledState = (enabled) => {
    card.classList.toggle('is-disabled', !enabled);
    const controls = card.querySelectorAll('select, button');
    controls.forEach((element) => {
      if (element.matches('[data-day-toggle]')) {
        return;
      }
      element.disabled = !enabled;
    });
    updateDowntimeSummary(summary, windowsContainer, enabled);
  };

  toggle.addEventListener('change', () => {
    setEnabledState(toggle.checked);
  });

  addButton.addEventListener('click', () => {
    addWindowRow();
    updateDowntimeSummary(summary, windowsContainer, toggle.checked);
  });

  setEnabledState(toggle.checked);
}

function updateDowntimeSummary(summaryElement, container, enabled) {
  if (!summaryElement) {
    return;
  }

  if (!enabled) {
    summaryElement.textContent = 'Downtime disabled';
    return;
  }

  const windows = Array.from(container.querySelectorAll('[data-window-row]'));
  if (windows.length === 0) {
    summaryElement.textContent = 'No downtime windows';
    return;
  }

  const summary = windows.map((row) => {
    const startSelect = row.querySelector('[data-window-start]');
    const endSelect = row.querySelector('[data-window-end]');
    const startValue = startSelect?.value || '09:00';
    const endValue = endSelect?.value || '17:00';
    return `${formatDisplayTime(startValue)} – ${formatDisplayTime(endValue)}`;
  });
  summaryElement.textContent = summary.join(', ');
}

function createTimeSelect(selectedValue = '09:00') {
  const select = document.createElement('select');
  select.className = 'time-select';
  TIME_OPTIONS.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    select.appendChild(opt);
  });
  if (TIME_OPTIONS.some((option) => option.value === selectedValue)) {
    select.value = selectedValue;
  } else if (TIME_OPTIONS.length > 0) {
    select.value = TIME_OPTIONS[0].value;
  }
  return select;
}

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
      type: 'custom',
      renderer: () => createCampaignPage()
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
      type: 'custom',
      renderer: () => createProfilePage()
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

  const mainHeader = document.querySelector('.main-header');
  const rootElement = document.documentElement;

  if (
    !shell ||
    !sidebar ||
    navButtons.length === 0 ||
    !pageTitle ||
    !contentContainer ||
    !toggle ||
    !mainArea ||
    !mainHeader
  ) {
    return;
  }

  // Initialize lucide icons after module load
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    refreshLucideIcons();
  } else {
    window.addEventListener('load', () => {
      refreshLucideIcons();
    });
  }

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

    if (config.content?.type === 'custom' && typeof config.content.renderer === 'function') {
      const customNode = config.content.renderer();
      if (customNode) {
        contentContainer.appendChild(customNode);
      }
      refreshLucideIcons();
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

  const updateHeaderHeightVar = () => {
    const measuredHeight = mainHeader.offsetHeight;
    if (Number.isFinite(measuredHeight) && measuredHeight > 0) {
      rootElement.style.setProperty('--header-height', `${measuredHeight}px`);
    }
  };

  const headerResizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver(() => updateHeaderHeightVar())
    : null;

  headerResizeObserver?.observe(mainHeader);

  window.addEventListener('beforeunload', () => {
    headerResizeObserver?.disconnect();
  });

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
      refreshLucideIcons();
    }

    updateHeaderHeightVar();
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

    const eventPath = typeof event.composedPath === 'function' ? event.composedPath() : [];
    const interactedWithSidebar = sidebar.contains(event.target) || eventPath.includes(sidebar);
    const interactedWithToggle = toggle.contains(event.target) || eventPath.includes(toggle);

    if (interactedWithSidebar || interactedWithToggle) {
      return;
    }

    setSidebarState('closed');
  });

  window.addEventListener('resize', () => {
    if (!isMobileView()) {
      setSidebarState('open');
      return;
    }

    const currentState = shell.dataset.sidebarState === 'open' ? 'open' : 'closed';
    setSidebarState(currentState);
    updateHeaderHeightVar();
  });

  const defaultPage = navButtons.find((btn) => btn.classList.contains('is-active'))?.dataset.page || 'dashboard';
  renderPageContent(defaultPage);
  refreshLucideIcons();
  updateHeaderHeightVar();
  window.addEventListener('load', () => {
    updateHeaderHeightVar();
  });

  if (isMobileView()) {
    setSidebarState('closed');
  }
}

document.addEventListener('DOMContentLoaded', initDashboardShell);
