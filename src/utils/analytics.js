const isDev = import.meta.env.DEV;

export function initGA(measurementId) {
  // Skip analytics in development
  if (isDev) return;
  
  if (!measurementId) return;
  if (window.gtag) return; // Already initialized

  // Initialize dataLayer and gtag first
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());

  // Load gtag script
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  
  // Wait for script to load before configuring
  gtagScript.onload = () => {
    gtag('config', measurementId, { 
      send_page_view: false,
      page_title: document.title,
      page_location: window.location.href
    });
    
    // Send initial page_view after configuration
    setTimeout(() => {
      const path = window.location.pathname + window.location.search;
      const title = document.title;
      const params = { 
        page_path: path, 
        page_title: title, 
        page_location: window.location.href
      };
      gtag('event', 'page_view', params);
    }, 100);
  };

  document.head.appendChild(gtagScript);
}

export function trackPageview(path, title) {
  if (isDev || !window.gtag) return;
  
  const params = { 
    page_path: path, 
    page_title: title, 
    page_location: window.location.href
  };
  window.gtag('event', 'page_view', params);
}

export function trackEvent(name, params = {}) {
  if (isDev || !window.gtag) return;
  
  window.gtag('event', name, params);
}

export function trackOutboundLink(url, label) {
  trackEvent('click_outbound', {
    destination: url,
    link_text: label,
  });
}
