import { useState, useCallback, useEffect } from "react";

export const useWakeLock = () => {
  const [isActive, setIsActive] = useState(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const requestWakeLock = useCallback(async () => {
    if (!("wakeLock" in navigator)) {
      console.warn("Wake Lock API is not supported in this browser.");
      return;
    }

    try {
      const sentinel = await navigator.wakeLock.request("screen");

      sentinel.addEventListener("release", () => {
        setIsActive(false);
        setWakeLock(null);
      });

      setWakeLock(sentinel);
      setIsActive(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`${err.name}: ${err.message}`);
      } else {
        console.error("An unexpected error occurred while locking the screen.");
      }
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (wakeLock) {
      try {
        await wakeLock.release();
        setWakeLock(null);
        setIsActive(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
  }, [wakeLock]);

  const toggleWakeLock = useCallback(() => {
    if (isActive) {
      releaseWakeLock();
    } else {
      requestWakeLock();
    }
  }, [isActive, releaseWakeLock, requestWakeLock]);

  useEffect(() => {
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
      }
    };
  }, [wakeLock]);

  return { isActive, toggleWakeLock };
};
