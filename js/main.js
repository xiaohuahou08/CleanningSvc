/* =========================================
   Sparkling Clean NYC – Main JS
   ========================================= */

(function () {
  'use strict';

  /* ---- Mobile Nav ---- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Set min date on date picker to today ---- */
  var dateInput = document.getElementById('date');
  if (dateInput) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }

  /* ---- Booking Form Validation & Submission ---- */
  var form = document.getElementById('booking-form');
  var successBanner = document.getElementById('booking-success');
  var btnText = document.getElementById('btn-text');
  var btnLoading = document.getElementById('btn-loading');

  if (!form) return;

  /**
   * Validate a single field. Returns true if valid.
   * @param {HTMLElement} field
   * @returns {boolean}
   */
  function validateField(field) {
    var errorEl = document.getElementById(field.id + '-error');
    var value = field.value.trim();
    var valid = true;
    var message = '';

    if (field.required && value === '') {
      valid = false;
      message = 'This field is required.';
    } else if (field.type === 'email' && value !== '') {
      // Require local-part @ subdomain(s) . tld (each part at least 1 char)
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;
      if (!emailPattern.test(value)) {
        valid = false;
        message = 'Please enter a valid email address.';
      }
    } else if (field.type === 'tel' && value !== '') {
      // Must start with optional '+' then digits, and contain at least 7 digits total
      var phonePattern = /^\+?[\d\s\-().]{7,20}$/;
      var digitCount = (value.match(/\d/g) || []).length;
      if (!phonePattern.test(value) || digitCount < 7) {
        valid = false;
        message = 'Please enter a valid phone number.';
      }
    } else if (field.type === 'date' && value !== '') {
      var chosen = new Date(value);
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      if (chosen < now) {
        valid = false;
        message = 'Please choose a future date.';
      }
    }

    if (valid) {
      field.classList.remove('invalid');
      if (errorEl) errorEl.textContent = '';
    } else {
      field.classList.add('invalid');
      if (errorEl) errorEl.textContent = message;
    }

    return valid;
  }

  // Live validation on blur
  var requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(function (field) {
    field.addEventListener('blur', function () {
      validateField(field);
    });
    field.addEventListener('input', function () {
      if (field.classList.contains('invalid')) {
        validateField(field);
      }
    });
  });

  /**
   * Collect form data into a plain object.
   */
  function collectFormData() {
    var data = {};
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.name && el.type !== 'submit') {
        data[el.name] = el.value.trim();
      }
    }
    return data;
  }

  /**
   * Simulate an async booking submission (replace with real API call).
   * Resolves after a short delay to mimic network latency.
   */
  function submitBooking(data) {
    return new Promise(function (resolve) {
      // TODO: Replace with fetch('/api/bookings', { method:'POST', body: JSON.stringify(data) })
      console.log('Booking data submitted:', data);
      setTimeout(resolve, 1200);
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate all required fields
    var allValid = true;
    requiredFields.forEach(function (field) {
      if (!validateField(field)) {
        allValid = false;
      }
    });

    if (!allValid) {
      // Scroll to the first invalid field
      var firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
      return;
    }

    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    form.querySelector('button[type="submit"]').disabled = true;

    var bookingData = collectFormData();

    submitBooking(bookingData).then(function () {
      // Hide form, show success banner
      form.classList.add('hidden');
      successBanner.classList.remove('hidden');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }).catch(function (err) {
      console.error('Booking submission error:', err);
      // Re-enable button on error
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      form.querySelector('button[type="submit"]').disabled = false;
    });
  });

})();
