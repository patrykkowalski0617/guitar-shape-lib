import { Maximize, Minimize } from "lucide-react";
import { useFullscreen } from "./hooks/useFullscreen";
import { Button } from "@/components/ui";

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <Button
      $variant="outline"
      onClick={() => toggleFullscreen(true)}
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
    </Button>
  );
}
