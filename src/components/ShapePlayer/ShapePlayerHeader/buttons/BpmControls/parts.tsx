import styled from "styled-components";
import { Button } from "../../../ui/parts";
import { elementBase } from "@/components/ShapePlayer/ui/constants";

export const BpmButton = styled(Button)`
  padding: 0;
  appearance: none;
  border-style: solid;
  &:disabled {
    opacity: 0.5;
  }
`;

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
