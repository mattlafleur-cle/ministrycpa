# Called to Account — blog

A place to post "Called to Account" newsletter issues as standalone web
pages. Lives at `/blog/` on the same site and deploy as the main homepage —
no separate hosting, no separate domain required.

**Status: public.** `noindex` has been removed from `blog/index.html` and
every real post (it stays on `posts/_template.html` intentionally — see the
comment there — since that file is a stub, not a real page). The three
homepage "Coming Soon" archive cards now link to their real posts, and all
four posts plus the blog index are in the root `sitemap.xml`. The blog is
still not linked from the main site's header/footer nav, by choice (see
"Going public" below) — it's reachable via the homepage archive cards and
direct links.

Reachable today at:
- `https://theministrycpa.com/blog/`
- `https://mattlafleur-cle.github.io/ministrycpa/blog/` (always works, regardless of the custom domain)

## How to add a new post

1. **Copy the template.** Duplicate `blog/posts/_template.html`, name the
   copy after your post in lowercase-with-hyphens, e.g.
   `blog/posts/pastor-payroll-mistakes.html`. That filename (minus `.html`)
   is the post's "slug."
2. **Fill it in.** Open your new file and replace:
   - The `<title>` and `<meta name="description">` in the `<head>`
   - The `MONTH DAY, YEAR` date and `POST TITLE HERE` heading
   - The body inside `<article class="post-body">` — plain HTML
     (`<p>`, `<h2>`, `<ul>`/`<li>`, `<blockquote>` are all pre-styled)
3. **Add it to the archive list.** Open `blog/posts.json` and add one entry
   at the top (order doesn't actually matter — the page sorts by date):
   ```json
   {
     "slug": "pastor-payroll-mistakes",
     "title": "The exact title you used in the post",
     "date": "2026-09-02",
     "excerpt": "One sentence describing the issue, shown on the archive page."
   }
   ```
   Don't forget the comma after the previous entry if you're adding above it.
4. **Commit and push.** The site rebuilds automatically (same GitHub Actions
   workflow as the homepage) — usually live within a minute.

If you'd rather hand me the post content (a doc, an email draft, plain text)
and have me build the file and posts.json entry each time, that works too —
just send it over.

## Going public

Done as of the first three real posts:

1. ~~Remove `<meta name="robots" content="noindex, follow">` from
   `blog/index.html` and from each post page.~~ Done — kept intentionally on
   `posts/_template.html` only.

Still optional, your call:

2. Add a nav link to `/blog/` from the main site if you want it in the
   header/footer (some sites intentionally only link to it from the
   newsletter emails and homepage archive cards themselves, which is the
   current setup).
3. Consider whether `Calledtoaccount.blog` (the domain you already own)
   should redirect here instead of to `/newsletter` on the main site — that
   was the original plan, but now that there's real content to point to,
   redirecting the domain straight to `/blog/` might read better.
