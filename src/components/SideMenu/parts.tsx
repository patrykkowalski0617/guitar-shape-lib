import styled, { keyframes } from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import {
  color,
  duration,
  space,
  elementBase,
  disabledState,
  hoverGlow,
  element,
} from "@/components/ui";

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(100%); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 500;
  background: color-mix(in oklab, var(--void) 60%, transparent);

  &[data-state="open"] {
    animation: ${fadeIn} ${duration.base} ease;
  }
  &[data-state="closed"] {
    animation: ${fadeOut} ${duration.base} ease;
  }
`;

export const Panel = styled(Dialog.Content)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 501;
  width: 260px;
  background: ${color.surface};
  border-left: 1px solid ${color.border};
  display: flex;
  flex-direction: column;
  padding: ${space._4} 0;
  outline: none;

  &[data-state="open"] {
    animation: ${slideIn} ${duration.base} ease;
  }
  &[data-state="closed"] {
    animation: ${slideOut} ${duration.base} ease;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space._2};
  padding: ${space._2} ${space._3};

  & + & {
    border-top: 1px solid ${color.border};
    margin-top: ${space._2};
    padding-top: ${space._4};
  }
`;

export const HamburgerButton = styled.button<{ $w?: number }>`
  ${elementBase}
  ${hoverGlow()}
  ${disabledState}
  background:   transparent;
  border-color: transparent;
  color: ${color.fg};
  padding: 0 ${space._2};
  width: ${element.buttonUnit};
  position: fixed;
  top: ${space._3};
  right: ${space._3};
`;
