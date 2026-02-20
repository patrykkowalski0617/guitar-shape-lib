import { FooterAndHeaderStyles, SectionCommonCss } from "@/parts";
import styled, { css } from "styled-components";

export const FooterWrapper = styled.footer<{ $isHidden: boolean }>`
  ${FooterAndHeaderStyles}
  height: 50px;
  max-height: 50px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  font-weight: 400;
  text-shadow:
    0px 0px 20px var(--background),
    0px 0px 20px var(--background);
  ${SectionCommonCss}
  ${({ $isHidden }) =>
    $isHidden &&
    css`
      max-height: 0;
      opacity: 0;
    `}
`;
