import { duration } from "@/components/ui";
import styled, { css } from "styled-components";

export const MultiRangeSliderWrapper = styled.div<{ $isDisbled: boolean }>`
  ${({ $isDisbled }) => css`
    height: 100%;
    transition: ${duration.base};
    opacity: ${$isDisbled ? "0" : "1"};
  `}
`;
