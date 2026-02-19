import { FooterAndHeaderStyles, SectionCommonCss } from "@/parts";
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  ${FooterAndHeaderStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  font-weight: 400;
  text-shadow:
    0px 0px 20px var(--background),
    0px 0px 20px var(--background);
  ${SectionCommonCss}
`;
