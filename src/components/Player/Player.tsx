import React from "react";
import { usePlayerSnapshot } from "./hooks/usePlayerSnapshot";
import * as S from "./parts";

export default function Player() {
  const { isLocked, displayData, toggleLock, logLockedData } = usePlayerSnapshot();

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLock();
  };

  return (
    <S.Container $locked={isLocked} onClick={logLockedData}>
      <span>
        {displayData.rootNote} {displayData.shapeLabel || "—"}
      </span>

      <button onClick={handleButtonClick}>{isLocked ? "Edit" : "Save"}</button>
    </S.Container>
  );
}
