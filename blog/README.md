# Called to Account — blog

A place to post "Called to Account" newsletter issues as standalone web
pages. Lives at `/blog/` on the same site and deploy as the main homepage —
no separate hosting, no separate domain required. Right now it is **not**
linked from the main site's nav, and every page here has
`<meta name="robots" content="noindex, follow">` so it won't show up in
search results until you're ready. Both are easy to undo when you want this
public (see "Going public" below).

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

When you're ready for this to be a real, findable part of the site:

1. Remove `<meta name="robots" content="noindex, follow">` from
   `blog/index.html` and from each post page (or ask me to do it).
2. Add a nav link to `/blog/` from the main site if you want it in the
   header/footer (also optional — some sites intentionally only link to it
   from the newsletter emails themselves).
3. Consider whether `Calledtoaccount.blog` (the domain you already own)
   should redirect here instead of to `/newsletter` on the main site — that
   was the original plan, but now that there's real content to point to,
   redirecting the domain straight to `/blog/` might read better. Your call.
