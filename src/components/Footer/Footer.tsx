import { useControlsStore, useSettingsStore } from "@/store";
import * as S from "./parts";

export default function Footer() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);
  const isPianoVisible = useControlsStore((state) => state.isPianoVisible);

  return (
    <S.FooterWrapper $isFullscreen={isFullscreen} $isPianoVisible={isPianoVisible}>
      <p>&copy; Interactive Image</p>
    </S.FooterWrapper>
  );
}
