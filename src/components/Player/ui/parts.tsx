import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const playerElementHeight = "30px";
export const playerElementWidth = "35px";

export const BasePlayerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${instrumentElBRadius};
  height: ${playerElementHeight};
  width: 35px;
  color: var(--primary-foreground);
  border: none;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 700;

  &:disabled {
    opacity: 0.5;
  }
`;

export const DashedButton = styled(BasePlayerButton)`
  color: var(--foreground);
  border: 1px dashed var(--border);
  background-color: color-mix(in oklab, var(--muted) 10%, var(--background));

  &:hover {
    background-color: color-mix(in oklab, var(--muted) 30%, var(--background));
    color: var(--foreground);
  }
`;

export const OutlineButton = styled(BasePlayerButton)<{ $isPrimary?: boolean }>`
  border: 1px solid ${({ $isPrimary }) => ($isPrimary ? "var(--primary)" : "var(--accent-foreground)")};
  color: ${({ $isPrimary }) => ($isPrimary ? "var(--primary)" : "var(--accent-foreground)")};
  background-color: color-mix(in oklab, var(--muted) 10%, var(--background));

  &:hover {
    background-color: color-mix(in oklab, var(--muted) 30%, var(--background));
  }
`;

export const SolidButton = styled(BasePlayerButton)`
  background-color: color-mix(in oklab, var(--accent) 90%, var(--background));
  color: var(--foreground);
  &:hover {
    background-color: var(--accent);
  }
`;
