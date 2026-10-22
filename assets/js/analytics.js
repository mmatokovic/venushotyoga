(function () {

  'use strict';

  const script = document.currentScript;
  const id = script.dataset.id;
  const navigationEvent = script.dataset.event;
  const key = 'analytics-consent';
  let loaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  const choice = function () {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

  const remember = function (value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      return;
    }
  };

  const load = function () {
    if (loaded) {
      return;
    }
    loaded = true;
    gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'});
    gtag('js', new Date());
    gtag('config', id, {send_page_view: false});
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(tag);
  };

  const pageView = function () {
    if (loaded && (choice() === 'granted')) {
      gtag('event', 'page_view', {page_location: location.href, page_title: document.title});
    }
  };

  const banner = function (show) {
    const el = document.getElementById('consent-banner');
    if (el) {
      el.hidden = !show;
    }
  };

  const clearCookies = function () {
    const parts = location.hostname.split('.');
    document.cookie.split(';').forEach(function (cookie) {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('_ga')) {
        return;
      }
      for (let i = 0; i < parts.length; i++) {
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + parts.slice(i).join('.');
      }
      document.cookie = name + '=; Max-Age=0; path=/';
    });
  };

  document.addEventListener(navigationEvent, function () {
    if (choice() === 'granted') {
      load();
    }
    pageView();
    banner(choice() === null);
  });

  document.addEventListener('click', function (event) {
    const button = event.target.closest('[data-consent]');
    if (!button) {
      return;
    }
    const action = button.dataset.consent;
    if (action === 'open') {
      banner(true);
      return;
    }
    remember(action);
    banner(false);
    if (action === 'granted') {
      if (loaded) {
        gtag('consent', 'update', {analytics_storage: 'granted'});
      } else {
        load();
        pageView();
      }
    } else {
      if (loaded) {
        gtag('consent', 'update', {analytics_storage: 'denied'});
      }
      clearCookies();
    }
  });

})();
