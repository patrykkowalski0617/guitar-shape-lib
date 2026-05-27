import {
  EditableText as _EditableText,
  breakPoint,
  space,
} from "@/components/ui";
import styled, { css } from "styled-components";

export const EditableText = styled(_EditableText)`
  margin: 0 ${space._8};
  width: 100%;
  ${breakPoint.desktop(css`
    width: unset;
  `)}
`;
