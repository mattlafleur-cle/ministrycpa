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

The signup form in `index.html` (inside the `newsletter` section) is Kit's
(formerly ConvertKit) **own official embed** — the script and form markup
copy-pasted verbatim from Kit's Embed panel (HTML tab), then restyled via
`.newsletter-kit-form` rules in `css/style.css` to match the site's brand
instead of Kit's defaults. It currently points at a real, live form
("Called to Account", form ID `9839539`).

**An earlier version of this hand-rolled its own `fetch()` call to Kit's
endpoint instead of using Kit's script.** It looked like it worked (showed a
success message) but never actually created subscribers — the endpoint
accepted the request without reproducing whatever validation/anti-spam
handshake Kit's own client does. If you ever rebuild this by hand again,
don't: use Kit's official embed and restyle it, the way it's done now.

**To point this at a different Kit account/form:**

1. In Kit, create or open the form (Grow → Landing Pages & Forms), format
   "Inline" is simplest since we override the visual styling anyway.
2. Open its **Embed** panel → **HTML** tab and copy the full snippet (a
   `<script src="https://f.convertkit.com/ckjs/ck.5.js">` tag plus a
   `<form action="https://app.kit.com/forms/<ID>/subscriptions" ...>` block
   with a large inline `<style>` block).
3. In `index.html`, replace the current script + form block (search for
   `newsletter-kit-form`) with the new one. Keep the two things this repo
   adds on top: the `newsletter-kit-form` class on the `<form>` tag (for the
   CSS overrides to target), and swapping the `email_address` input's
   `placeholder` back to `you@yourministry.org` if Kit resets it.
4. Update the form ID references in this README section.
5. Bump the cache-busting `?v=` on `index.html`'s CSS/JS links (see above),
   then deploy and test with a real email address — confirm it actually
   shows up in Kit's **Subscribers** list, not just that the page shows a
   success message.

**Double opt-in:** currently **off** for this form — subscribers land on the
list immediately, no confirmation email. Kit forms have this setting under
the form's Settings tab if you want to turn it back on. The success message
(`data-options` → `success_message` in the embed) is written to match
whichever state is active ("You're in. Welcome to Called to Account." for
single opt-in) — update it to something like "check your inbox to confirm"
if you re-enable confirmation.

Trade-off worth knowing: single opt-in means anyone can type any email
(typos, someone else's address) and it's added immediately, no verification.
Fine for a lot of solo newsletters, but it does affect list quality and
sender reputation over time if bad addresses accumulate.

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
