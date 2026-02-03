import { FooterAndHeaderStyles, SectionCommonCss } from "@/parts";
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  ${FooterAndHeaderStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  font-weight: bold;
  text-shadow: 0 0 15px var(--background);
  ${SectionCommonCss}
`;
