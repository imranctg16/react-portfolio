const isDev = import.meta.env.DEV;

export function initGA(measurementId) {
  if (!measurementId) return;
  if (window.gtag) return; // Already initialized

  // Load gtag script
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(gtagScript);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { send_page_view: false, debug_mode: isDev });
  // Send initial page_view
  try {
    const path = window.location.pathname + window.location.search;
    const title = document.title;
    const params = { page_path: path, page_title: title, debug_mode: isDev };
    gtag('event', 'page_view', params);
    if (isDev) console.debug('[GA] page_view', params);
  } catch {}
}

export function trackPageview(path, title) {
  if (!window.gtag) return;
  const params = { page_path: path, page_title: title, debug_mode: isDev };
  window.gtag('event', 'page_view', params);
  if (isDev) console.debug('[GA] page_view', params);
}

export function trackEvent(name, params = {}) {
  if (!window.gtag) return;
  const payload = { ...params, debug_mode: isDev };
  window.gtag('event', name, payload);
  if (isDev) console.debug(`[GA] ${name}`, payload);
}

export function trackOutboundLink(url, label) {
  trackEvent('click_outbound', {
    destination: url,
    link_text: label,
  });
}
