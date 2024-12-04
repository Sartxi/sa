import { useState, useEffect } from 'react';

export function useMedia() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const mobile = width <= 599;
  const tablet = width >= 600 && width <= 1199;

  return { mobile, tablet };
}

export function useClickOutside(el: string, enabled: any, callback: () => void) {
  return useEffect(() => {
    const handleCloseOnClick = (e: any) => {
      const closeEl = document.getElementById(el);
      if (enabled && !closeEl?.contains(e.target)) callback();
    }
    document.addEventListener('click', handleCloseOnClick);
    return () => document.removeEventListener('click', handleCloseOnClick);
  }, [enabled]);
}
