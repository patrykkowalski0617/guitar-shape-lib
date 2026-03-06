import * as S from "./parts";
import { useControlsStore, useSettingsStore } from "@/store";

export default function Header() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);
  const isPianoVisible = useControlsStore((state) => state.isPianoVisible);

  return (
    <S.HeaderWrapper
      $isFullscreen={isFullscreen}
      $isPianoVisible={isPianoVisible}
    >
      <S.HeaderContent>
        <S.TitleWrapper>
          <S.Title>Simple Guitar Shapes</S.Title>
        </S.TitleWrapper>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}
