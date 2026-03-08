import styled from "styled-components";
import { commonBpmElementStyles } from "../parts";

export const BpmInput = styled.input`
  ${commonBpmElementStyles}
  cursor: text;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
