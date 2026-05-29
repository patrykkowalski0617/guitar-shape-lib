import { Button } from "@/components/ui";
import { useFullscreen } from "./hooks/useFullscreen";

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <Button
      $variant="side"
      onClick={() => toggleFullscreen(true)}
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen
        ? `
      Close Fullscreen
      `
        : "Fullscreen"}
    </Button>
  );
}
