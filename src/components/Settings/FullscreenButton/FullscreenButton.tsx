import { useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store";

export default function FullscreenButton() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);
  const setIsFullscreen = useSettingsStore((state) => state.setIsFullscreen);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error(`Fullscreen Error: ${err}`);
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
