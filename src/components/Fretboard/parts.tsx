import styled from "styled-components";

const WoodTexture = `data:image/svg+xml;utf8,<svg width='400' height='400' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.1 0.4' numOctaves='3'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

export const fretboardRPadding = "30px";

export const FretboardAdjustmentWrapper = styled.div`
  margin-bottom: -20px;
`;

export const FretboardWrapper = styled.div`
  padding-bottom: 20px;
  position: relative;
`;

export const FretboardShadow = styled.div`
  left: 10px;
  right: 15px;
  height: 174px;
  position: absolute;
  z-index: 16;
  top: 10px;
  background-image: url("${WoodTexture}");
  background-size: 1400px;
  box-shadow:
    5px 15px 10px 0px var(--background),
    0px 0px 10px 0px
      color-mix(in oklab, var(--instrument) 10%, var(--background));
  border-radius: 12px;
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
      var(--instrument) 65%,
      var(--background)
    );
    background-image:
      linear-gradient(
        0deg,
        color-mix(in oklab, var(--background) 100%, transparent) 0%,
        color-mix(in oklab, var(--background) 60%, transparent) 50%,
        color-mix(in oklab, var(--background) 80%, transparent) 100%
      ),
      url("${WoodTexture}");

    background-size: auto, 350px;
    background-blend-mode: overlay;
    opacity: 0.5;

    box-shadow: 25px 0px 20px 10px var(--background) inset;
  }
`;
