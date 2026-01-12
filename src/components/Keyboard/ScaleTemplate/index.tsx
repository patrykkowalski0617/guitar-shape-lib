import { type JSX } from "react";
import { getNotes } from "@/utils";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils/musicKeys/musicKeys";
import { keysOffset, numberOfKeys } from "../constants";

const CHROMATIC_SCALE = getNotes({});

export default function ScaleTemplate(): JSX.Element {
  const firstNote = CHROMATIC_SCALE[((keysOffset % 12) + 12) % 12];
  const notes = getNotes({ length: numberOfKeys, firstNote });
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const scaleTemplateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].orderNumber;
  const templateBase = [9, 11, 0, 2, 4, 5, 7, 9, 11];

  return (
    <S.ScaleTemplate $numberOfKeys={numberOfKeys}>
      {notes.map((note: string, index: number) => {
        const noteIndex = (index + keysOffset) % 12;
        return <S.Key key={index} $isWhiteKey={majorScale.includes(noteIndex)}></S.Key>;
      })}
    </S.ScaleTemplate>
  );
}
