import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";
import { PlayerElementHeight } from "../parts";

export const BasePlayerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${instrumentElBRadius};
  height: ${PlayerElementHeight};
  width: 30px;
  color: var(--primary-foreground);
  border: none;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 700;

  &:disabled {
    opacity: 0.5;
  }
`;

export const DashedButton = styled(BasePlayerButton)`
  color: var(--muted-foreground);
  border: 1px dashed color-mix(in oklab, var(--border) 50%, var(--background));
  background-color: color-mix(in oklab, var(--muted) 20%, var(--background));

  &:hover {
    background-color: color-mix(in oklab, var(--muted) 50%, var(--background));
    color: var(--foreground);
  }
`;

export const OutlineButton = styled(BasePlayerButton)<{ $isPrimary?: boolean }>`
  border: 1px solid ${({ $isPrimary }) => ($isPrimary ? "var(--primary)" : "var(--accent-foreground)")};
  color: ${({ $isPrimary }) => ($isPrimary ? "var(--primary)" : "var(--accent-foreground)")};
  background-color: color-mix(in oklab, var(--muted) 20%, var(--background));

  &:hover {
    background-color: color-mix(in oklab, var(--muted) 50%, var(--background));
  }
`;

export const SolidButton = styled(BasePlayerButton)`
  background-color: color-mix(in oklab, var(--accent) 70%, var(--background));

  &:hover {
    background-color: color-mix(in oklab, var(--accent) 90%, var(--background));
  }
`;
