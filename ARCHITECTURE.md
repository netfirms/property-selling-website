# Project Architecture Overview

Aura Capital Asset is a static, multi-language property listing website that focuses on high performance and clean UI/UX for Chiang Mai's luxury condo market.

## 📁 Repository Structure

```text
├── .github/          # GitHub Actions workflows for CI/CD
├── asset/            # Visual assets, categorized
│   └── properties/   # Categorized property images (bedroom, facilities, etc.)
│       └── condo/
│           └── dcondo-ping/
│               ├── landmarks/    # Local landmarks and nearby location images
│               ├── content.js    # Property-specific language strings and data
│               ├── contact_qr.jpg# Property-specific LINE contact QR code
│               ├── bedroom/
│               └── ... (other categories)
├── css/              # Stylesheets (Vanilla CSS)
│   └── style.css     # Main design system and styles
├── js/               # JavaScript logic
│   ├── main.js       # Core logic, gallery, and i18n renderer
│   └── translations.js # Dictionary-based translation strings
├── index.html        # Main entry point and layout
├── Makefile          # Local development and deployment shortcuts
├── package.json      # Dependencies and metadata
├── robots.txt        # SEO/crawling configuration
└── sitemap.xml       # Search engine indexing guide
```

## 🌐 Multi-language System (I18n)

The application uses a lightweight, client-side translation system powered by `js/translations.js` and `js/main.js`.

### How it Works:

1.  **Translation Dictionary**: Strings are stored in `js/translations.js` as an object where keys correspond to language codes (`en`, `th`, `zh`, etc.).
2.  **HTML Mapping**: Use the `data-i18n` attribute on elements to map them to keys in the translation dictionary.
    - Example: `<h1 data-i18n="nav_about">About</h1>`
3.  **Placeholders**: Input placeholders are translated using the `data-i18n-placeholder` attribute.
4.  **Language Switching**: Managed via a dropdown in the navbar, persisting the user preference in `localStorage`.

## 📦 Deployment Workflow

We use **GitHub Actions** for automated deployment to **GitHub Pages**.

1.  **Trigger**: Pushing changes to the `main` or `master` branch.
2.  **Workflow**: `.github/workflows/deploy.yml` takes the current directory and uploads it as a GitHub Pages artifact.
3.  **Deployment**: The artifact is automatically deployed to the production URL.

## 🖼 Asset Management

All images are optimized for the web and organized into logical categories within the `asset/` folder. This ensures that the gallery and location sections can be easily maintained and updated with new property listings or regional updates.

---

For development instructions, please refer to the [README.md](README.md).
