import { FooterAndHeaderStyles } from "@/parts";
import styled from "styled-components";

export const FooterWrapper = styled.footer<{ $isFullscreen: boolean; $isPianoVisable: boolean }>`
  ${FooterAndHeaderStyles}

  height: 50px;
  max-height: 50px;
  font-weight: 400;
  text-shadow:
    0px 0px 20px var(--background),
    0px 0px 20px var(--background);

  @media (min-width: 1600px) {
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }
`;
