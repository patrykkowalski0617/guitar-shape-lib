import { useSettingsStore } from "@/store/useSettingsStore";
import * as S from "./parts";

export default function Footer() {
  const isFullscreen = useSettingsStore((state) => state.isFullscreen);

  return (
    <S.FooterWrapper $isHidden={isFullscreen}>
      <p>&copy; P. Asp</p>
    </S.FooterWrapper>
  );
}
