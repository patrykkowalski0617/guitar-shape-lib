import { color, duration } from "@/components/ui";
import styled from "styled-components";

export const SideSliderDrawerButton = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: -10px;
  right: -90px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "0deg" : "180deg")});
  transition: ${duration.base};
  @media (min-width: 1450px) {
    display: none;
  }
`;

export const SideSliderDrawerContent = styled.div<{ $isOpen: boolean }>`
  width: 0;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0px)" : "translateX(-70px)"};
  @media (min-width: 1450px) {
    transform: translateX(-50px);
  }
  transition: ${duration.base};
  position: relative;
  &::before {
    content: "";
    background-color: ${color.bg};
    width: 50px;
    height: 100%;
    display: block;
    position: absolute;
    box-shadow: 0 0 10px 10px ${color.bg};
  }
`;
