import { duration } from "@/components/ui";
import styled, { css } from "styled-components";

export const MultiRangeSliderWrapper = styled.div<{ $isDisbled: boolean }>`
  ${({ $isDisbled }) => css`
    height: 100%;
    padding-top: 50px;
    flex-shrink: 0;
    min-height: 0;
    transition: ${duration.base};
    opacity: ${$isDisbled ? "0" : "1"};
  `}
`;
