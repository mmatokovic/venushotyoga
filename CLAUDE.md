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
All site configuration, including menus and per-language params, is in the root `hugo.toml`.
Shared data (links, address, opening hours, testimonials) is in `data/`, UI strings in `i18n/`. Every page and string exists in both languages; testimonials carry `hr` and `en` text, and English pages must not fall back to Croatian.
Time-limited home page texts (the enrolment and offer notices on the cards, and the popup) live in the front matter of `content/*/_index.md`, each with an `until` date; they disappear on the first build after that date.

## What only works on the deployed site

- **Forms** — the contact and newsletter forms are Netlify Forms (`data-netlify`), so submitting from `hugo server` does nothing.
- **Google Analytics and the cookie banner** — rendered only in production builds (`hugo.IsProduction`), and gtag.js loads only after the visitor accepts.
- **Decap CMS** at `/admin/` — uses Netlify Identity and Git Gateway, and commits to `main`. Run `npx decap-server` to edit locally (`local_backend: true`).
  Invite and password-reset links land on the home page with a `#…_token=` hash; `assets/js/modules/identity.ts` forwards them to `/admin/`.
- **Headers and redirects** — security headers, the CSP and caching live in `static/_headers`; redirects in `static/_redirects`. `netlify.toml` only holds the build settings.
- **Google Maps** on the contact page sets Google cookies, so it shares the cookie banner's consent: it loads automatically once the visitor has accepted, and otherwise only when they click "Prikaži kartu" (`assets/js/modules/map.ts`).

## Branches and deploys

Trunk-based: `main` is the only long-lived branch and is deployed to production by Netlify.
Work happens on short-lived feature branches opened as pull requests; Netlify builds each one as a deploy preview, and it is squash-merged once the `build` check passes.
Deploy previews build with `HUGO_ENVIRONMENT=preview`, which adds `<meta name="robots" content="noindex">` and a `Disallow: /` robots.txt.
Releases are tagged `vX.Y.Z` on `main` with the same version in `package.json`.

## Layouts

The site uses the Hugo 0.146+ template system: `layouts/baseof.html`, `home.html`, `single.html`, page-specific layouts (`pricing.html`, `faq.html`, `contact.html`, `book.html`) selected with `layout:` in front matter, `_partials/` and `_shortcodes/`.

- Standalone Markdown images and image-card photos open in a lightbox (ported from sleeve: `modules/lightbox.ts`, `_partials/lightbox.html`); the dialog is only added to pages that have one, via `.Page.Store.Set "lightbox" true`.
- Images live in `assets/images` and are always processed: use the `image` partial (`dict "src" … "width" … "alt" …`), which outputs WebP with `width` and `height`. Markdown images go through `_markup/render-image.html`.
- Internal Markdown links are resolved by `_markup/render-link.html`; a link to a missing page, or one that isn't in `static/` or `static/_redirects`, logs a warning and fails the build.
- The `schedule` shortcode accepts Croatian or English day names and shows them translated.

### JavaScript

As in sleeve, Turbo Drive (`@hotwired/turbo`) and Alpine.js (with `alpine-turbo-drive-adapter`) are bundled from `assets/js/turbo.ts` and `assets/js/alpine.ts` and switched on with `params.turbo` and `params.alpine` in `hugo.toml`.
Small interactive UI belongs in Alpine attributes in the templates: the mobile menu (`header.html`) and the popup. Use `x-cloak` on anything hidden until Alpine starts.
The read-more shortcode needs no JavaScript: `:has()` in `main.css` and Tailwind's `group-open:` handle it.

`assets/js/main.ts` imports the remaining modules from `assets/js/modules/` (forms, map, slider, identity); each exports `init()` and does nothing on pages without its elements.
`js.Build` bundles them into a single deferred, fingerprinted script loaded on every page. Keep it that way rather than loading scripts per page or per shortcode.

Turbo replaces the `<body>` on navigation, so:

- Per-page setup goes through `onPageLoad()` from `modules/page.ts` (runs on `turbo:load`, or `DOMContentLoaded` without Turbo), and anything that must be torn down before Turbo caches a page uses `onBeforeCache()` (the sliders do).
- Listeners for things that can appear on any page are attached once to `document` and matched with `closest()` (forms, the map button, consent).
- Links that leave the site through a `static/_redirects` rule, links to static files, and Netlify forms carry `data-turbo="false"`; the link render hook adds it automatically.
- Hook into markup with `data-*` attributes rather than ids, because shortcodes can appear more than once per page.

Behaviour can be checked in a real browser: Playwright launching the installed Edge (`chromium.launch({ channel: 'msedge' })`) works on this machine, whereas jsdom cannot run the ES module bundles for Turbo and Alpine.

## Conventions

- No comments in code.
- Commit messages: a short imperative sentence ("Add …", "Fix …"), no type prefixes, no AI attribution lines.
- Tailwind classes toggled only from JS are not in `hugo_stats.json`; add them with `@source inline(...)` in `assets/css/main.css`, or toggle the `hidden` attribute instead.
- Tailwind v4 syntax: `size-*`, `rounded-sm`/`shadow-xs`, `focus:ring-3`, `outline-hidden`, logical `ms-`/`me-`/`start-`/`end-`, important as a suffix (`h-full!`).
- Buttons use the `btn` utility from `main.css` (sleeve's button style in the brand colours), with `btn-secondary` for the outlined variant and `btn-sm` for the small size. Form inputs use the matching `field` utility. Don't style buttons or inputs with one-off classes.
- Text on the light brand colours (ecru, tuscan, hazelnut, khaki, buff, french-beige) is `text-gray-900`; brand-coloured text and icons use `text-camel-dark`. Both pass WCAG AA; the lighter brand colours do not, so don't use them for text.
- The font is Alegreya, self-hosted from Fontsource as variable WOFF2 (weights 400–900, normal and italic) in `static/fonts/`, split into `latin` and `latin-ext` files by `unicode-range`. Any replacement font must include the Croatian letters (č ć š ž đ); Lusitana, the previous font, did not.
- Edit files containing Croatian characters with an editor or `sed`, not `perl -e` with literal non-ASCII text, which double-encodes them.

## Checks

CI (`.github/workflows/build.yml`) builds the site with `--panicOnWarning`, so a broken internal link or a missing image fails the build.
Run the same locally with `hugo --gc --minify --panicOnWarning`. Netlify builds with the same flag, so a broken build never deploys.
CI also checks that `static/admin/config.yml` parses as YAML; Decap publishes no JSON schema, so field-level mistakes in that file are only caught by opening `/admin/` (or `npx decap-server` locally).
`main` is protected by a ruleset: no force pushes or deletions, linear history, and the `build` check must pass on pull requests.

`.github/workflows/links.yml` checks external links in `content/` every Monday; a broken one fails the run and GitHub emails the failure.
Dependabot (`.github/dependabot.yml`) opens monthly PRs for GitHub Actions and npm packages; Hugo is updated by hand in `netlify.toml`, and Decap CMS by hand in `static/admin/index.html`.

The CSP is currently `Content-Security-Policy-Report-Only`: after a deploy, open the site and `/admin/` and check the browser console for violations, then rename the header to `Content-Security-Policy`.
