import type { ReactNode, JSX } from "react";
import * as S from "./parts";

export default function ControlsContainer({ children }: { children: ReactNode }): JSX.Element {
  return <S.Container>{children}</S.Container>;
}

export const Label = ({ children }: { children: ReactNode }): JSX.Element => (
  <span
    className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5 ml-1"
    style={{ lineHeight: "0.7" }}
  >
    {children}
  </span>
);

export const GroupWrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <S.GroupWrapper>{children}</S.GroupWrapper>
);
