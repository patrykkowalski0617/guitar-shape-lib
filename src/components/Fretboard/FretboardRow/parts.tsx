import styled from "styled-components";
import { Fret, Note } from "../FretCell/parts";
import { keyboardBRadius, keyBRadius } from "@/components/Keyboard/KeyboardKey/parts";

export const FretboardRow = styled.div`
  display: flex;
  margin-bottom: 2px;
  flex-direction: row;

  & > :first-child {
    margin-right: 16px;
  }

  &:first-child {
    & > :first-child,
    & > :first-child ${Note}, & > :first-child ${Fret} {
      border-radius: ${keyboardBRadius} ${keyBRadius} ${keyBRadius} ${keyBRadius};
    }
    & > :last-child,
    & > :last-child ${Note}, & > :last-child ${Fret} {
      border-radius: ${keyBRadius} ${keyboardBRadius} ${keyBRadius} ${keyBRadius};
    }
  }

  &:last-child {
    & > :first-child,
    & > :first-child ${Note}, & > :first-child ${Fret} {
      border-radius: ${keyBRadius} ${keyBRadius} ${keyBRadius} ${keyboardBRadius};
    }
    & > :last-child,
    & > :last-child ${Note}, & > :last-child ${Fret} {
      border-radius: ${keyBRadius} ${keyBRadius} ${keyboardBRadius} ${keyBRadius};
    }
  }
`;
