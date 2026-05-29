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
  right: ${({ $isOpen }) => ($isOpen ? "-90px" : "-170px")};
  transition: ${duration.base};
  @media (min-width: 1550px) {
    display: none;
  }
`;

export const SideSliderDrawerContent = styled.div<{ $isOpen: boolean }>`
  width: 0;
  height: 100%;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0px)" : "translateX(-150px)"};
  @media (min-width: 1550px) {
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
