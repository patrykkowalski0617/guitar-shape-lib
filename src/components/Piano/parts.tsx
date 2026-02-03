import styled from "styled-components";
import {
  KEY_PADDING,
  KEY_WIDTH_CSS,
  LEFT_PADDING_FACTOR,
  RIGHT_PADDING_FACTOR,
} from "./helpers/constants";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface PianoProps {
  $numberOfKeys: number;
}

export const Piano = styled.div<PianoProps>`
  user-select: none;
  display: flex;
  padding-left: ${({ $numberOfKeys }) =>
    `calc(${KEY_WIDTH_CSS($numberOfKeys)} * ${KEY_PADDING} * ${LEFT_PADDING_FACTOR})`};
  padding-right: ${({ $numberOfKeys }) =>
    `calc(${KEY_WIDTH_CSS($numberOfKeys)} * ${KEY_PADDING} * ${RIGHT_PADDING_FACTOR})`};
`;
