# Venus Hot Yoga

Source of [venushotyoga.hr](https://venushotyoga.hr), a Hugo site styled with Tailwind CSS v4 and deployed on Netlify.

## Run locally

```sh
pnpm install   # Tailwind CSS, keen-slider
hugo server    # http://localhost:1313
```

Versions are pinned in one place each: Hugo in `netlify.toml` (`HUGO_VERSION`), Node in `.node-version`, pnpm in `package.json` (`packageManager`).

Croatian is the default language and lives at the site root (`content/hr`); English is under `/en/` (`content/en`).
Blog posts exist only in Croatian, as page bundles under `content/hr/posts/`; start one with `hugo new content content/hr/posts/<slug>/index.md`.
Shared data (links, address, opening hours, testimonials) is in `data/`, UI strings in `i18n/`.

## What only works on the deployed site

- **Forms** — the contact and newsletter forms are Netlify Forms (`data-netlify`), so submitting from `hugo server` does nothing.
- **Google Analytics and the cookie banner** — rendered only in production builds (`hugo.IsProduction`), and gtag.js loads only after the visitor accepts.
- **Decap CMS** at `/admin/` — uses Netlify Identity and Git Gateway, and commits to `main`. Run `npx decap-server` to edit locally (`local_backend: true`).
  Invite and password-reset links land on the home page with a `#…_token=` hash; `assets/js/modules/identity.ts` forwards them to `/admin/`.
- **Headers and redirects** — security headers, the CSP and caching live in `static/_headers`; redirects in `static/_redirects`. `netlify.toml` only holds the build settings.

Deploy previews and branch deploys build with `HUGO_ENVIRONMENT=preview`, which adds `<meta name="robots" content="noindex">` and a `Disallow: /` robots.txt.

## Layouts

The site uses the Hugo 0.146+ template system: `layouts/baseof.html`, `home.html`, `single.html`, page-specific layouts (`pricing.html`, `faq.html`, `contact.html`, `book.html`) selected with `layout:` in front matter, `_partials/` and `_shortcodes/`.

- Images live in `assets/images` and are always processed: use the `image` partial (`dict "src" … "width" … "alt" …`), which outputs WebP with `width` and `height`. Markdown images go through `_markup/render-image.html`.
- Internal Markdown links are resolved by `_markup/render-link.html`; a link to a missing page, or one that isn't in `static/` or `static/_redirects`, logs a warning and fails the build.
- The `schedule` shortcode accepts Croatian or English day names and shows them translated.

### JavaScript

`assets/js/main.ts` imports one module per feature from `assets/js/modules/`; each exports `init()` and does nothing on pages without its elements.
`js.Build` bundles them into a single deferred, fingerprinted script loaded on every page. Keep it that way rather than loading scripts per page or per shortcode.
Hook into markup with `data-*` attributes rather than ids, because shortcodes can appear more than once per page.

## Conventions

- No comments in code.
- Commit messages: a short imperative sentence ("Add …", "Fix …"), no type prefixes, no AI attribution lines.
- Tailwind classes toggled only from JS are not in `hugo_stats.json`; add them with `@source inline(...)` in `assets/css/main.css`, or toggle the `hidden` attribute instead.
- Tailwind v4 syntax: `focus:ring-3`, `outline-hidden`, logical `ms-`/`me-`/`start-`/`end-`, important as a suffix (`h-full!`).

## Checks

CI (`.github/workflows/build.yml`) builds the site with `--panicOnWarning`, so a broken internal link or a missing image fails the build.
Run the same locally with `hugo --gc --minify --panicOnWarning`. Netlify builds with the same flag, so a broken build never deploys.
`main` is protected by a ruleset: no force pushes or deletions, linear history, and the `build` check must pass on pull requests.

`.github/workflows/links.yml` checks external links in `content/` every Monday; a broken one fails the run and GitHub emails the failure.
Dependabot (`.github/dependabot.yml`) opens monthly PRs for GitHub Actions and npm packages; Hugo is updated by hand in `netlify.toml`, and Decap CMS by hand in `static/admin/index.html`.

The CSP is currently `Content-Security-Policy-Report-Only`: after a deploy, open the site and `/admin/` and check the browser console for violations, then rename the header to `Content-Security-Policy`.
