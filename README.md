# The Ministry CPA — v1 Site

First-draft, one-page site for TheMinistryCPA.com, the personal brand of Matt
LaFleur, CPA. Positions Matt as the go-to CPA for churches and Christian
nonprofits navigating ministry finance, and drives visitors to subscribe to
the **Called to Account** newsletter.

## Stack

Static HTML/CSS/JS. No build step, no dependencies. Deploy anywhere that
serves static files (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.).

```
index.html        one page, sections commented and id-anchored for future
                   expansion into separate routes/pages
css/style.css      all styling (navy / orange two-color palette)
js/main.js         mobile nav toggle + Called to Account signup (Kit) + scroll-reveal
assets/            real photos, logo, and favicon art live here
```

**Cache-busting:** `index.html` references `css/style.css?v=3` and
`js/main.js?v=3`, not the bare filenames. Bump that `?v=` number any time you
edit either file. Without it, browsers and GitHub's CDN can keep serving an
old cached copy of the CSS/JS after a deploy even though the HTML updates
immediately — this already happened once (a photo added to `.photo-placeholder`
looked broken/unstyled for a visitor on a stale cached stylesheet). Bumping
the version forces a fresh fetch.

## Page sections (in order)

1. Header / nav — About, Services, Called to Account, Speaking, Contact, Subscribe CTA
2. Hero — headline, sub, primary + secondary CTA, trust bar
3. Problem — 3 pain-point cards + the 11 ministry finance pillars
4. About — bio, headshot, "in good company" relationships
5. Services — Advisory/Fractional CFO, Compliance Reviews & Board Training, Speaking & Workshops
6. Called to Account — name explainer, what-you-get list, email capture (live, via Kit), archive preview
7. Speaking — topics, audiences, booking CTA
8. Contact — consultation + direct email CTAs
9. Footer

Each section is written as its own `<section>` with a stable `id`, so it can
be split into standalone pages later without restructuring.

## Called to Account signup

The signup form (`#signup-form` in `index.html`) posts directly to Kit
(formerly ConvertKit) with no backend of any kind — it's a plain `fetch` to
Kit's public form endpoint, the same one their own copy-paste embed script
uses. No API key is exposed or needed.

**To connect it to a real list:**

1. Create a free account at [kit.com](https://kit.com) if you don't have one.
2. In Kit, create a form (Grow → Landing Pages & Forms → Create → Form).
   Name it something like "Called to Account." Any form type works since
   we're only using its ID, not Kit's own embed styling.
3. Find the form's numeric ID — it's in the dashboard URL when you're editing
   the form (`app.kit.com/forms/designers/<ID>`) or shown in the form's
   Embed panel.
4. In `index.html`, replace `REPLACE_WITH_YOUR_KIT_FORM_ID` on `#signup-form`'s
   `data-kit-form-id` attribute with that number. That's the only change
   needed — `js/main.js` reads it from there.
5. Bump the cache-busting `?v=` on `index.html`'s CSS/JS links (see above),
   then deploy and test with a real email address.

Until step 4 is done, the form falls back to a mocked success state (logging
a console warning) instead of silently failing, so the page never looks
broken mid-setup.

**Double opt-in:** Kit forms have confirmation email settings under the
form's Settings tab — enable it if you want subscribers to confirm before
landing on your list.

## Known placeholders (fix before real launch)

- **Contact links**: point to `mailto:hello@theministrycpa.com`. Replace
  with Matt's real inbox and, ideally, a real scheduling link (Calendly or
  similar) for "Book a Consultation."
- **Trust bar**: intentionally generic ("Church of the Open Door and other
  ministries") with no logos. Add real logos/testimonials once available.
- **Calledtoaccount.blog**: set up a 301 redirect from that domain to
  `/newsletter` (or `#newsletter` on this one-pager) once this site is live.
- **Favicon**: current favicon is a generated navy/gold "MC" monogram SVG.
  Replace with real brand mark when available.

## Brand notes for future contributors

- Keep this site visually distinct from Forest City. No shared logo, no
  shared color system.
- Tone: expert, calm, plain-English, faith-respecting but not preachy. No
  Christian-cliche stock photography, no crosses or stained glass. The
  reference point is CapinCrouse-level credibility with a modern personal
  brand.
- Avoid em dashes in copy.
