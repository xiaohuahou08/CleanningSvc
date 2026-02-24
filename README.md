# Sparkling Clean NYC

Marketing and booking website for a Manhattan cleaning service.

🌐 **Live site:** https://xiaohuahou08.github.io/CleanningSvc/

## Hosting (GitHub Pages – free)

The site is automatically deployed to **GitHub Pages** on every push to `main`
via the workflow at `.github/workflows/deploy.yml`.

### One-time setup (do this once in the GitHub UI)

1. Go to **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Save. The next push to `main` will publish the site live.

## Project structure

```
index.html        # Main page (hero, services, booking form, footer)
css/styles.css    # Responsive stylesheet
js/main.js        # Mobile nav + booking form validation
.github/
  workflows/
    deploy.yml    # GitHub Actions → GitHub Pages deployment
```

