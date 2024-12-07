import { useState, useEffect } from 'react';

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function useMedia() {
  const [width, setWidth] = useState(0);
  const [isDevice, setIsDevice] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    if (typeof window !== 'undefined') {
      setIsDevice(isMobileDevice());

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const mobile = isDevice && width <= 599;
  const tablet = isDevice && width >= 600 && width <= 1199;

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
