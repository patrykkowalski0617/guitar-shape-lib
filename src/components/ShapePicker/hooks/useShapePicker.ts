import { useDataKeyStore, useUiStore, useShapePlayerStore } from "@/store";
import { useCurrentBaseChordName } from "@/hooks";
import { useSortedShapeOptions } from "./useSortedShapeOptions";

export const useShapePicker = () => {
  // Dane potrzebne do snapshota
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);

  // Settery konfiguratora
  const setShapeDataKey = useDataKeyStore((state) => state.setShapeDataKey);
  const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.setSemitoneOffsetFromMajorRoot,
  );

  // UI State
  const isShapePickerExpanded = useUiStore(
    (state) => state.isShapePickerExpanded,
  );
  const setShapePickerExpanded = useUiStore(
    (state) => state.setShapePickerExpanded,
  );

  // Akcja dodawania cegły
  const addShapePlayerBrick = useShapePlayerStore(
    (state) => state.addShapePlayerBrick,
  );

  const options = useSortedShapeOptions();
  const selectedChordLabel = useCurrentBaseChordName();

  const handleSelectShape = (value: string) => {
    const [id, offsetStr] = value.split("|");
    const offset = parseInt(offsetStr, 10);

    // 1. Aktualizujemy stan konfiguratora
    setShapeDataKey(id);
    setSemitoneOffsetFromMajorRoot(offset);

    // 2. Finalizacja procesu - Snapshot i dodanie cegły
    if (unifiedMusicKeysDataKey && baseChordDataKey) {
      addShapePlayerBrick(
        unifiedMusicKeysDataKey,
        baseChordDataKey,
        id,
        offset,
      );
    }

    // 3. Zamknięcie pickera (koniec "piłeczki")
    setShapePickerExpanded(false);
  };

  return {
    options,
    selectedChordLabel,
    isShapePickerExpanded,
    handleSelectShape,
  };
};
