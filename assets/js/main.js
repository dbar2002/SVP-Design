/* ============================================
   SILICON VALLEY PROJECTS — Main JS
   ============================================ */

// Theme: 3 modes — "light", "dark", "system"
(function() {
  var mode = localStorage.getItem('svp-theme-mode') || 'system';
  applyThemeMode(mode);

  function applyThemeMode(m) {
    document.documentElement.setAttribute('data-theme-mode', m);
    if (m === 'system') {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', m);
    }
  }

  window.__applyThemeMode = applyThemeMode;
})();

document.addEventListener('DOMContentLoaded', function() {

  // ---- Mobile nav ----
  var toggle = document.querySelector('.navbar__toggle');
  var links = document.querySelector('.navbar__links');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('navbar__links--open');
    });
  }

  // ---- Theme switcher dropdown ----
  document.querySelectorAll('.theme-switcher').forEach(function(switcher) {
    var btn = switcher.querySelector('.theme-switcher__btn');
    var options = switcher.querySelectorAll('.theme-switcher__option');

    // Toggle dropdown open/close
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      switcher.classList.toggle('is-open');
    });

    // Handle option selection
    options.forEach(function(opt) {
      opt.addEventListener('click', function(e) {
        e.stopPropagation();
        var mode = opt.getAttribute('data-mode');
        localStorage.setItem('svp-theme-mode', mode);
        window.__applyThemeMode(mode);
        updateActiveOption(switcher, mode);
        switcher.classList.remove('is-open');
      });
    });

    // Set initial active state
    var currentMode = document.documentElement.getAttribute('data-theme-mode') || 'system';
    updateActiveOption(switcher, currentMode);
  });

  function updateActiveOption(switcher, mode) {
    switcher.querySelectorAll('.theme-switcher__option').forEach(function(opt) {
      if (opt.getAttribute('data-mode') === mode) {
        opt.classList.add('is-active');
      } else {
        opt.classList.remove('is-active');
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    document.querySelectorAll('.theme-switcher.is-open').forEach(function(s) {
      s.classList.remove('is-open');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.theme-switcher.is-open').forEach(function(s) {
        s.classList.remove('is-open');
      });
    }
  });

  // Listen for OS changes when in system mode
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
      var mode = document.documentElement.getAttribute('data-theme-mode');
      if (mode === 'system') {
        window.__applyThemeMode('system');
      }
    });
  }

  // ---- Hero entrance animation ----
  var hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(function() { hero.classList.add('is-loaded'); }, 100);
  }

  // ---- Scroll-triggered animations ----
  var animEls = document.querySelectorAll('[data-animate], [data-animate-stagger]');
  if (animEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(function(el) { observer.observe(el); });
  }

  // ---- Smooth scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Active nav link ----
  var path = window.location.pathname;
  document.querySelectorAll('.navbar__link').forEach(function(l) {
    if (l.getAttribute('href') === path) l.classList.add('navbar__link--active');
  });

  // ---- Lightbox ----
  var items = document.querySelectorAll('.gallery__item:not(.gallery__item--placeholder)');
  var lb = document.querySelector('.lightbox');
  if (items.length && lb) {
    var lbImg = lb.querySelector('.lightbox__img');
    var lbCounter = lb.querySelector('.lightbox__counter');
    var imgs = [];
    items.forEach(function(item) {
      var img = item.querySelector('img');
      if (img) imgs.push(img.src);
    });
    var idx = 0;

    function openLightbox(i) {
      idx = i;
      lbImg.src = imgs[idx];
      if (lbCounter) lbCounter.textContent = (idx + 1) + ' / ' + imgs.length;
      lb.classList.add('lightbox--active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lb.classList.remove('lightbox--active');
      document.body.style.overflow = '';
    }
    function navLightbox(dir) {
      idx = (idx + dir + imgs.length) % imgs.length;
      lbImg.src = imgs[idx];
      if (lbCounter) lbCounter.textContent = (idx + 1) + ' / ' + imgs.length;
    }

    items.forEach(function(item) {
      var img = item.querySelector('img');
      if (img) {
        item.addEventListener('click', function() {
          openLightbox(imgs.indexOf(img.src));
        });
      }
    });
    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function() { navLightbox(-1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function() { navLightbox(1); });
    lb.addEventListener('click', function(e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function(e) {
      if (!lb.classList.contains('lightbox--active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    });
  }

});
