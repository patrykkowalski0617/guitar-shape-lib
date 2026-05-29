import { useEditKeyAndChordButton } from "./useEditKeyAndChordButton";
import * as S from "./parts";
import { StickyKeyName } from "./StickyKeyName";
interface EditKeyAndChordButtonProps {
  id: string;
  index: number;
  isDuplicateKey: boolean;
  isShort?: boolean;
}

export const EditKeyAndChordButton = ({
  id,
  index,
  isDuplicateKey,
  isShort: _isShort,
}: EditKeyAndChordButtonProps) => {
  const { buttonParts, handleEditKeyAndChord } = useEditKeyAndChordButton(id);
  const {
    majorName,
    relativeMinorName,
    roleNumName,
    baseChordName,
    isMajorMode,
  } = buttonParts;

  const isShort = !!_isShort;

  return (
    <S.Button
      onClick={handleEditKeyAndChord}
      $w={isShort ? 3 : 5}
      $variant={"ghost"}
      style={isShort ? { width: 100 } : {}}
    >
      <StickyKeyName $isDuplicateKey={isDuplicateKey} $index={index} top={335}>
        <S.KeyNamePart $bold={isMajorMode}>{majorName}</S.KeyNamePart>
        {" / "}
        <S.KeyNamePart $bold={!isMajorMode}>{relativeMinorName}</S.KeyNamePart>
      </StickyKeyName>
      {roleNumName && <S.RoleNumName>{` ${roleNumName}`}</S.RoleNumName>}
      {!isShort && <S.BaseChordName>{` ${baseChordName}`}</S.BaseChordName>}
    </S.Button>
  );
};
