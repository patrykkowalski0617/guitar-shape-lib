import styled from "styled-components";
import { FretboardRow } from "./FretboardRow/parts";
import { Fret, Note } from "./FretCell/parts";
import { pianoBRadius, keyBRadius } from "../Piano/PianoKey/parts";

export const FretboardWrapper = styled.div`
  padding-top: 3px;
`;

export const Fretboard = styled.div`
  user-select: none;
  ${FretboardRow} {
    & > :first-child {
      &::before {
        content: "";
        position: absolute;
        height: 32px;
        width: 1px;
        background: color-mix(in oklab, var(--primary) 50%, transparent);
        box-shadow: 0 0 8px var(--primary);
        right: -9px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &:first-child {
      & > :first-child,
      & > :first-child ${Note}, & > :first-child ${Fret} {
        border-radius: ${pianoBRadius} ${keyBRadius} ${keyBRadius} ${keyBRadius};
      }
      & > :last-child,
      & > :last-child ${Note}, & > :last-child ${Fret} {
        border-radius: ${keyBRadius} ${pianoBRadius} ${keyBRadius} ${keyBRadius};
      }
    }
    &:last-child {
      & > :first-child,
      & > :first-child ${Note}, & > :first-child ${Fret} {
        border-radius: ${keyBRadius} ${keyBRadius} ${keyBRadius} ${pianoBRadius};
      }
      & > :last-child,
      & > :last-child ${Note}, & > :last-child ${Fret} {
        border-radius: ${keyBRadius} ${keyBRadius} ${pianoBRadius} ${keyBRadius};
      }
    }
  }
`;
