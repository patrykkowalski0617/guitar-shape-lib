import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  width: 100%;
  max-width: 1300px;
  padding: 0 35px;
  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 1230px;
    margin: auto;
  }
`;

export const PlayerSection = styled.div`
  background-color: color-mix(in oklab, var(--muted) 10%, transparent);
  border-radius: ${instrumentElBRadius};
  padding: 6px 12px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-direction: row;
  width: 100%;

  @media (min-width: 768px) {
    &:first-child {
      flex-grow: 1;
      width: auto;
    }

    &:last-child {
      flex-grow: 0;
      width: auto;
      flex-shrink: 0;
    }
  }
`;
