import { useEffect, useCallback } from "react";
import { useSettingsStore } from "@/store";

interface ScreenOrientationWithLock extends ScreenOrientation {
  lock(
    orientation:
      | "any"
      | "natural"
      | "landscape"
      | "portrait"
      | "portrait-primary"
      | "portrait-secondary"
      | "landscape-primary"
      | "landscape-secondary",
  ): Promise<void>;
}

export function useFullscreen() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);
  const setIsFullscreen = useSettingsStore((state) => state.setIsFullscreen);
  const isRotated = useSettingsStore((state) => state.isRotated);
  const setIsRotated = useSettingsStore((state) => state.setIsRotated);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      if (!isNowFullscreen && "orientation" in screen) {
        screen.orientation.unlock();
        setIsRotated(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [setIsFullscreen, setIsRotated]);

  const toggleFullscreen = useCallback(
    async (shouldRotate: boolean = false) => {
      const isNowFS = !!document.fullscreenElement;
      const currentIsRotated = useSettingsStore.getState().isRotated;

      try {
        if (!isNowFS) {
          await document.documentElement.requestFullscreen();

          if (shouldRotate) {
            setIsRotated(true);

            if ("orientation" in screen && "lock" in screen.orientation) {
              await (screen.orientation as ScreenOrientationWithLock)
                .lock("landscape")
                .catch((err) => console.warn("Orientation lock rejected (DevTools):", err));
            }
          }
        } else {
          if (!shouldRotate || currentIsRotated) {
            if (document.exitFullscreen) {
              await document.exitFullscreen();
            }
          } else {
            setIsRotated(true);
            if ("orientation" in screen && "lock" in screen.orientation) {
              await (screen.orientation as ScreenOrientationWithLock).lock("landscape").catch(() => {});
            }
          }
        }
      } catch (err) {
        console.error("Fullscreen Error:", err);
      }
    },
    [setIsRotated],
  );

  return { isFullscreen, isRotated, toggleFullscreen };
}
