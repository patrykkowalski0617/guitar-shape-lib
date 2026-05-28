import { useEditKeyAndChordButton } from "./useEditKeyAndChordButton";
import * as S from "./parts";
interface EditKeyAndChordButtonProps {
  id: string;
  isDuplicateKey: boolean;
}

export const EditKeyAndChordButton = ({
  id,
  isDuplicateKey,
}: EditKeyAndChordButtonProps) => {
  const { buttonParts, handleEditKeyAndChord } = useEditKeyAndChordButton(id);
  const {
    majorName,
    relativeMinorName,
    roleNumName,
    baseChordName,
    isMajorMode,
  } = buttonParts;

  return (
    <S.Button onClick={handleEditKeyAndChord} $w={4} $variant="ghost">
      <S.KeyName $isDuplicateKey={isDuplicateKey}>
        <S.KeyNamePart $bold={isMajorMode}>{majorName}</S.KeyNamePart>
        {" / "}
        <S.KeyNamePart $bold={!isMajorMode}>{relativeMinorName}</S.KeyNamePart>
      </S.KeyName>
      {roleNumName && <S.RoleNumName>{` ${roleNumName}`}</S.RoleNumName>}
      <S.BaseChordName>{` ${baseChordName}`}</S.BaseChordName>
    </S.Button>
  );
};
