import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  max-width: 1300px;
  padding-top: calc(var(--spacing) * 4);
  @media (min-width: 1024px) {
    padding-left: 35px;
    padding-right: 35px;
    flex-direction: row;
    margin: auto;
  }
`;

export const PlayerSection = styled.div`
  background-color: color-mix(in oklab, var(--muted) 30%, transparent);
  border-radius: ${instrumentElBRadius};
  padding: 6px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-direction: row;
  width: 100%;
  &:last-child {
    background-color: transparent;
    justify-content: center;
  }

  @media (min-width: 768px) {
    &:last-child {
      justify-content: flex-end;
    }
  }
  @media (min-width: 1024px) {
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
      background-color: color-mix(in oklab, var(--muted) 30%, transparent);
      justify-content: center;
      padding-right: 12px;
    }
  }
`;
