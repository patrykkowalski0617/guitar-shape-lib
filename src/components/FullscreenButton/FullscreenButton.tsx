import { Maximize, Minimize } from "lucide-react";
import { useFullscreen } from "./hooks/useFullscreen";
import * as S from "./parts";

const iconSize = 18;

export function FullscreenButton() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  if (isFullscreen) return null;

  return (
    <S.FullscreenButton
      variant={"default"}
      onClick={() => toggleFullscreen(true)}
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? (
        <Minimize size={iconSize} />
      ) : (
        <Maximize size={iconSize} />
      )}
    </S.FullscreenButton>
  );
}
