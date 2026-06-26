// Navigation highlight on scroll
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      link.style.background = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = '#0969da';
        link.style.background = '#ddf4ff';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
})();
