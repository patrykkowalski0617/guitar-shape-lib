import { useControlsStore, useSettingsStore } from "@/store";
import * as S from "./parts";

export default function Footer() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);
  const isPianoVisable = useControlsStore((state) => state.isPianoVisable);

  return (
    <S.FooterWrapper $isFullscreen={isFullscreen} $isPianoVisable={isPianoVisable}>
      <p>&copy; Interactive Image</p>
    </S.FooterWrapper>
  );
}
