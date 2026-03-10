import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  max-width: 1300px;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    flex-direction: row;
    margin: auto;
    padding: 0 20px;
  }
  @media (min-width: 1300px) {
    padding: 0 35px;
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
  &:last-child {
    justify-content: center;
  }

  @media (min-width: 768px) {
    &:first-child {
      width: 100%;
    }
    &:nth-child(2),
    &:last-child {
      flex: 1 1 0;
      justify-content: center;
    }
  }
  @media (min-width: 1024px) {
    flex: 1 1 0;
    &:nth-child(2),
    &:last-child {
      flex: 0 0 0;
    }
  }
`;
