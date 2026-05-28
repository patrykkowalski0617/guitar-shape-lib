// import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui";
import { useFullscreen } from "./hooks/useFullscreen";

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <Button
      $w={2}
      $variant="outline"
      onClick={() => toggleFullscreen(true)}
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {/* {isFullscreen ? <Minimize /> : <Maximize />} */}
      {isFullscreen
        ? `
      Close Fullscreen
      `
        : "Fullscreen"}
    </Button>
  );
}
