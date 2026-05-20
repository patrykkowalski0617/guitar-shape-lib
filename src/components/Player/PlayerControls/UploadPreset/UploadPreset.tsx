import { FolderOpen } from "lucide-react";
import * as S from "./parts";
import { playerIconSize } from "../../constants";

export function UploadPreset() {
  return (
    <>
      <input
        type="file"
        onChange={() => {}}
        accept=".json"
        style={{ display: "none" }}
      />

      <S.Button variant={"playerOutline"} onClick={() => {}} disabled={false}>
        <FolderOpen size={playerIconSize} />
      </S.Button>
    </>
  );
}
