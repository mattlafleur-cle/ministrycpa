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
js/main.js         mobile nav toggle + mocked newsletter signup success state
assets/            real photos, logo, and favicon art live here
```

**Cache-busting:** `index.html` references `css/style.css?v=2` and
`js/main.js?v=2`, not the bare filenames. Bump that `?v=` number any time you
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
6. Called to Account — name explainer, what-you-get list, email capture (mocked), archive preview
7. Speaking — topics, audiences, booking CTA
8. Contact — consultation + direct email CTAs
9. Footer

Each section is written as its own `<section>` with a stable `id`, so it can
be split into standalone pages later without restructuring.

## Known placeholders (fix before real launch)

- **Newsletter form**: `js/main.js` intercepts the submit and shows a mocked
  success message. Wire this to a real Substack or Ghost embed/API before
  going live.
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
