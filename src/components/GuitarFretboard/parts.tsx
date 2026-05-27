import styled from "styled-components";
import WoodImage from "@/assets/wood.jpg";

export const fretboardRPadding = "40px";
export const fretboardLPadding = "70px";

export const InstrumentScrollWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  position: relative;
  z-index: 2;
  @media (max-width: 1400px) {
    mask-image: linear-gradient(
      to right,
      transparent,
      hsl(0, 0%, 2%) 10px,
      hsl(0, 0%, 2%) calc(100% - 10px),
      transparent
    );
  }
`;

export const FretboardNotScrollableWrapper = styled.div`
  margin-bottom: -20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StringSliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 50px;
  margin-top: -12px;
  height: 237px;
  position: relative;
  z-index: 100;
`;

export const FretboardWrapper = styled.div`
  padding: 8px 0 20px;
  position: relative;
  margin-left: auto;
  overflow: hidden;
  width: calc(1400px - ${fretboardLPadding});
`;

export const FretboardShadow = styled.div`
  left: 10px;
  right: calc(${fretboardRPadding} - 15px);
  height: 179px;
  position: absolute;
  z-index: 16;
  top: 10px;
  background-size: 1400px;
  box-shadow:
    4px 10px 15px 0px hsla(0, 0%, 2%, 0.8),
    0px 0px 5px 0px color-mix(in oklab, var(--instrument) 10%, hsl(0, 0%, 2%));
  border-radius: 12px;
  border-bottom: 5px solid hsl(0, 0%, 2%);
`;

export const Fretboard = styled.div`
  user-select: none;
  position: relative;
  z-index: 1;
  width: 100%;
  padding-right: ${fretboardRPadding};

  &::before {
    border-radius: 20px;
    content: "";
    position: absolute;
    inset: 0;
    right: calc(${fretboardRPadding} - 15px);
    left: 10px;
    background-color: #4a2f1b77;
    background-image:
      linear-gradient(
        0deg,
        color-mix(in oklab, hsl(0, 0%, 30%) 100%, transparent) 0%,
        color-mix(in oklab, hsl(0, 0%, 30%) 20%, transparent) 60%,
        color-mix(in oklab, hsl(0, 0%, 30%) 80%, transparent) 100%
      ),
      url(${WoodImage});

    background-size: cover;
    background-blend-mode: overlay;
    box-shadow: 30px 0px 30px 20px
      color-mix(in oklab, hsl(0, 0%, 2%) 80%, transparent) inset;
  }
`;
