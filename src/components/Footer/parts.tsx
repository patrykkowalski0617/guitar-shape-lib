import { SectionCommonCss } from "@/parts";
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  width: 100%;
  background-color: color-mix(in oklab, var(--primary) 80%, #333);
  max-width: 1500px;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  font-weight: bold;
  text-shadow: 0 0 15px var(--background);
  ${SectionCommonCss}
`;
