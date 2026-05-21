import styled from "styled-components";
import { elementBase } from "@/components/ui/constants";
interface BpmInputProps {
  $widthMultiplier?: number;
}

export const BpmInput = styled.input<BpmInputProps>`
  ${elementBase}
  cursor: text;
  color: white;
  width: 100px;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
