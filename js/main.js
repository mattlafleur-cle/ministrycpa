// The Ministry CPA — v1 site scripts
// Two jobs for now: mobile nav toggle, and a mocked newsletter signup
// success state. Replace the signup handler with a real Substack/Ghost
// embed (or their form action + API) before launch.

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

  // ---------- Called to Account signup (mocked) ----------
  // TODO: swap this for a real Substack/Ghost embed or API call at launch.
  var form = document.getElementById('signup-form');
  var success = document.getElementById('form-success');

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = document.getElementById('email-input');
      if (!emailInput || !emailInput.checkValidity()) {
        emailInput && emailInput.reportValidity();
        return;
      }

      // Mock success state. No data is actually sent anywhere yet.
      form.hidden = true;
      success.hidden = false;
    });
  }
});
