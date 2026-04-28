import styled from "styled-components";
export const fretboardRPadding = "30px";

export const FretboardWrapper = styled.div`
  padding: 5px 0 20px;
  position: relative;
`;

export const FretboardShadow = styled.div`
  left: 10px;
  right: calc(${fretboardRPadding});
  height: 174px;
  position: absolute;
  z-index: 16;
  top: 10px;
  box-shadow: 5px 10px 25px 0px var(--background);
`;

export const Fretboard = styled.div`
  user-select: none;
  position: relative;
  z-index: 1;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    right: calc(${fretboardRPadding} - 15px);
    left: 10px;
    background-color: color-mix(in oklab, var(--primary) 45%, var(--muted));
    background-image: linear-gradient(
      0deg,
      color-mix(in oklab, var(--background) 100%, transparent) 0%,
      color-mix(in oklab, var(--background) 60%, transparent) 50%,
      color-mix(in oklab, var(--background) 80%, transparent) 100%
    );
    box-shadow: 25px 0px 20px 10px var(--background) inset;
  }
  padding-right: ${fretboardRPadding};
`;
