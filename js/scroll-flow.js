(() => {
  document.documentElement.classList.add('native-scroll');

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const startsFromSharedLink = location.hash && !sessionStorage.getItem('allowAnchorStart');

  if (startsFromSharedLink) {
    history.replaceState(null, '', location.pathname + location.search);
  }

  const scrollToTop = () => window.scrollTo(0, 0);

  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(scrollToTop);
  });

  window.addEventListener('pageshow', scrollToTop);

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    sessionStorage.setItem('allowAnchorStart', '1');
    window.setTimeout(() => sessionStorage.removeItem('allowAnchorStart'), 1000);
  });
})();
