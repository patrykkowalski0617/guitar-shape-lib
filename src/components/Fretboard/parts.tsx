import styled from "styled-components";
import { Note } from "./FretCell/parts";

export const Fretboard = styled.div`
  padding-top: 2px; //- space for fretcell outline when shape is locked
`;

export const FretboardRow = styled.div`
  display: flex;
  margin-bottom: 2px;
  flex-direction: row;
  & > :first-child {
    margin-right: 8px;
  }
  &:nth-child(6) {
    & > :first-child,
    & > :first-child ${Note} {
      border-radius: 4px 4px 4px var(--radius-lg);
    }
    & > :last-child,
    & > :last-child ${Note} {
      border-radius: 4px 4px var(--radius-lg) 4px;
    }
  }
  &:first-child {
    & > :last-child,
    & > :last-child ${Note} {
      border-radius: 4px var(--radius-lg) 4px 4px;
    }
    & > :first-child,
    & > :first-child ${Note} {
      border-radius: var(--radius-lg) 4px 4px 4px;
    }
  }
`;
