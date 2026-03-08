import { useSettingsStore } from "@/store";
import * as S from "./parts";

export default function Footer() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);

  return (
    <S.FooterWrapper $isFullscreen={isFullscreen}>
      <p>&copy; Interactive Image</p>
    </S.FooterWrapper>
  );
}
