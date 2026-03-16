import styled from "styled-components";
import { FretboardRow } from "./FretboardRow/parts";
import { Fret, Note } from "./FretboardCell/parts";
import { instrumentBRadius, instrumentElBRadius } from "@/parts";

export const Fretboard = styled.div`
  user-select: none;
  padding-bottom: 25px;
  ${FretboardRow} {
    > :first-child::before {
      content: "";
      position: absolute;
      width: 1px;
      border-radius: 5px;
      background-color: var(--primary);
      box-shadow:
        0 0 6px 0 var(--primary),
        0 0 8px 0 var(--primary);
      top: -2px;
      bottom: -2px;
      right: -9px;
    }

    &:first-child {
      & > :first-child,
      & > :first-child ${Note}, & > :first-child ${Fret} {
        border-radius: ${instrumentBRadius} ${instrumentElBRadius}
          ${instrumentElBRadius} ${instrumentElBRadius};
      }
      & > :last-child,
      & > :last-child ${Note}, & > :last-child ${Fret} {
        border-radius: ${instrumentElBRadius} ${instrumentBRadius}
          ${instrumentElBRadius} ${instrumentElBRadius};
      }
    }
    &:last-child {
      & > :first-child,
      & > :first-child ${Note}, & > :first-child ${Fret} {
        border-radius: ${instrumentElBRadius} ${instrumentElBRadius}
          ${instrumentElBRadius} ${instrumentBRadius};
      }
      & > :last-child,
      & > :last-child ${Note}, & > :last-child ${Fret} {
        border-radius: ${instrumentElBRadius} ${instrumentElBRadius}
          ${instrumentBRadius} ${instrumentElBRadius};
      }
    }
  }
`;

export const ControlWrapper = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 4);
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  > :first-child {
    flex: 1 1 0;
  }
  > :nth-child(2) {
    flex: 1 1 0;
  }
  > :last-child {
    flex: 1 1 100%;
  }
  @media (min-width: 768px) {
    > :first-child {
      flex: unset;
      width: 160px;
    }
    > :nth-child(2) {
      flex: unset;
      width: 200px;
    }
    > :last-child {
      flex: 2 1 0;
      max-width: 450px;
    }
  }
`;
