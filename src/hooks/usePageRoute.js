import { useEffect, useState } from 'react';

const readRoute = () => {
  const match = window.location.hash.match(/^#\/projects\/([^/]+)\/?$/);
  return match ? { page: 'project', slug: match[1] } : { page: 'home', slug: null };
};

export default function usePageRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    if (route.page === 'project') window.scrollTo({ top: 0, behavior: 'instant' });
    else {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) requestAnimationFrame(() => {
        const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset) });
      });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [route.page, route.slug]);
  return route;
}
