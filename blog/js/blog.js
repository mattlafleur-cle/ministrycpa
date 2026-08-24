// Called to Account — blog archive renderer.
// Reads blog/posts.json and renders a teaser card per post, newest first.
// To add a post: create blog/posts/<slug>.html from the template, then add
// one entry here (see blog/README.md for the full walkthrough).

document.addEventListener('DOMContentLoaded', function () {
  var listEl = document.getElementById('post-list');
  if (!listEl) return;

  fetch('posts.json')
    .then(function (res) {
      if (!res.ok) throw new Error('posts.json request failed: ' + res.status);
      return res.json();
    })
    .then(function (posts) {
      if (!Array.isArray(posts) || posts.length === 0) {
        listEl.innerHTML = '<p class="post-list-empty">No posts yet. Check back soon.</p>';
        return;
      }

      var sorted = posts.slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      listEl.innerHTML = sorted.map(renderCard).join('');
    })
    .catch(function (err) {
      listEl.innerHTML = '<p class="post-list-empty">Couldn\'t load posts right now.</p>';
      console.error(err);
    });

  function renderCard(post) {
    var dateLabel = formatDate(post.date);
    return (
      '<a class="post-card" href="posts/' + escapeHtml(post.slug) + '.html">' +
        '<span class="post-date">' + dateLabel + '</span>' +
        '<h2>' + escapeHtml(post.title) + '</h2>' +
        '<p>' + escapeHtml(post.excerpt || '') + '</p>' +
      '</a>'
    );
  }

  function formatDate(isoDate) {
    var d = new Date(isoDate + 'T00:00:00');
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // Minimal escaping since post metadata comes from our own posts.json,
  // not user input — this just guards against stray characters breaking markup.
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
});
