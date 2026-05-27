import styled from "styled-components";
import { color, elementBase, disabledState } from "../tokens";
import { hoverGlow } from "../animations";

export const NumberInput = styled.input<{ $w?: number }>`
  ${elementBase}
  ${hoverGlow()}
  ${disabledState}
  background: ${color.surface};
  color: ${color.fg};
  cursor: ns-resize;
  text-align: center;

  &:focus {
    cursor: text;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;
