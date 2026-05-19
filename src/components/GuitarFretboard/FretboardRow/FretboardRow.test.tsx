import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { isShapeCell } from "./helpers";
import FretboardRow from "./FretboardRow";
import type { NoteId, NoteObject } from "@/utils";
import type { FretboardCoordinate } from "@/data";

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock("@/store", () => ({
  useControllersStore: (selector: (s: unknown) => unknown) =>
    selector({ visibleStrings: [1, 2, 3] }),
}));

vi.mock("../FretboardCell/FretboardCell", () => ({
  default: ({
    fretIndex,
    isShapeCell,
    isBaseChordCell,
    isVisibleString,
  }: Record<string, unknown>) => (
    <div
      data-testid={`cell-${fretIndex}`}
      data-shape={String(isShapeCell)}
      data-chord={String(isBaseChordCell)}
      data-visible={String(isVisibleString)}
    />
  ),
}));

// ── Fixtures ───────────────────────────────────────────────────────────────

const makeNote = (id: NoteId): NoteObject => ({
  noteId: id,
  sharpNoteName: "C",
  flatNoteName: "C",
  isEnharmonic: false,
  octaveNumber: 4,
});

const shapeCoords: FretboardCoordinate[] = [
  [1, 2],
  [1, 5],
  [2, 3],
];

const baseChordCoords: FretboardCoordinate[] = [[1, 0]];

// ── isShapeCell ────────────────────────────────────────────────────────────

describe("isShapeCell()", () => {
  it("should return true when coordinate matches", () => {
    expect(
      isShapeCell({
        guitarShapeCoordinates: shapeCoords,
        stringIndex: 1,
        fretIndex: 2,
      }),
    ).toBe(true);
  });

  it("should return false when only stringIndex matches", () => {
    expect(
      isShapeCell({
        guitarShapeCoordinates: shapeCoords,
        stringIndex: 1,
        fretIndex: 9,
      }),
    ).toBe(false);
  });

  it("should return false when only fretIndex matches", () => {
    expect(
      isShapeCell({
        guitarShapeCoordinates: shapeCoords,
        stringIndex: 9,
        fretIndex: 2,
      }),
    ).toBe(false);
  });

  it("should return false for empty coordinates", () => {
    expect(
      isShapeCell({ guitarShapeCoordinates: [], stringIndex: 1, fretIndex: 2 }),
    ).toBe(false);
  });

  it("should match all provided coordinates correctly", () => {
    shapeCoords.forEach(([s, f]) => {
      expect(
        isShapeCell({
          guitarShapeCoordinates: shapeCoords,
          stringIndex: s,
          fretIndex: f,
        }),
      ).toBe(true);
    });
  });
});

// ── FretboardRow ───────────────────────────────────────────────────────────

describe("FretboardRow", () => {
  const rowNotes = [makeNote("C-4"), makeNote("D-4"), makeNote("E-4")];

  beforeEach(() => vi.clearAllMocks());

  it("should render a cell for each note", () => {
    render(
      <FretboardRow
        stringIndex={1}
        rowNotes={rowNotes}
        guitarShapeCoordinates={shapeCoords}
        baseChordCoordinates={baseChordCoords}
      />,
    );

    expect(screen.getByTestId("cell-0")).toBeInTheDocument();
    expect(screen.getByTestId("cell-1")).toBeInTheDocument();
    expect(screen.getByTestId("cell-2")).toBeInTheDocument();
  });

  it("should mark cell as isShapeCell when coordinate matches", () => {
    render(
      <FretboardRow
        stringIndex={1}
        rowNotes={rowNotes}
        guitarShapeCoordinates={shapeCoords}
        baseChordCoordinates={baseChordCoords}
      />,
    );

    expect(screen.getByTestId("cell-2")).toHaveAttribute("data-shape", "true");
  });

  it("should mark cell as isBaseChordCell when coordinate matches baseChordCoords", () => {
    render(
      <FretboardRow
        stringIndex={1}
        rowNotes={rowNotes}
        guitarShapeCoordinates={shapeCoords}
        baseChordCoordinates={baseChordCoords}
      />,
    );

    expect(screen.getByTestId("cell-0")).toHaveAttribute("data-chord", "true");
  });

  it("should pass isVisibleString=true when stringIndex is in visibleStrings", () => {
    render(
      <FretboardRow
        stringIndex={1}
        rowNotes={rowNotes}
        guitarShapeCoordinates={shapeCoords}
        baseChordCoordinates={baseChordCoords}
      />,
    );

    expect(screen.getByTestId("cell-0")).toHaveAttribute(
      "data-visible",
      "true",
    );
  });

  it("should pass isVisibleString=false when stringIndex is not in visibleStrings", () => {
    render(
      <FretboardRow
        stringIndex={5 as never}
        rowNotes={rowNotes}
        guitarShapeCoordinates={shapeCoords}
        baseChordCoordinates={baseChordCoords}
      />,
    );

    expect(screen.getByTestId("cell-0")).toHaveAttribute(
      "data-visible",
      "false",
    );
  });

  it("should render nothing when rowNotes is empty", () => {
    const { container } = render(
      <FretboardRow
        stringIndex={1}
        rowNotes={[]}
        guitarShapeCoordinates={shapeCoords}
        baseChordCoordinates={baseChordCoords}
      />,
    );

    expect(container.querySelectorAll("[data-testid]")).toHaveLength(0);
  });
});
