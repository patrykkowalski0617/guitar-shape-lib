import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
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
`;
