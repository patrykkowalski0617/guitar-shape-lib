import styled from "styled-components";
import { Note } from "./FretCell/parts";
import { keyboardBRadius, keyBRadius } from "../Keyboard/KeyboardKey/parts";

export const Fretboard = styled.div`
  padding-top: 2px; //- space for fretcell outline when shape is locked
  padding-top: 35px;
  user-select: none;
`;

export const FretboardRow = styled.div`
  display: flex;
  margin-bottom: 2px;
  flex-direction: row;

  & > :first-child {
    margin-right: 8px;
  }

  &:first-child {
    & > :first-child,
    & > :first-child ${Note} {
      border-radius: ${keyboardBRadius} ${keyBRadius} ${keyBRadius} ${keyBRadius};
    }
    & > :last-child,
    & > :last-child ${Note} {
      border-radius: ${keyBRadius} ${keyboardBRadius} ${keyBRadius} ${keyBRadius};
    }
  }

  &:nth-child(6) {
    & > :first-child,
    & > :first-child ${Note} {
      border-radius: ${keyBRadius} ${keyBRadius} ${keyBRadius} ${keyboardBRadius};
    }
    & > :last-child,
    & > :last-child ${Note} {
      border-radius: ${keyBRadius} ${keyBRadius} ${keyboardBRadius} ${keyBRadius};
    }
  }
`;
