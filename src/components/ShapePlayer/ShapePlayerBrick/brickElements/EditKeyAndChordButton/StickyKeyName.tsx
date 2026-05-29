import { useStickyScroll } from "@/hooks/useStickyScroll";
import * as S from "./parts";

interface StickyKeyNameProps {
  $isDuplicateKey: boolean;
  $index: number;
  children: React.ReactNode;
  top?: number;
}

export const StickyKeyName = ({
  $isDuplicateKey,
  $index,
  children,
  top = 0,
}: StickyKeyNameProps) => {
  const ref = useStickyScroll(top);

  return (
    <S.KeyName
      ref={ref as React.RefObject<HTMLSpanElement>}
      $isDuplicateKey={$isDuplicateKey}
      $index={$index}
    >
      {children}
    </S.KeyName>
  );
};
