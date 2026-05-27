import styled, { css } from "styled-components";
import { color, elementBase } from "../tokens";
import { hoverGlow } from "../animations";

type Variant = "default" | "ghost" | "active";

const variantStyles = {
  default: css`
    background: ${color.surface};
    color: ${color.fg};
  `,
  ghost: css`
    background: transparent;
    border-color: transparent;
    color: ${color.fgMuted};

    &:hover:not(:disabled) {
      color: ${color.fg};
      background: ${color.surface};
    }
  `,
  active: css`
    background: color-mix(in oklab, ${color.primary} 12%, ${color.surface});
    border-color: color-mix(in oklab, ${color.primary} 45%, transparent);
    color: ${color.primary};
  `,
};

export const Button = styled.button<{ $variant?: Variant; $w?: number }>`
  ${elementBase}
  ${({ $variant = "default" }) => variantStyles[$variant]}
  ${hoverGlow}

  &:focus-visible {
    outline: 2px solid ${color.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.38;
    pointer-events: none;
  }
`;

Button.defaultProps = {
  $variant: "default",
  $w: 2,
};
