import styled from "styled-components";
import { FretboardRow } from "./FretboardRow/parts";
import { Fret, Note } from "./FretCell/parts";
import { instrumentBRadius, instrumentElBRadius } from "@/parts";

export const FretboardWrapper = styled.div`
  padding-top: 3px;
`;

export const Fretboard = styled.div`
  user-select: none;
  ${FretboardRow} {
    > :first-child::before {
      content: "";
      position: absolute;
      width: 1px;
      border-radius: 5px;
      background-color: var(--primary);
      box-shadow: 0 0 8px 0 var(--primary);
      top: -2px;
      bottom: -2px;
      right: -9px;
    }

    &:first-child {
      & > :first-child,
      & > :first-child ${Note}, & > :first-child ${Fret} {
        border-radius: ${instrumentBRadius} ${instrumentElBRadius} ${instrumentElBRadius} ${instrumentElBRadius};
      }
      & > :last-child,
      & > :last-child ${Note}, & > :last-child ${Fret} {
        border-radius: ${instrumentElBRadius} ${instrumentBRadius} ${instrumentElBRadius} ${instrumentElBRadius};
      }
    }
    &:last-child {
      & > :first-child,
      & > :first-child ${Note}, & > :first-child ${Fret} {
        border-radius: ${instrumentElBRadius} ${instrumentElBRadius} ${instrumentElBRadius} ${instrumentBRadius};
      }
      & > :last-child,
      & > :last-child ${Note}, & > :last-child ${Fret} {
        border-radius: ${instrumentElBRadius} ${instrumentElBRadius} ${instrumentBRadius} ${instrumentElBRadius};
      }
    }
  }
`;
