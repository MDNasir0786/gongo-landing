/* ==========================================================================
   GONGO Landing Page - JavaScript (script.js)
   ========================================================================== */

// 1. Tailwind CSS Configuration
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#a04100",
        "inverse-on-surface": "#f1f1ef",
        "border-subtle": "#E8E8E8",
        "on-primary-container": "#572000",
        "on-error-container": "#93000a",
        "inverse-primary": "#ffb693",
        "error-container": "#ffdad6",
        "tertiary-container": "#9a9898",
        "surface-container-low": "#f4f4f2",
        "surface-container": "#eeeeec",
        "surface-tint": "#a04100",
        "on-tertiary": "#ffffff",
        "surface": "#f9f9f7",
        "surface-bright": "#f9f9f7",
        "primary-fixed-dim": "#ffb693",
        "background": "#f9f9f7",
        "border-input": "#E5E5E5",
        "on-secondary-fixed-variant": "#474646",
        "on-tertiary-fixed": "#1c1b1b",
        "on-background": "#1a1c1b",
        "secondary-fixed": "#e5e2e1",
        "on-secondary-container": "#656464",
        "surface-variant": "#e2e3e1",
        "on-primary-fixed-variant": "#7a3000",
        "secondary": "#5f5e5e",
        "on-secondary-fixed": "#1c1b1b",
        "error": "#ba1a1a",
        "surface-dim": "#dadad8",
        "on-surface": "#1a1c1b",
        "on-primary-fixed": "#351000",
        "on-tertiary-container": "#313131",
        "secondary-fixed-dim": "#c9c6c5",
        "brand-orange-hover": "#E66000",
        "primary-container": "#ff6b00",
        "on-surface-variant": "#5a4136",
        "tertiary": "#5f5e5e",
        "outline": "#8e7164",
        "text-muted": "#6B6B6B",
        "surface-container-highest": "#e2e3e1",
        "on-secondary": "#ffffff",
        "brand-orange-subtle": "#FFF2E8",
        "tertiary-fixed-dim": "#c8c6c5",
        "text-placeholder": "#9A9A9A",
        "on-error": "#ffffff",
        "surface-pure": "#FFFFFF",
        "tertiary-fixed": "#e5e2e1",
        "surface-container-high": "#e8e8e6",
        "outline-variant": "#e2bfb0",
        "on-tertiary-fixed-variant": "#474746",
        "primary-fixed": "#ffdbcc",
        "surface-container-lowest": "#ffffff",
        "secondary-container": "#e5e2e1",
        "inverse-surface": "#2f3130",
        "on-primary": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "space-lg": "1.5rem",
        "gutter-mobile": "1rem",
        "gutter": "1.5rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "margin": "2rem",
        "margin-tablet": "1.5rem",
        "space-md": "1rem",
        "space-xl": "2.5rem",
        "margin-mobile": "1.25rem"
      },
      fontFamily: {
        "display-hero-mobile": ["Inter"],
        "body-sm": ["Inter"],
        "headline-lg-mobile": ["Inter"],
        "headline-lg": ["Inter"],
        "headline-md": ["Inter"],
        "headline-sm": ["Inter"],
        "label-md": ["Inter"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"],
        "display-hero": ["Inter"],
        "stat-display": ["Inter"],
        "label-sm": ["Inter"]
      },
      fontSize: {
        "display-hero-mobile": ["40px", { "lineHeight": "1.05", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "body-sm": ["14px", { "lineHeight": "1.5", "letterSpacing": "0.005em", "fontWeight": "400" }],
        "headline-lg-mobile": ["32px", { "lineHeight": "1.15", "letterSpacing": "-0.015em", "fontWeight": "700" }],
        "headline-lg": ["44px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-md": ["26px", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "headline-sm": ["20px", { "lineHeight": "1.3", "letterSpacing": "-0.005em", "fontWeight": "600" }],
        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.01em", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "1.5", "letterSpacing": "0", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400" }],
        "display-hero": ["64px", { "lineHeight": "1.0", "letterSpacing": "-0.03em", "fontWeight": "800" }],
        "stat-display": ["36px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "label-sm": ["12px", { "lineHeight": "1.2", "letterSpacing": "0.02em", "fontWeight": "600" }]
      }
    }
  }
};

// 2. Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.getElementById('mobile-nav');
  const icon = document.getElementById('mobile-menu-icon');
  if (!nav) return;
  const isHidden = nav.classList.contains('hidden');
  if (isHidden) {
    nav.classList.remove('hidden');
    if (icon) icon.textContent = 'close';
  } else {
    nav.classList.add('hidden');
    if (icon) icon.textContent = 'menu';
  }
}

// 3. Quick Search Handler from Hero Widget
function handleQuickSearch(e) {
  e.preventDefault();
  const vType = document.getElementById('v-type').value;
  selectCategory(vType);
}

// 4. Category Selection Helper
function selectCategory(category) {
  const target = category || 'all';
  const pills = document.querySelectorAll('.cat-pill');
  let matchedBtn = null;
  pills.forEach(pill => {
    const onclickAttr = pill.getAttribute('onclick') || '';
    if (onclickAttr.includes("'" + target + "'")) {
      matchedBtn = pill;
    }
  });

  if (matchedBtn) {
    filterCategory(target, matchedBtn);
  } else if (pills.length > 0) {
    filterCategory('all', pills[0]);
  }

  const catSection = document.getElementById('categories');
  if (catSection) {
    catSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// 5. Category Pill Interactive Filtering
function filterCategory(category, buttonElement) {
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(pill => {
    pill.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm');
    pill.classList.add('bg-surface-pure', 'text-on-surface');
  });
  if (buttonElement) {
    buttonElement.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm');
    buttonElement.classList.remove('bg-surface-pure', 'text-on-surface');
  }

  const cards = document.querySelectorAll('.vehicle-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// 6. General Contact Form Handler
function handleContactSubmit(e) {
  e.preventDefault();
  const successBox = document.getElementById('contact-success-msg');
  if (successBox) {
    successBox.classList.remove('hidden');
    document.getElementById('contact-general-form').reset();
    setTimeout(() => {
      successBox.classList.add('hidden');
    }, 6000);
  }
}

// 7. Modals Controller
function openLoginModal() {
  document.getElementById('portal-modal').classList.remove('hidden');
}
function closeLoginModal() {
  document.getElementById('portal-modal').classList.add('hidden');
}
function openTermsModal() {
  document.getElementById('terms-modal').classList.remove('hidden');
}
function closeTermsModal() {
  document.getElementById('terms-modal').classList.add('hidden');
}
function openPrivacyModal() {
  document.getElementById('privacy-modal').classList.remove('hidden');
}
function closePrivacyModal() {
  document.getElementById('privacy-modal').classList.add('hidden');
}

// 8. Close modals on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLoginModal();
    closeTermsModal();
    closePrivacyModal();
  }
});
