import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFullscreen } from "./hooks/useFullscreen";
import { ControlWrapper, iconSize } from "../parts";

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <ControlWrapper>
      <Button
        variant={isFullscreen ? "active" : "outline"}
        onClick={() => toggleFullscreen(true)}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        <span className="flex items-center justify-center">
          {isFullscreen ? (
            <Minimize size={iconSize} />
          ) : (
            <Maximize size={iconSize} />
          )}
        </span>
      </Button>
    </ControlWrapper>
  );
}
