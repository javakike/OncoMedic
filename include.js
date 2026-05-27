/**
 * include.js — Tiny HTML partial loader
 * Finds every <div data-include="path/to/file.html"></div>
 * and replaces it with the fetched HTML.
 *
 * Resolves a Promise (window.includesReady) when all partials are loaded,
 * so script.js can safely run its initialization afterwards.
 *
 * NOTE: Because this uses fetch(), the page MUST be served over HTTP.
 *       Use VS Code "Live Server" extension, or run:  npx serve .
 *       Opening index.html with file:// will NOT work.
 */
(function () {
  const loadPartial = async (el) => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const html = await res.text();
      // Use a template so we can move child nodes (preserving scripts/structure)
      const tpl = document.createElement('template');
      tpl.innerHTML = html.trim();
      el.replaceWith(tpl.content);
    } catch (err) {
      console.error(`[include] Failed to load ${url}:`, err);
      el.innerHTML = `<div style="padding:1rem;color:#b91c1c;background:#fee;border:1px solid #fca5a5;border-radius:8px;font-family:monospace">
        ⚠️ No se pudo cargar <strong>${url}</strong>.<br/>
        Sirve el sitio con un servidor local (Live Server o <code>npx serve .</code>).
      </div>`;
    }
  };

  window.includesReady = (async () => {
    const nodes = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(nodes.map(loadPartial));
    // Notify listeners (script.js waits on this event)
    document.dispatchEvent(new CustomEvent('includes:ready'));
  })();
})();
