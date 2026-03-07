import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFullscreen } from "./hooks/useFullscreen";
import { ControlWrapper, iconSize } from "../parts";

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <ControlWrapper>
      <Button
        variant={isFullscreen ? "active" : "default"}
        onClick={() => toggleFullscreen(true)}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize size={iconSize} />
        ) : (
          <Maximize size={iconSize} />
        )}
      </Button>
    </ControlWrapper>
  );
}
