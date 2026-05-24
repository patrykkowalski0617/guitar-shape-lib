import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
import { getShapeCoordinates } from "@/components/GuitarFretboard/helpers";
import { findMatchingBaseChord } from "@/components/GuitarFretboard/helpers";
import { getNoteIdFromFretboardCoordintes } from "@/components/GuitarFretboard/helpers";
import { harmonizeBassNote } from "@/components/SoundEngine/utils/harmonizeBassNote";
import { changeOctaveOfNoteId } from "@/utils";
import {
  SCALE_SEMITONE_TEMPLATES,
  CAGED_BASE_CHORDS_SHAPES,
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
} from "@/data";
import { resolveAbsoluteFrets } from "@/components/GuitarFretboard/helpers";
import type { ShapePlayerBrick } from "@/store";
import type { NoteId } from "@/utils";

export const brickToBackingtrackNoteIds = (
  brick: ShapePlayerBrick,
): NoteId[] => {
  const baseChord = BASE_CHORDS[brick.baseChordDataKey as BaseChordDataKey];
  if (!baseChord) return [];

  const unifiedMusicKey = UNIFIED_MUSIC_KEYS[brick.unifiedMusicKeysDataKey];
  if (!unifiedMusicKey) return [];

  const scaleTemplate = baseChord.baseScaleDataKey
    ? SCALE_SEMITONE_TEMPLATES[baseChord.baseScaleDataKey].template
    : null;
  if (!scaleTemplate) return [];

  const orderedLocations = getOrderedShapeVariantDataKeys({
    guitarShapeDataKey: brick.guitarShapeDataKey,
    unifiedMusicKeysDataKey: brick.unifiedMusicKeysDataKey,
    semitoneOffsetFromMajorRoot: brick.semitoneOffsetFromMajorRoot,
  });

  const [startIdx, endIdx] = brick.sliderRange ?? [0, 0];
  const selectedShapesVariantDataKeys = orderedLocations.slice(
    startIdx,
    endIdx + 1,
  );

  const firstKey = selectedShapesVariantDataKeys[0];
  if (!firstKey) return [];

  const shapeCoords = getShapeCoordinates(firstKey);

  const CAGEDchordShape =
    baseChord.CAGEDchordShape as keyof typeof CAGED_BASE_CHORDS_SHAPES;
  const rawShapes = CAGED_BASE_CHORDS_SHAPES[CAGEDchordShape];
  if (!rawShapes) return [];

  const absoluteOffset =
    unifiedMusicKey.semitonOffsetFromC +
    (baseChord.semitoneOffsetFromMajorRoot ?? 0);

  const resolvedShapes = resolveAbsoluteFrets(
    rawShapes,
    (s) => s.coordinates,
    (s, coords) => ({ ...s, coordinates: coords }),
    (s) => s.baseFretIndex,
    absoluteOffset,
    [-24, -12, 0, 12, 24],
    0,
    24,
  );

  const baseChordMatch = findMatchingBaseChord({
    BaseChordsShapes: resolvedShapes,
    guitarShapeCoordinates: shapeCoords,
  });

  const firstCoordinate = baseChordMatch?.coordinates[0];
  if (!firstCoordinate) return [];

  const bassNoteId = getNoteIdFromFretboardCoordintes(firstCoordinate);
  const harmonyNoteIds = harmonizeBassNote(bassNoteId, scaleTemplate);
  const bassNoteOctaveDown = changeOctaveOfNoteId(bassNoteId);

  return [bassNoteOctaveDown, ...harmonyNoteIds];
};
