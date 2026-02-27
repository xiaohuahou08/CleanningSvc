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
index.html                                  # Main page (hero, services, booking form, footer)
css/styles.css                              # Responsive stylesheet
js/main.js                                  # Mobile nav + booking form validation + EmailJS
emailjs/
  booking-notification-template.html        # EmailJS HTML template (paste into the dashboard)
.github/
  workflows/
    deploy.yml                              # GitHub Actions → GitHub Pages deployment
```

## Email notifications (EmailJS setup)

When a visitor submits the booking form, their details are sent to
**xiaohua.hou@gmail.com** via [EmailJS](https://www.emailjs.com).
Follow these steps once to activate it:

### Step 1 – Create a free EmailJS account

Go to [emailjs.com](https://www.emailjs.com) and sign up (the free tier supports
200 emails per month).

### Step 2 – Connect your Gmail account

1. In the EmailJS dashboard go to **Email Services → Add New Service**.
2. Choose **Gmail** and follow the OAuth flow to connect **xiaohua.hou@gmail.com**.
3. Note the **Service ID** (e.g. `service_xxxxxxx`).

### Step 3 – Create the email template

1. Go to **Email Templates → Create New Template**.
2. Fill in the **header fields**:

   | Field      | Value                                                          |
   |------------|----------------------------------------------------------------|
   | To Email   | `xiaohua.hou@gmail.com` *(type the address directly)*          |
   | From Name  | `{{from_name}}`                                                |
   | Subject    | `New Booking Request – {{from_name}}`                          |
   | Reply To   | `{{from_email}}`                                               |

3. Switch to the **HTML** content tab and paste the contents of
   [`emailjs/booking-notification-template.html`](emailjs/booking-notification-template.html).
4. **Save** the template and note the **Template ID** (e.g. `template_xxxxxxx`).

### Step 4 – Add your credentials to `js/main.js`

Open `js/main.js` and replace the three placeholder constants near the top:

```js
var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // Account → General → Public Key
var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_xxxxxxx'
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xxxxxxx'
```

Commit and push — the live site will start delivering email notifications on
every booking submission.

