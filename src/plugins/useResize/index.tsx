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

export function useMqMin(trigger: 'S' | 'XT' | 'T' | 'M' | 'L' | 'XL') {
  const windowWidth = useResize();

  function getBreakpoint() {
    if (trigger === 'S') {
      return windowWidth > MQ_TRIGGER.XS;
    } else if (trigger === 'XT') {
      return windowWidth > MQ_TRIGGER.S;
    } else if (trigger === 'T') {
      return windowWidth > MQ_TRIGGER.XT;
    } else if (trigger === 'M') {
      return windowWidth > MQ_TRIGGER.T;
    } else if (trigger === 'L') {
      return windowWidth > MQ_TRIGGER.M;
    } else if (trigger === 'XL') {
      return windowWidth > MQ_TRIGGER.L;
    }

    return false;
  }

  const [breakpoint, setbreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    setbreakpoint(getBreakpoint());
  }, [windowWidth]);

  return breakpoint;
}
