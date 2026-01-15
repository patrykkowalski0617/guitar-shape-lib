import styled from "styled-components";
import { Note } from "./FretCell/parts";

export const Fretboard = styled.div``;

export const FretboardRow = styled.div`
  display: flex;
  flex-direction: row;
  &:last-child {
    & > :first-child {
      ${Note} {
        border-radius: 0 0 0 var(--radius-xl);
      }
    }
    & > :last-child {
      ${Note} {
        border-radius: 0 0 var(--radius-xl) 0;
      }
    }
  }
  &:first-child {
    & > :last-child {
      ${Note} {
        border-radius: 0 var(--radius-xl) 0 0;
      }
    }
    & > :first-child {
      ${Note} {
        border-radius: var(--radius-xl) 0 0 0;
      }
    }
  }
`;
