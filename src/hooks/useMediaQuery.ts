import { useState, useEffect } from "react";

export const useMediaQuery = (screenBreakpoint: string) => {
  const [isMatching, setIsMatching] = useState(() => {
    return window.matchMedia(screenBreakpoint).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(screenBreakpoint);

    const handleScreenChange = () => {
      setIsMatching(mediaQueryList.matches);
    };

    mediaQueryList.addEventListener("change", handleScreenChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleScreenChange);
    };
  }, [screenBreakpoint]);

  return isMatching;
};
