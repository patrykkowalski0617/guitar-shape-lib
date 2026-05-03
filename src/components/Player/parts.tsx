import styled, { css } from "styled-components";
import { instrumentElBRadius } from "../Piano/PianoKey/parts/constants";
import { insetShadow } from "@/constants";

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

export const PlayerSection = styled.div<{
  $isTemporarlyDisabled?: boolean;
}>`
  border-radius: ${instrumentElBRadius};
  padding: 6px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-direction: row;
  width: 100%;
  flex: 1 1 0;
  ${insetShadow}
  &:last-child {
    justify-content: center;
    flex: 0 0 0;
  }
  interpolate-size: allow-keywords;
  transition: 0.1s;
  ${({ $isTemporarlyDisabled }) =>
    $isTemporarlyDisabled !== undefined &&
    css`
      opacity: ${$isTemporarlyDisabled ? 0 : 1};
      width: ${$isTemporarlyDisabled ? "0%" : "100%"};
      flex: ${$isTemporarlyDisabled ? "0 0 0px" : "1 1 0px"};
      height: ${$isTemporarlyDisabled ? "0px" : "auto"};
      padding: ${$isTemporarlyDisabled ? "0px" : "6px 8px"};
    `}
`;
