import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  max-width: 1300px;
  @media (min-width: 768px) {
    padding: 0 35px;
    flex-direction: row;
    margin: auto;
  }
`;

export const PlayerSection = styled.div`
  background-color: color-mix(in oklab, var(--muted) 30%, transparent);
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
      flex-shrink: 1;
      width: auto;
      min-width: 0;
      overflow: hidden;
    }

    &:last-child {
      flex-grow: 0;
      flex-shrink: 0;
      width: auto;
    }
  }
`;
