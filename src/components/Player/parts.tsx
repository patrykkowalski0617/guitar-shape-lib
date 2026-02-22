import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  background-color: color-mix(in oklab, var(--muted) 10%, transparent);
  padding: 6px 12px;
  border-radius: ${instrumentElBRadius};
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1230px;
    margin: auto;
  }
`;
