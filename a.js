/* Wilsons Rib Crib — anonymous visit counter. No cookies, no names, no ad pixels.
   Counts page views, where visits come from, taps on Call / Directions / Order / DoorDash, and commercial plays.
   Honors Do Not Track and Global Privacy Control. Shared by wilsonsribcrib.com and order.wilsonsribcrib.com. */
(function () {
  'use strict';
  try {
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl) { window.rcT = function () {}; return; }
    var END = 'https://order.wilsonsribcrib.com/api/t';
    var host = location.hostname, SITE = /^order\./.test(host) ? 'order' : 'site';
    if (!/wilsonsribcrib\.com$/.test(host)) { window.rcT = function () {}; return; }
    var ss = null, ls = null;
    try { ss = window.sessionStorage; ss.getItem('x'); } catch (e) { ss = null; }
    try { ls = window.localStorage; ls.getItem('x'); } catch (e) { ls = null; }
    var send = function (e, o) {
      var b = { s: SITE, e: e, p: location.pathname };
      if (o) for (var k in o) b[k] = o[k];
      var body = JSON.stringify(b);
      try { if (navigator.sendBeacon && navigator.sendBeacon(END, new Blob([body], { type: 'text/plain' }))) return; } catch (x) { /* fall through */ }
      try { fetch(END, { method: 'POST', body: body, keepalive: true, mode: 'no-cors', headers: { 'Content-Type': 'text/plain' } }); } catch (x) { /* offline */ }
    };
    window.rcT = send;

    /* where this visit came from */
    var q = new URLSearchParams(location.search), utm = {};
    ['source', 'medium', 'campaign'].forEach(function (k) { var v = q.get('utm_' + k); if (v) utm[k] = v.slice(0, 40); });
    var classify = function (ref, u) {
      var s = (u && u.source || '').toLowerCase();
      if (s) return /^(fb|facebook|meta)/.test(s) ? 'facebook' : /^(ig|insta)/.test(s) ? 'instagram' : /tiktok/.test(s) ? 'tiktok' : /google|gbp|gmb/.test(s) ? 'google' : /qr|flyer|print|card/.test(s) ? 'qr / print' : s.slice(0, 30);
      var h = ''; try { h = new URL(ref).hostname.replace(/^(www|m|l|lm)\./, ''); } catch (x) { return 'direct'; }
      if (!h) return 'direct';
      if (/wilsonsribcrib\.com$/.test(h)) return 'internal';
      if (/facebook|fb\.|messenger/.test(h)) return 'facebook';
      if (/instagram/.test(h)) return 'instagram';
      if (/tiktok/.test(h)) return 'tiktok';
      if (/google\./.test(h)) return 'google';
      if (/yelp/.test(h)) return 'yelp';
      if (/doordash/.test(h)) return 'doordash';
      return h.slice(0, 30);
    };
    var first = !(ss && ss.getItem('rc_s'));
    if (ss) ss.setItem('rc_s', '1');
    var rc = q.get('rc');
    if (first) {
      var src = rc ? String(rc).slice(0, 30) : classify(document.referrer, utm);
      if (src !== 'internal' && ss) ss.setItem('rc_src', src);
      if (src !== 'internal' && ls) ls.setItem('rc_src', JSON.stringify({ s: src, t: Date.now() }));
    }
    send('pv', { n: first ? 1 : 0, r: first ? document.referrer.slice(0, 200) : '', u: utm, w: screen.width || 0 });

    /* what people tap */
    var label = function (a) {
      var h = a.getAttribute('href') || '';
      if (/^tel:/i.test(h)) return 'call';
      if (/^mailto:/i.test(h)) return 'email';
      if (/^sms:/i.test(h)) return 'call';
      if (/maps\.(google|apple)|google\.[a-z.]+\/maps|goo\.gl\/maps|maps\.app\.goo/i.test(h) || /directions/i.test(a.textContent || '')) return 'directions';
      if (/order\.wilsonsribcrib\.com/i.test(h)) return 'order';
      if (/doordash/i.test(h)) return 'doordash';
      if (/ubereats|uber\.com/i.test(h)) return 'ubereats';
      if (/facebook\.com/i.test(h)) return 'facebook';
      if (/instagram\.com/i.test(h)) return 'instagram';
      if (/tiktok\.com/i.test(h)) return 'tiktok';
      if (/yelp/i.test(h)) return 'yelp';
      if (/review\.html|g\.page|search\.google|writereview/i.test(h)) return 'google_review';
      if (/menu\.html/i.test(h)) return 'menu';
      if (/catering/i.test(h)) return 'catering';
      if (/careers/i.test(h)) return 'careers';
      return '';
    };
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null; if (!a) return;
      var k = label(a); if (!k) return;
      send('click', { k: k });
      /* carry the visit's source to the order site so an order can be credited to Facebook, Google, a flyer… */
      if (k === 'order' && SITE === 'site') {
        try { var u = new URL(a.href); if (!u.searchParams.get('rc')) { u.searchParams.set('rc', (ss && ss.getItem('rc_src')) || 'website'); a.href = u.toString(); } } catch (x) { /* leave link as is */ }
      }
    }, true);

    /* commercials: play, halfway, finished */
    var vname = function (v) { var s = v.currentSrc || v.getAttribute('src') || (v.querySelector('source') || {}).src || ''; return (s.split('/').pop() || 'video').replace(/\.[a-z0-9]+$/i, '').slice(0, 40); };
    document.addEventListener('play', function (ev) { var v = ev.target; if (v.tagName !== 'VIDEO' || v.__rcPlay) return; v.__rcPlay = 1; send('video', { k: vname(v), a: 'play' }); }, true);
    document.addEventListener('timeupdate', function (ev) { var v = ev.target; if (v.tagName !== 'VIDEO' || v.__rcHalf || !v.duration) return; if (v.currentTime / v.duration >= 0.5) { v.__rcHalf = 1; send('video', { k: vname(v), a: 'half' }); } }, true);
    document.addEventListener('ended', function (ev) { var v = ev.target; if (v.tagName !== 'VIDEO' || v.__rcDone) return; v.__rcDone = 1; send('video', { k: vname(v), a: 'done' }); }, true);

    /* the channel to credit when an order is placed (7-day window) */
    window.rcSource = function () {
      try { var j = JSON.parse((ls && ls.getItem('rc_src')) || 'null'); if (j && Date.now() - j.t < 7 * 864e5) return j.s; } catch (x) { /* none */ }
      return (ss && ss.getItem('rc_src')) || 'direct';
    };
  } catch (e) { window.rcT = window.rcT || function () {}; }
})();
