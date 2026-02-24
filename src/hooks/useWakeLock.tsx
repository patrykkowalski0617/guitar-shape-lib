import { useState, useCallback, useEffect } from "react";

export const useWakeLock = () => {
  const [isActive, setIsActive] = useState(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  // Deklaracja funkcji żądającej blokady
  const requestWakeLock = useCallback(async () => {
    if (!("wakeLock" in navigator)) {
      console.warn("Wake Lock API nie jest wspierane w tej przeglądarce.");
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
        console.error("Wystąpił nieoczekiwany błąd podczas blokowania ekranu.");
      }
    }
  }, []);

  // Deklaracja funkcji zwalniającej blokadę
  const releaseWakeLock = useCallback(async () => {
    if (wakeLock) {
      try {
        await wakeLock.release();
        setWakeLock(null);
        setIsActive(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Błąd podczas zwalniania: ${err.message}`);
        }
      }
    }
  }, [wakeLock]);

  // Funkcja przełączająca (Logika if/else zamiast ternary dla ESLint)
  const toggleWakeLock = useCallback(() => {
    if (isActive) {
      releaseWakeLock();
    } else {
      requestWakeLock();
    }
  }, [isActive, releaseWakeLock, requestWakeLock]);

  // Automatyczne czyszczenie przy odmontowaniu
  useEffect(() => {
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {
          /* Ignoruj błędy przy odmontowaniu */
        });
      }
    };
  }, [wakeLock]);

  return { isActive, toggleWakeLock };
};
