import { useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function FullscreenButton() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);
  const setIsFullscreen = useSettingsStore((state) => state.setIsFullscreen);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      if (!isNowFullscreen && "orientation" in screen) {
        screen.orientation.unlock();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [setIsFullscreen]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();

        const isMobile = window.innerWidth <= 768;

        if (isMobile && "orientation" in screen && "lock" in screen.orientation) {
          await (screen.orientation as ScreenOrientationWithLock).lock("landscape").catch((err: unknown) => {
            console.warn("Nie udało się zablokować orientacji:", err);
          });
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Fullscreen Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="fixed bottom-2 right-2 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFullscreen}
        className="flex items-center justify-center h-8 w-8 rounded-full shadow-lg border border-foreground bg-background/60 backdrop-blur-sm hover:scale-110 transition-transform"
        title={isFullscreen ? "Close fullscreen" : "Fullscreen"}
      >
        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
      </Button>
    </div>
  );
}
