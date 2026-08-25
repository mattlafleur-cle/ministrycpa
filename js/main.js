// The Ministry CPA — v1 site scripts
// Three jobs: mobile nav toggle, scroll-reveal animation, and the sticky
// floating subscribe CTA. The Called to Account signup form (in index.html)
// is Kit's own official embed and needs no handler here — see main.js's
// "Called to Account signup" comment below for why.

document.addEventListener('DOMContentLoaded', function () {
  // ---------- Mobile nav toggle ----------
  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after choosing a nav link
    header.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Called to Account signup ----------
  // No handler needed here: the form in index.html is Kit's own official
  // embed (script + form markup straight from Kit's Embed panel), so
  // Kit's ck.5.js owns the entire submit/validate/confirm lifecycle.
  // A hand-rolled fetch() to Kit's endpoint previously lived here — it
  // looked like it worked (showed a success state) but never actually
  // created subscribers, since it wasn't reproducing whatever Kit's own
  // client does. See README.md "Called to Account signup" for details.

  // ---------- Scroll-reveal ----------
  // Content must never be permanently stuck invisible: a fade-in is a nice
  // touch, but it cannot be a single point of failure for reading the page.
  // So every .reveal element gets a hard timeout fallback in addition to the
  // observer, regardless of which branch runs below.
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealEls.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });

    // Safety net: if an element somehow never intersects (fast scroll,
    // observer quirk, a screenshot/print tool that resizes the viewport
    // instead of scrolling it), force it visible after a few seconds so
    // it's never lost.
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }, 1500);
  } else {
    // No IntersectionObserver support, or the visitor asked for reduced
    // motion: just show everything immediately.
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ---------- Sticky floating subscribe CTA ----------
  var stickyCta = document.getElementById('sticky-cta');
  var heroSection = document.getElementById('hero');

  if (stickyCta && heroSection && 'IntersectionObserver' in window) {
    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Show the floating CTA once the hero has scrolled out of view.
        stickyCta.classList.toggle('visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    ctaObserver.observe(heroSection);
  }
});
