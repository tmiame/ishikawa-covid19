import { useState, useEffect } from 'react';

export const MQ_TRIGGER = {
  XS: 350,
  S: 400,
  XT: 700,
  T: 920,
  M: 1200,
  L: 1580,
  XL: 1904,
};

export default function useResize() {
  const [windowWidth, setWindowWidth] = useState(0);

  function handleWindowChange() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    handleWindowChange();
    window.addEventListener('resize', handleWindowChange);
    return () => {
      window.removeEventListener('resize', handleWindowChange);
    };
  });

  return windowWidth;
}

export function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function useMqMin(trigger: 'S' | 'XT' | 'T' | 'M' | 'L' | 'XL') {
  const size = useWindowSize();

  function getBreakpoint() {
    if (!size.width) {
      return false;
    }

    if (trigger === 'S') {
      return size.width > MQ_TRIGGER.XS;
    } else if (trigger === 'XT') {
      return size.width > MQ_TRIGGER.S;
    } else if (trigger === 'T') {
      return size.width > MQ_TRIGGER.XT;
    } else if (trigger === 'M') {
      return size.width > MQ_TRIGGER.T;
    } else if (trigger === 'L') {
      return size.width > MQ_TRIGGER.M;
    } else if (trigger === 'XL') {
      return size.width > MQ_TRIGGER.L;
    }

    return false;
  }

  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    setBreakpoint(getBreakpoint);
  }, [size]);

  return breakpoint;
}
