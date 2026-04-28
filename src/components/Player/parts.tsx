import styled from "styled-components";
import { instrumentElBRadius } from "../Piano/PianoKey/parts/constants";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  max-width: 1400px;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    margin: auto;
  }
  @media (min-width: 1400px) {
    width: 100%;
  }
`;

export const PlayerSection = styled.div`
  background-color: color-mix(in oklab, var(--muted) 30%, transparent);
  border-radius: ${instrumentElBRadius};
  padding: 8px 8px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-direction: row;
  width: 100%;
  flex: 1 1 0;
  box-shadow:
    3px 3px 4px 1px color-mix(in oklab, var(--background) 90%, transparent)
      inset,
    -1px -1px 1px 0px color-mix(in oklab, var(--foreground) 30%, transparent)
      inset;

  &:last-child {
    justify-content: center;
    flex: 0 0 0;
  }
`;
