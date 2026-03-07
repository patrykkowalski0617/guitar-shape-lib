import * as S from "./parts";
import { useSettingsStore } from "@/store";

export default function Header() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);

  return (
    <S.HeaderWrapper $isFullscreen={isFullscreen}>
      <S.HeaderContent>
        <S.TitleWrapper>
          <S.Title>Simple Guitar Shapes</S.Title>
        </S.TitleWrapper>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}
