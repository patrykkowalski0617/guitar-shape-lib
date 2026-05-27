import styled from "styled-components";
import { color, font, element, duration, disabledState } from "../tokens";

export const EditableText = styled.input<{ $w?: number }>`
  background: transparent;
  border: none;
  border-bottom: 1px dashed ${color.border};
  border-radius: 0;
  padding: 2px 0;
  color: ${color.fg};
  font-family: ${font.family};
  font-size: ${font.md};
  font-weight: ${font.normal};
  outline: none;
  cursor: pointer;
  height: ${element.heightLg};
  min-width: ${({ $w = 2 }) => `calc(${element.buttonUnit} * ${$w})`};
  transition: border-bottom-color ${duration.crawl} ease;
  text-align: center;
  &:hover:not(:focus) {
    transition: none;
    border-bottom-color: ${color.borderHover};
  }

  &:focus {
    transition: none;
    border-bottom-color: ${color.borderHover};
    border-bottom-style: solid;
    cursor: text;
  }

  ${disabledState}
`;
