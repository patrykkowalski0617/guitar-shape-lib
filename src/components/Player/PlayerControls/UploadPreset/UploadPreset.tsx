import { useRef } from "react";
import { FolderOpen } from "lucide-react";
import {
  useControlsStore,
  useMusicStore,
  usePlayerStore,
  type Brick,
} from "@/store";
import * as S from "./parts";
import { playerIconSize } from "../../constants";
import { useCloseEdit } from "../../hooks/useCloseEdit";
import { importBricksFromJson } from "../../PlayerPresets/importBricksFromJson";

export function UploadPreset() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setBricks = usePlayerStore((state) => state.setBricks);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );

  const { closeEdit } = useCloseEdit();

  const applyImportedBricks = (bricks: Brick[]) => {
    setBricks(bricks);

    const firstSnapshot = bricks[0]?.snapshot;
    if (firstSnapshot) {
      setTuneKeyId(firstSnapshot.tuneKeyId);
    }

    setShapeVariantLocationData(null);
    setShapeVariantLocationData_locked(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    importBricksFromJson({
      file,
      onSuccess: applyImportedBricks,
      onError: (msg) => console.error(msg),
    });
  };

  const handleClick = () => {
    closeEdit();
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: "none" }}
      />

      <S.Button
        variant={"playerOutline"}
        onClick={handleClick}
        disabled={isPlaying}
      >
        <FolderOpen size={playerIconSize} />
      </S.Button>
    </>
  );
}
