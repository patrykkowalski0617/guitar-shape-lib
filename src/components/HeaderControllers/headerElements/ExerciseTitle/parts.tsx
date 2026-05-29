import { EditableText as _EditableText, space } from "@/components/ui";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  padding: 0 ${space._8};
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  > * {
    grid-area: 1 / 1;
  }

  @media (min-width: 1001px) {
    display: inline-grid;
    width: unset;
    margin: unset;
  }
`;

export const HiddenText = styled.span`
  visibility: hidden;
  white-space: pre;
  padding: inherit;
  border: inherit;
  font: inherit;
  letter-spacing: inherit;
  min-width: 200px;
  width: 100%;
`;

export const EditableText = styled(_EditableText)`
  width: 100%;
  min-width: 200px;
`;
