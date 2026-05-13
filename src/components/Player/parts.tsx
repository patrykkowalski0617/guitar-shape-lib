import styled from "styled-components";
import { instrumentElBRadius } from "../Piano/constants";
import { insetShadow } from "@/constants";

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 8);
  max-width: 1400px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 10px;
  @media (min-width: 1024px) {
    flex-direction: row;
    margin: auto;
  }
  @media (min-width: 1400px) {
    width: 100%;
  }
`;

export const PlayerNoShadowSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  width: 100%;
  margin: 0 -10px;
`;

export const PlayerSection = styled.div`
  border-radius: ${instrumentElBRadius};
  padding: 6px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  flex-direction: row;
  width: 100%;
  flex: 1 1 0;
  /* box-shadow:
    3px 3px 13px 3px color-mix(in oklab, var(--background) 100%, transparent),
    -2px -2px 2px 0px color-mix(in oklab, var(--foreground) 20%, transparent),
    -2px -2px 2px 0px color-mix(in oklab, var(--background) 50%, transparent)
    2px 2px 2px 0px color-mix(in oklab, var(--foreground) 20%, transparent)
      inset; */
  &:last-child {
    justify-content: center;
    flex: 0 0 0;
  }
  flex: 1 1 0px;
  height: auto;
  padding: 6px 8px;
`;
