import styled, { css } from "styled-components";
import {
  playerElementCommon,
  playerElementHeight,
  playerElementWidth,
} from "../../constants";
import { Button } from "@/components/ui/button";
import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";

const commonBpmElementStyles = css`
  background-color: color-mix(in oklab, var(--primary) 40%, var(--muted));
  border: 1px solid var(--border);
  border-radius: ${instrumentElBRadius};
  color: var(--background);

  height: ${playerElementHeight};
  width: ${playerElementWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  text-shadow: 1px 1px 0 color-mix(in oklab, var(--background) 50%, transparent);
  ${playerElementCommon}
  &:hover {
    background-color: color-mix(in oklab, var(--primary) 70%, var(--muted));
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

export const BpmButton = styled(Button)`
  ${commonBpmElementStyles}
  padding: 0;
  appearance: none;
  border-style: solid;
  &:disabled {
    opacity: 0.5;
  }
`;

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
