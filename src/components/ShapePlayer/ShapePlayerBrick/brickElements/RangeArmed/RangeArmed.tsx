import * as S from "./parts";

export interface RangeArmedProps {
  isWithinRange: boolean;
}

export const RangeArmed = ({ isWithinRange }: RangeArmedProps) => {
  return <S.RangeArmed $isWithinRange={isWithinRange}></S.RangeArmed>;
};
