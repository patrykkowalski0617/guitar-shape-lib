import { Led } from "@/components/ui";

export interface RangeArmedProps {
  isWithinRange: boolean;
}

export const RangeArmed = ({ isWithinRange }: RangeArmedProps) => {
  return <Led $active={isWithinRange}></Led>;
};
