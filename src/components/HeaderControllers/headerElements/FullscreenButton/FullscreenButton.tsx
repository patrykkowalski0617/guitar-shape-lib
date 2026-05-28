// import { Maximize, Minimize } from "lucide-react";
import { useFullscreen } from "./hooks/useFullscreen";
import * as S from "./parts";

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <S.Button
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
    </S.Button>
  );
}
