import styled from "styled-components";
import WoodImage from "@/assets/wood.jpg";

export const fretboardRPadding = "30px";

export const FretboardNotScrollableWrapper = styled.div`
  margin-bottom: -10px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const StringSliderWrapper = styled.div``;

export const FretboardWrapper = styled.div`
  padding-bottom: 20px;
  position: relative;
  margin: auto;
  overflow: hidden;
  width: calc(1400px - 16px - 32px);
`;

export const FretboardShadow = styled.div`
  left: 10px;
  right: 15px;
  height: 179px;
  position: absolute;
  z-index: 16;
  top: 10px;
  background-size: 1400px;
  box-shadow:
    4px 10px 8px 0px color-mix(in oklab, var(--background) 80%, transparent),
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
      color-mix(in oklab, var(--instrument) 15%, var(--muted)) 70%,
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
    filter: blur(0.5px);
    box-shadow: 30px 0px 30px 20px
      color-mix(in oklab, var(--background) 70%, transparent) inset;
  }
`;
