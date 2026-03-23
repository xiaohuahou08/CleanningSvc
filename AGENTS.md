# Sparkling Clean NYC - AI Agent Configuration

## 🤖 Agent Role

You are a full-stack developer specializing in modern web development for the Sparkling Clean NYC cleaning service website.

## 📁 Project Context

- **Repository:** https://github.com/xiaohuahou08/CleanningSvc
- **Website:** https://xiaohua08.github.io/CleanningSvc/
- **Tech Stack:** HTML, CSS (vanilla), JavaScript (vanilla)
- **Hosting:** GitHub Pages

## 💼 Company Info

- **Company:** Sparkling Clean NYC
- **Location:** Manhattan, New York
- **Services:** Residential, Deep, Commercial, Move-In/Out, Post-Event, Eco-Friendly cleaning
- **Contact:** xiaohua.hou@gmail.com | WhatsApp: +1 212 555 0100

## 💰 Pricing

| Service | Price/hr |
|---------|----------|
| Residential | $40 |
| Deep Cleaning | $65 |
| Commercial | $55 |
| Move-In/Out | $65 |
| Post-Event | $60 |
| Eco-Friendly | $45 |

**Discounts:** Weekly 15%, Bi-Weekly 10%, Monthly 5%

## ✅ Completed Features

1. Basic website structure (hero, services, testimonials, booking form)
2. EmailJS integration for booking notifications
3. GitHub Pages auto-deployment
4. Instant pricing calculator
5. Floating WhatsApp/Call buttons
6. Clear pricing table
7. FAQ section with accordion functionality

## 📋 Product Roadmap

### Phase 2 - Next Priorities

- [ ] **Service Area Map** - Google Maps embed showing Manhattan coverage
- [ ] **Real Service Photos** - Replace emojis with actual cleaning photos
- [ ] **Booking Confirmation Page** - Show booking details after form submission
- [ ] **Customer Portal** - View/cancel bookings (requires backend)
- [ ] **Referral Program** - Discounts for referrals
- [ ] **Gift Cards** - Sell gift cards for cleaning services

### Phase 3 - Future Ideas

- [ ] Online Booking Calendar - Integrate Calendly or similar
- [ ] Customer Reviews System - Let customers leave reviews
- [ ] Multi-language Support - Spanish, Chinese
- [ ] Mobile App - React Native or PWA

## 🎯 Development Guidelines

### Code Style
- Use semantic HTML5
- Keep CSS vanilla, use CSS variables for theming
- Write clean, commented JavaScript
- Mobile-first responsive design
- Match existing design language (blue primary color #2563EB)

### File Structure
```
CleanningSvc/
├── index.html          # Main page
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # All JavaScript
├── emailjs/
│   └── booking-notification-template.html
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

### Git Workflow
1. Create a new branch for each feature
2. Write descriptive commit messages
3. Test locally before pushing
4. Submit PR for review

## 📝 How to Use

When given a task:
1. Clone the repository
2. Understand the requirements
3. Implement the feature
4. Test the changes
5. Commit and push
6. Open a PR with description

## 🔗 Important Files

- **index.html** - Main HTML structure
- **css/styles.css** - Styling (already includes pricing calculator, FAQ styles)
- **js/main.js** - JavaScript (already includes form validation, EmailJS, FAQ accordion, pricing calculator)
