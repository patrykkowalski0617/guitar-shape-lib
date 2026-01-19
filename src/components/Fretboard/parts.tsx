import styled from "styled-components";
import { Note } from "./FretCell/parts";

export const Fretboard = styled.div`
  padding-top: 4px;
`;

export const FretboardRow = styled.div`
  display: flex;
  flex-direction: row;
  & > :first-child {
    margin-right: 8px;
  }
  &:nth-child(6) {
    & > :first-child,
    & > :first-child ${Note} {
      border-radius: 0 0 0 var(--radius-lg);
    }
    & > :last-child,
    & > :last-child ${Note} {
      border-radius: 0 0 var(--radius-lg) 0;
    }
  }
  &:first-child {
    & > :last-child,
    & > :last-child ${Note} {
      border-radius: 0 var(--radius-lg) 0 0;
    }
    & > :first-child,
    & > :first-child ${Note} {
      border-radius: var(--radius-lg) 0 0 0;
    }
  }
`;
