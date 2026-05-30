import { color, duration } from "@/components/ui";
import styled from "styled-components";

export const SideSliderDrawerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  overflow: visible;
  z-index: 10;
`;

export const SideSliderDrawerContent = styled.div<{
  $translateX: string;
  $sliderWidth: number | null;
  $isInitialized: boolean;
}>`
  height: 100%;
  position: relative;
  overflow: visible;
  transition: ${({ $isInitialized }) =>
    $isInitialized ? duration.base : "none"};
  transform: translateX(${({ $translateX }) => $translateX});

  &::before {
    content: "";
    background-color: ${color.bg};
    width: ${({ $sliderWidth }) => $sliderWidth ?? 0}px;
    height: 100%;
    display: block;
    position: absolute;
    box-shadow: 0 0 10px 10px ${color.bg};
    pointer-events: none;
  }
  @media (min-width: 1550px) {
    transform: translateX(-50px);
    &::before {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

export const SideSliderDrawerButton = styled.div<{
  $isOpen: boolean;
  $sliderWidth: number | null;
}>`
  position: absolute;
  top: 10px;
  left: ${({ $sliderWidth }) => $sliderWidth && $sliderWidth + 10}px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  transition: ${duration.base};
  z-index: 11;
  cursor: pointer;
  @media (min-width: 1550px) {
    display: none;
  }
`;
