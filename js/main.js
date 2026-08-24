// The Ministry CPA — v1 site scripts
// Four jobs: mobile nav toggle, mocked newsletter signup success state,
// scroll-reveal animation, and the sticky floating subscribe CTA.
// Replace the signup handler with a real Substack/Ghost embed before launch.

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

  // ---------- Called to Account signup (Kit) ----------
  // Posts straight to Kit's (formerly ConvertKit) public form endpoint —
  // the same one their own copy-paste embed script uses, built for exactly
  // this kind of no-backend AJAX submission from any domain. No API key is
  // needed or exposed; the form ID alone is enough.
  //
  // Setup: create a form at kit.com, then replace the placeholder in
  // data-kit-form-id on #signup-form (index.html) with its numeric ID.
  // See README.md "Called to Account signup" for step-by-step instructions.
  var PLACEHOLDER_FORM_ID = 'REPLACE_WITH_YOUR_KIT_FORM_ID';
  var form = document.getElementById('signup-form');
  var success = document.getElementById('form-success');
  var errorEl = document.getElementById('form-error');
  var submitBtn = document.getElementById('signup-submit');

  if (form && success && errorEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = document.getElementById('email-input');
      if (!emailInput || !emailInput.checkValidity()) {
        emailInput && emailInput.reportValidity();
        return;
      }

      errorEl.hidden = true;
      var formId = form.getAttribute('data-kit-form-id');

      // Kit isn't configured yet: fall back to a mocked success state so
      // the page never looks broken while someone is still setting this up.
      if (!formId || formId === PLACEHOLDER_FORM_ID) {
        console.warn('Called to Account signup: no Kit form ID set on #signup-form (data-kit-form-id). Showing a mocked success state — see README.md.');
        form.hidden = true;
        success.hidden = false;
        return;
      }

      var originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing…';
      }

      fetch('https://app.kit.com/forms/' + formId + '/subscriptions', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            form.hidden = true;
            success.hidden = false;
            return;
          }
          var message = (result.data && result.data.errors && result.data.errors[0]) ||
            'That email couldn\'t be added. Double-check it and try again.';
          errorEl.textContent = message;
          errorEl.hidden = false;
        })
        .catch(function () {
          errorEl.textContent = 'Something went wrong on our end. Please try again in a moment.';
          errorEl.hidden = false;
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        });
    });
  }

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
