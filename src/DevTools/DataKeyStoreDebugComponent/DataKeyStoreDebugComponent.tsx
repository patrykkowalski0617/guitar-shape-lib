import { useState, useEffect } from "react";
import * as S from "./parts";
import { useDataKeyStore } from "@/store";
import { DebugRow } from "./DebugRow";
import { DebugHistory } from "./DebugHistory";

export const DataKeyStoreDebugComponent = () => {
  const {
    baseChordDataKey,
    setBaseChordDataKey,
    unifiedMusicKeysDataKey,
    setUnifiedMusicKeysDataKey,
    shapeDataKey,
    setShapeDataKey,
    semitoneOffsetFromMajorRoot,
    setSemitoneOffsetFromMajorRoot,
    selectedShapesVariantDataKeys,
    setSelectedShapesVariantDataKeys,
    resetDataKeys,
  } = useDataKeyStore();

  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = useDataKeyStore.subscribe((state) => {
      const time = new Date().toLocaleTimeString();
      const {
        unifiedMusicKeysDataKey: k,
        baseChordDataKey: c,
        shapeDataKey: s,
        semitoneOffsetFromMajorRoot: o,
        selectedShapesVariantDataKeys: sv,
      } = state;

      const entry = `${time} | K:${k ?? "null"} | C:${c ?? "null"} | S:${s ?? "null"} | O:${o ?? "null"} | SV:${sv ? JSON.stringify(sv) : "null"}`;
      setHistory((prev) => [entry, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      DataKeyStoreDebugComponent
      <S.DebugContainer>
        <S.Column>
          <DebugRow
            label="Key"
            value={unifiedMusicKeysDataKey}
            onSet={() => setUnifiedMusicKeysDataKey("Db")}
            onClear={() => setUnifiedMusicKeysDataKey(null)}
            setActionLabel="Set Db"
          />

          <DebugRow
            label="Chord"
            value={baseChordDataKey}
            onSet={() => setBaseChordDataKey("BaseChord2")}
            onClear={() => setBaseChordDataKey(null)}
            setActionLabel="Set BaseChord2"
          />

          <DebugRow
            label="GuitarShape"
            value={shapeDataKey}
            onSet={() => setShapeDataKey("M7")}
            onClear={() => setShapeDataKey(null)}
            setActionLabel="Set M7"
          />

          <DebugRow
            label="Offset"
            value={semitoneOffsetFromMajorRoot}
            onSet={() => setSemitoneOffsetFromMajorRoot(4)}
            onClear={() => setSemitoneOffsetFromMajorRoot(null)}
            setActionLabel="Set 4"
          />

          <DebugRow
            label="GuitarShape Variants"
            value={`${selectedShapesVariantDataKeys ? JSON.stringify(selectedShapesVariantDataKeys) : "null"}`}
            onSet={() =>
              setSelectedShapesVariantDataKeys([
                {
                  shapeDataKey: "M7",
                  stringId: "strA",
                  fretIndex: 3,
                  variantDataKey: "v1",
                },
              ])
            }
            onClear={() => setSelectedShapesVariantDataKeys(null)}
            setActionLabel="Set variants"
          />

          <S.ResetButton onClick={resetDataKeys}>Reset all</S.ResetButton>
        </S.Column>

        <DebugHistory history={history} />
      </S.DebugContainer>
    </div>
  );
};
