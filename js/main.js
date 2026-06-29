// Navigation highlight on scroll
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    var current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      link.style.background = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--accent)';
        link.style.background = 'var(--accent-bg)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
})();

// Scroll reveal with IntersectionObserver
(function () {
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll('.reveal-stagger > *').forEach(function (el, i) {
    el.style.transitionDelay = i * 0.08 + 's';
    observer.observe(el);
  });

  // Re-check if user changes accessibility setting mid-session
  motionQuery.addEventListener('change', function (e) {
    if (e.matches) {
      document.querySelectorAll('.reveal, .reveal-stagger > *').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  });
})();

// Theme toggle (light / dark / auto)
(function () {
  var STORAGE_KEY = 'cloverclc-theme';
  var html = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  if (!toggle) return;

  // Apply saved theme or follow system
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
    html.setAttribute('data-theme', saved);
  }
  // No saved preference → system default (no attribute set)

  toggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    var next;

    if (!current) {
      // Currently following system → check system preference
      var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      next = isDark ? 'light' : 'dark';
    } else if (current === 'dark') {
      next = 'light';
    } else {
      next = 'dark';
    }

    html.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();
