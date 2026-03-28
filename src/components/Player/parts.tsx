import styled from "styled-components";
import { instrumentElBRadius } from "../Piano/PianoKey/parts";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  max-width: 1390px;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 1024px) {
    flex-direction: row;
    margin: auto;
  }
  @media (min-width: 1390px) {
    width: 100%;
  }
`;

export const PlayerSection = styled.div`
  background-color: color-mix(in oklab, var(--muted) 30%, transparent);
  border-radius: ${instrumentElBRadius};
  padding: 6px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-direction: row;
  width: 100%;
  flex: 1 1 0;
  &:last-child {
    justify-content: center;
    flex: 0 0 0;
  }
`;
