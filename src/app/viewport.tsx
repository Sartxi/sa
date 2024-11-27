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