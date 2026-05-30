import { color, duration } from "@/components/ui";
import styled from "styled-components";

export const GlowContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;

  .glow-particle {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 1px;
    background-color: ${color.primary};
    box-shadow: 0 0 9px 1px ${color.secondary};
    pointer-events: none;
    animation: radialGlowEffect ${duration.crawl} ease-out forwards;
  }

  @keyframes radialGlowEffect {
    0% {
      width: 0;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      width: 1400px;
      opacity: 0;
    }
  }
`;
