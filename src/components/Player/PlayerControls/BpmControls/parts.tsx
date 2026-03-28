import styled, { css } from "styled-components";
import { playerElementHeight, playerElementWidth } from "../../constants";
import { Button } from "@/components/ui/button";
import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts";

const commonBpmElementStyles = css`
  background-color: color-mix(in oklab, var(--accent) 10%, var(--background));
  border: 1px solid var(--border);
  border-radius: ${instrumentElBRadius};
  color: var(--foreground);
  height: ${playerElementHeight};
  width: ${playerElementWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    background-color: color-mix(in oklab, var(--accent) 30%, var(--background));
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
