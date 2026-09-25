/* Live X feed for the homepage. Pulls public posts + reposts from a free,
   no-key JSON feed (FxEmbed) and renders them in the site's own style.
   $0 — no X API, no signup, no credentials. */
(function () {
  var root = document.getElementById('x-feed');
  if (!root) return;

  var HANDLE = 'PantelaiosNikos';
  var API = 'https://api.fxtwitter.com/2/profile/' + HANDLE + '/statuses';
  var COUNT = 6;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function plainText(s) {
    var t = s.raw_text;
    if (t != null && typeof t === 'object') t = t.text;
    if (t == null && s.text != null) t = String(s.text).replace(/<[^>]*>/g, '');
    return t == null ? '' : String(t);
  }
  function linkify(s) {
    return esc(s)
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener nofollow">$1</a>')
      .replace(/\n/g, '<br>');
  }
  function relTime(ts) {
    if (!ts) return '';
    var mins = Math.max(1, Math.floor(Date.now() / 1000 - ts) / 60);
    if (mins < 60) return Math.floor(mins) + 'm';
    var hours = Math.floor(mins / 60);
    if (hours < 24) return hours + 'h';
    var days = Math.floor(hours / 24);
    if (days < 30) return days + 'd';
    return new Date(ts * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
  function fmt(n) {
    n = n || 0;
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return String(n);
  }

  function card(s) {
    var a = s.author || {};
    var reposted = !!s.reposted_by;
    var media = (s.media && s.media.photos && s.media.photos[0]) || null;
    var img = '';
    if (media && media.url) {
      img = '<div class="xfeed-media"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
        '<img src="' + esc(String(media.url).replace('name=orig', 'name=small')) + '" alt="" loading="lazy"></a></div>';
    }
    return '<article class="xfeed-card">' +
      (reposted ? '<div class="xfeed-repost-label">&#x21bb; Reposted</div>' : '') +
      '<div class="xfeed-head">' +
      '<img class="xfeed-avatar" src="' + esc(a.avatar_url || '') + '" alt="" loading="lazy">' +
      '<div><div class="xfeed-name">' + esc(a.name || '') + '</div>' +
      '<div class="xfeed-handle">@' + esc(a.screen_name || '') + '</div></div>' +
      '<a class="xfeed-time" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(relTime(s.created_timestamp)) + '</a>' +
      '</div>' +
      '<p class="xfeed-text">' + linkify(plainText(s)) + '</p>' +
      img +
      '<div class="xfeed-foot"><span>&#x21bb; ' + fmt(s.reposts) + '</span><span>&hearts; ' + fmt(s.likes) + '</span></div>' +
      '</article>';
  }

  fetch(API)
    .then(function (r) { if (!r.ok) throw new Error('feed failed'); return r.json(); })
    .then(function (d) {
      var items = (d.results || []).slice(0, COUNT);
      if (!items.length) throw new Error('empty feed');
      root.innerHTML = items.map(card).join('');
    })
    .catch(function () {
      root.innerHTML = '<p class="xfeed-error">Could not load the X feed. ' +
        '<a href="https://x.com/' + HANDLE + '" target="_blank" rel="noopener">Follow @' + HANDLE + ' on X</a>.</p>';
    });
})();
