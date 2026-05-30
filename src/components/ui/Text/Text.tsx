import styled from "styled-components";
import { color, font, element } from "../tokens";

export const Text = styled.div<{ $w?: number }>`
  background: transparent;
  border: none;
  padding: 2px 0;
  color: ${color.fg};
  font-family: ${font.family};
  font-size: ${font.lg};
  font-weight: ${font.normal};
  height: ${element.heightLg};
  min-width: ${({ $w = 2 }) => `calc(${element.buttonUnit} * ${$w})`};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
