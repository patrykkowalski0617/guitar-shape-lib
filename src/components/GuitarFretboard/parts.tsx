import styled from "styled-components";
import WoodImage from "@/assets/wood.jpg";

export const fretboardRPadding = "40px";

export const InstrumentScrollWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  position: relative;
  z-index: 2;
  @media (max-width: 1400px) {
    mask-image: linear-gradient(
      to right,
      transparent,
      var(--background) 10px,
      var(--background) calc(100% - 10px),
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
  padding: 2px 0 20px;
  position: relative;
  margin: auto;
  overflow: hidden;
  width: calc(1400px - 50px);
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
    4px 10px 15px 0px color-mix(in oklab, var(--background) 80%, transparent),
    0px 0px 5px 0px
      color-mix(in oklab, var(--instrument) 10%, var(--background));
  border-radius: 12px;
  border-bottom: 5px solid var(--background);
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
    background-color: color-mix(
      in oklab,
      color-mix(in oklab, var(--instrument) 20%, var(--muted)) 70%,
      var(--foreground)
    );
    background-image:
      linear-gradient(
        0deg,
        color-mix(in oklab, var(--background) 100%, transparent) 0%,
        color-mix(in oklab, var(--background) 20%, transparent) 60%,
        color-mix(in oklab, var(--background) 80%, transparent) 100%
      ),
      url(${WoodImage});

    background-size: cover;
    background-blend-mode: overlay;
    box-shadow: 30px 0px 30px 20px
      color-mix(in oklab, var(--background) 80%, transparent) inset;
  }
`;
