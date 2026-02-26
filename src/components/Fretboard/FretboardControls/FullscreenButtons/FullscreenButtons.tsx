import { Maximize, Minimize, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFullscreen } from "./hooks/useFullscreen";

const iconSize = 14;

export function FullscreenRotateButton() {
  const { isRotated, toggleFullscreen } = useFullscreen();

  return (
    <Button variant="outline" className="md:hidden" onClick={() => toggleFullscreen(true)} title="Fullscreen & Rotate">
      <Smartphone size={iconSize} className={isRotated ? "rotate-0" : "rotate-90"} />
    </Button>
  );
}

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <Button
      variant="outline"
      onClick={() => toggleFullscreen(false)}
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? <Minimize size={iconSize} /> : <Maximize size={iconSize} />}
    </Button>
  );
}
