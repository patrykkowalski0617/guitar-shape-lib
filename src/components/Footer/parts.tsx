import { SectionCommonCss } from "@/parts";
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 100%;
  background-color: var(--primary);
  max-width: 1300px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  ${SectionCommonCss}
`;
