import {
  EditableText as _EditableText,
  breakPoint,
  space,
} from "@/components/ui";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: inline-grid;
  align-items: center;
  margin: 0 ${space._8};
  width: 100%;
  ${breakPoint.desktop(css`
    width: unset;
  `)}
  > * {
    grid-area: 1 / 1;
  }
`;

export const HiddenText = styled.span`
  visibility: hidden;
  white-space: pre;
  padding: inherit;
  border: inherit;
  font: inherit;
  letter-spacing: inherit;
  min-width: 100px;
`;

export const EditableText = styled(_EditableText)`
  width: 100%;
  min-width: 200px;
  min-width: 80px;
`;
