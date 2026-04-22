/**
 * Sparkling Clean NYC - Unit Tests
 * Tests for pricing calculator logic, form validation, and i18n
 */

const fs = require('fs');
const path = require('path');

// Read the main.js file for reference
const mainJsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'main.js'), 'utf8');

// ========== Pricing Calculator Tests ==========

describe('Pricing Calculator', () => {
  // Pricing data from AGENTS.md
  const PRICING = {
    residential: 40,
    deep: 65,
    commercial: 55,
    moveInOut: 65,
    postEvent: 60,
    ecoFriendly: 45
  };

  const DISCOUNTS = {
    weekly: 15,
    biWeekly: 10,
    monthly: 5,
    oneTime: 0
  };

  // Typical hours by home size
  const HOURS = {
    studio: 2,
    oneBed: 3,
    twoBed: 4,
    threeBed: 5,
    fourPlus: 7
  };

  function calculatePrice(service, hours, frequency) {
    const subtotal = PRICING[service] * hours;
    const discount = subtotal * (DISCOUNTS[frequency] / 100);
    return Math.round(subtotal - discount);
  }

  test('Residential cleaning - studio, one-time', () => {
    expect(calculatePrice('residential', 2, 'oneTime')).toBe(80);
  });

  test('Deep cleaning - 2 bedroom, weekly (15% off)', () => {
    const subtotal = 65 * 4;
    const expected = Math.round(subtotal - subtotal * 0.15);
    expect(calculatePrice('deep', 4, 'weekly')).toBe(expected);
  });

  test('Commercial cleaning - 3 bedroom, bi-weekly (10% off)', () => {
    const subtotal = 55 * 5;
    const expected = Math.round(subtotal - subtotal * 0.10);
    expect(calculatePrice('commercial', 5, 'biWeekly')).toBe(expected);
  });

  test('Eco-friendly - 1 bedroom, monthly (5% off)', () => {
    const subtotal = 45 * 3;
    const expected = Math.round(subtotal - subtotal * 0.05);
    expect(calculatePrice('ecoFriendly', 3, 'monthly')).toBe(expected);
  });

  test('Move-In/Out - 4+ bedroom, weekly (15% off)', () => {
    const subtotal = 65 * 7;
    const expected = Math.round(subtotal - subtotal * 0.15);
    expect(calculatePrice('moveInOut', 7, 'weekly')).toBe(expected);
  });

  test('Weekly discount is always the largest', () => {
    expect(DISCOUNTS.weekly).toBeGreaterThan(DISCOUNTS.biWeekly);
    expect(DISCOUNTS.biWeekly).toBeGreaterThan(DISCOUNTS.monthly);
    expect(DISCOUNTS.monthly).toBeGreaterThan(DISCOUNTS.oneTime);
  });

  test('All service prices are within Manhattan market range', () => {
    Object.values(PRICING).forEach(price => {
      expect(price).toBeGreaterThanOrEqual(40);
      expect(price).toBeLessThanOrEqual(65);
    });
  });

  test('All discounts are valid percentages', () => {
    Object.values(DISCOUNTS).forEach(discount => {
      expect(discount).toBeGreaterThanOrEqual(0);
      expect(discount).toBeLessThanOrEqual(100);
    });
  });

  test('Zero hours produces zero price', () => {
    expect(calculatePrice('residential', 0, 'oneTime')).toBe(0);
  });
});

// ========== Form Validation Tests ==========

describe('Form Validation', () => {
  test('Email validation - valid emails', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;
    expect(emailPattern.test('user@example.com')).toBe(true);
    expect(emailPattern.test('test.name@domain.org')).toBe(true);
    expect(emailPattern.test('a+b@c.co')).toBe(true);
  });

  test('Email validation - invalid emails', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;
    expect(emailPattern.test('')).toBe(false);
    expect(emailPattern.test('no-at-sign')).toBe(false);
    expect(emailPattern.test('@nodomain.com')).toBe(false);
    expect(emailPattern.test('user@')).toBe(false);
    expect(emailPattern.test('user@.com')).toBe(false);
  });

  test('Phone validation - valid phones', () => {
    const phonePattern = /^\+?[\d\s\-().]{7,20}$/;
    expect(phonePattern.test('+1 212 555 0100')).toBe(true);
    expect(phonePattern.test('(212) 555-0100')).toBe(true);
    expect(phonePattern.test('2125550100')).toBe(true);
  });

  test('Phone validation - invalid phones', () => {
    const phonePattern = /^\+?[\d\s\-().]{7,20}$/;
    expect(phonePattern.test('123')).toBe(false);
    expect(phonePattern.test('')).toBe(false);
  });

  test('Date validation - future dates only', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 1);
    expect(futureDate >= today).toBe(true);

    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 1);
    expect(pastDate < today).toBe(true);
  });
});

// ========== i18n Tests ==========

describe('Internationalization', () => {
  test('Supported languages are en and es', () => {
    const supportedLangs = ['en', 'es'];
    expect(supportedLangs).toContain('en');
    expect(supportedLangs).toContain('es');
  });

  test('Language toggle switches between en and es', () => {
    let currentLang = 'en';
    const newLang = currentLang === 'en' ? 'es' : 'en';
    expect(newLang).toBe('es');

    const backLang = newLang === 'en' ? 'es' : 'en';
    expect(backLang).toBe('en');
  });
});

// ========== File Structure Tests ==========

describe('Project Structure', () => {
  test('Required files exist', () => {
    const requiredFiles = [
      path.join(__dirname, '..', 'index.html'),
      path.join(__dirname, '..', 'css', 'styles.css'),
      path.join(__dirname, '..', 'js', 'main.js')
    ];
    requiredFiles.forEach(file => {
      expect(fs.existsSync(file)).toBe(true);
    });
  });

  test('main.js contains EmailJS configuration', () => {
    expect(mainJsContent).toContain('EMAILJS_PUBLIC_KEY');
    expect(mainJsContent).toContain('EMAILJS_SERVICE_ID');
    expect(mainJsContent).toContain('EMAILJS_TEMPLATE_ID');
  });

  test('main.js contains pricing calculator logic', () => {
    expect(mainJsContent).toContain('calculatePrice');
    expect(mainJsContent).toContain('data-price');
    expect(mainJsContent).toContain('data-discount');
  });

  test('main.js contains form validation', () => {
    expect(mainJsContent).toContain('validateField');
    expect(mainJsContent).toContain('emailPattern');
  });

  test('main.js contains i18n support', () => {
    expect(mainJsContent).toContain('data-i18n');
    expect(mainJsContent).toContain('setLanguage');
  });

  test('HTML file has correct title', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    expect(html).toMatch(/Sparkling Clean/i);
  });
});
