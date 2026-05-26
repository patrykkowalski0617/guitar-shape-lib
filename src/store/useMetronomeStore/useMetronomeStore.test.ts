import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useMetronomeStore } from "@/store/useMetronomeStore/useMetronomeStore";
import type { ScheduledEvent } from "@/components/metronome/ScheduledEventQueue";
import type {
  BaseChordDataKey,
  GuitarShapeDataKey,
  UnifiedMusicKeysDataKey,
} from "@/data";

const makeBricks = (lengths: number[]) =>
  lengths.map((playLength, i) => ({
    id: `brick-${i}`,
    playLength,
    unifiedMusicKeysDataKey: "C" as UnifiedMusicKeysDataKey,
    baseChordDataKey: "major" as BaseChordDataKey,
    guitarShapeDataKey: "pentatonic" as GuitarShapeDataKey,
    semitoneOffsetFromMajorRoot: 0,
    isMajorMode: true,
    sliderRange: [0, 0] as [number, number],
    targetSharpNoteNames: [],
  }));

const makeCountInEvent = (countIn: number, isLast = false): ScheduledEvent => ({
  scheduledTime: 0,
  countIn,
  currentStep: null,
  isNewBrick: true,
  isFirstStepTotal: isLast,
  isCountingIn: true,
  bassNoteFrequency: null,
});

const makePlaybackEvent = (
  currentStep: number,
  isNewBrick = false,
): ScheduledEvent => ({
  scheduledTime: 0,
  countIn: null,
  currentStep,
  isNewBrick,
  isFirstStepTotal: currentStep === 0,
  isCountingIn: false,
  bassNoteFrequency: null,
});

const resetStore = () => {
  useMetronomeStore.setState({
    bpm: 70,
    isPlaying: false,
    currentStep: 0,
    countIn: 0,
    countInInternal: 0,
    isCountingIn: false,
    isFirstPlaybackTick: false,
  });
};

describe("useMetronomeStore - countIn sequence", () => {
  beforeEach(resetStore);

  it("togglePlay initializes countIn to 4 at bpm<=100", () => {
    const { result } = renderHook(() => useMetronomeStore());
    act(() => result.current.togglePlay());

    expect(result.current.isPlaying).toBe(true);
    expect(result.current.isCountingIn).toBe(true);
    expect(result.current.countIn).toBe(4);
    expect(result.current.countInInternal).toBe(4);
  });

  it("togglePlay initializes countIn to 8 at bpm>100", () => {
    useMetronomeStore.setState({ bpm: 120 });
    const { result } = renderHook(() => useMetronomeStore());
    act(() => result.current.togglePlay());

    expect(result.current.countIn).toBe(8);
    expect(result.current.countInInternal).toBe(8);
  });

  it("applyStep shows correct countIn value when sound plays (4,3,2,1)", () => {
    const { result } = renderHook(() => useMetronomeStore());
    act(() => result.current.togglePlay());

    const sequence = [4, 3, 2, 1];
    for (const countInValue of sequence) {
      act(() => {
        result.current.applyStep(
          makeCountInEvent(countInValue, countInValue === 1),
        );
      });
      expect(result.current.countIn).toBe(countInValue);
    }
  });

  it("countIn never goes negative or loops", () => {
    const { result } = renderHook(() => useMetronomeStore());
    act(() => result.current.togglePlay());

    const values: number[] = [];
    for (const v of [4, 3, 2, 1]) {
      act(() => result.current.applyStep(makeCountInEvent(v, v === 1)));
      values.push(result.current.countIn);
    }

    expect(values).toEqual([4, 3, 2, 1]);
    expect(values.every((v) => v >= 1)).toBe(true);
  });

  it("countInInternal hits 0 after last countIn beat", () => {
    const { result } = renderHook(() => useMetronomeStore());
    act(() => result.current.togglePlay());

    act(() => result.current.applyStep(makeCountInEvent(4)));
    act(() => result.current.applyStep(makeCountInEvent(3)));
    act(() => result.current.applyStep(makeCountInEvent(2)));
    act(() => result.current.applyStep(makeCountInEvent(1, true)));

    expect(result.current.countIn).toBe(1);
    expect(result.current.countInInternal).toBe(0);
  });

  it("first playback event clears countIn state", () => {
    const { result } = renderHook(() => useMetronomeStore());
    act(() => result.current.togglePlay());

    act(() => result.current.applyStep(makeCountInEvent(4)));
    act(() => result.current.applyStep(makeCountInEvent(3)));
    act(() => result.current.applyStep(makeCountInEvent(2)));
    act(() => result.current.applyStep(makeCountInEvent(1, true)));
    act(() => result.current.applyStep(makePlaybackEvent(0, true)));

    expect(result.current.isCountingIn).toBe(false);
    expect(result.current.countIn).toBe(0);
    expect(result.current.currentStep).toBe(0);
  });
});

describe("useMetronomeStore - peekNextStep is read-only", () => {
  beforeEach(resetStore);

  it("does not mutate currentStep", () => {
    useMetronomeStore.setState({
      currentStep: 0,
      isCountingIn: false,
      isFirstPlaybackTick: false,
    });
    const { result } = renderHook(() => useMetronomeStore());
    const bricks = makeBricks([4, 4]);

    act(() => result.current.peekNextStep(bricks));

    expect(useMetronomeStore.getState().currentStep).toBe(0);
  });

  it("calling multiple times returns same result", () => {
    useMetronomeStore.setState({
      currentStep: 2,
      isCountingIn: false,
      isFirstPlaybackTick: false,
    });
    const { result } = renderHook(() => useMetronomeStore());
    const bricks = makeBricks([4, 4]);

    let first: any, second: any;
    act(() => {
      first = result.current.peekNextStep(bricks);
      second = result.current.peekNextStep(bricks);
    });

    expect(first.currentStep).toBe(second.currentStep);
    expect(first.isNewBrick).toBe(second.isNewBrick);
  });

  it("returns next step index without advancing store", () => {
    useMetronomeStore.setState({
      currentStep: 0,
      isCountingIn: false,
      isFirstPlaybackTick: false,
    });
    const { result } = renderHook(() => useMetronomeStore());
    const bricks = makeBricks([4, 4]);

    let peeked: any;
    act(() => {
      peeked = result.current.peekNextStep(bricks);
    });

    expect(peeked.currentStep).toBe(1);
    expect(useMetronomeStore.getState().currentStep).toBe(0);
  });
});

describe("useMetronomeStore - step advancement", () => {
  beforeEach(resetStore);

  it("applyStep sets currentStep from event", () => {
    useMetronomeStore.setState({ currentStep: 0, isCountingIn: false });
    const { result } = renderHook(() => useMetronomeStore());

    act(() => result.current.applyStep(makePlaybackEvent(1)));
    expect(result.current.currentStep).toBe(1);

    act(() => result.current.applyStep(makePlaybackEvent(2)));
    expect(result.current.currentStep).toBe(2);
  });

  it("isFirstPlaybackTick causes step 0 on first peek", () => {
    useMetronomeStore.setState({
      currentStep: 0,
      isCountingIn: false,
      isFirstPlaybackTick: true,
    });
    const { result } = renderHook(() => useMetronomeStore());
    const bricks = makeBricks([4, 4]);

    let peeked: any;
    act(() => {
      peeked = result.current.peekNextStep(bricks);
    });

    expect(peeked.currentStep).toBe(0);
    expect(peeked.isNewBrick).toBe(true);
  });

  it("isFirstPlaybackTick clears after first applyStep", () => {
    useMetronomeStore.setState({
      currentStep: 0,
      isCountingIn: false,
      isFirstPlaybackTick: true,
    });
    const { result } = renderHook(() => useMetronomeStore());

    act(() => result.current.applyStep(makePlaybackEvent(0, true)));

    expect(useMetronomeStore.getState().isFirstPlaybackTick).toBe(false);
  });

  it("step wraps around at total length", () => {
    useMetronomeStore.setState({
      currentStep: 3,
      isCountingIn: false,
      isFirstPlaybackTick: false,
    });
    const { result } = renderHook(() => useMetronomeStore());
    const bricks = makeBricks([2, 2]);

    let peeked: any;
    act(() => {
      peeked = result.current.peekNextStep(bricks);
    });

    expect(peeked.currentStep).toBe(0);
    expect(peeked.isFirstStepTotal).toBe(true);
  });

  it("isNewBrick is true only at brick boundaries", () => {
    const bricks = makeBricks([4, 4]);

    useMetronomeStore.setState({
      currentStep: 3,
      isCountingIn: false,
      isFirstPlaybackTick: false,
    });
    const { result } = renderHook(() => useMetronomeStore());
    let peeked: any;
    act(() => {
      peeked = result.current.peekNextStep(bricks);
    });
    expect(peeked.isNewBrick).toBe(true);

    useMetronomeStore.setState({
      currentStep: 4,
      isCountingIn: false,
      isFirstPlaybackTick: false,
    });
    act(() => {
      peeked = result.current.peekNextStep(bricks);
    });
    expect(peeked.isNewBrick).toBe(false);

    useMetronomeStore.setState({
      currentStep: 1,
      isCountingIn: false,
      isFirstPlaybackTick: false,
    });
    act(() => {
      peeked = result.current.peekNextStep(bricks);
    });
    expect(peeked.isNewBrick).toBe(false);
  });
});

describe("useMetronomeStore - stop resets state", () => {
  beforeEach(resetStore);

  it("togglePlay twice resets everything", () => {
    const { result } = renderHook(() => useMetronomeStore());

    act(() => result.current.togglePlay());
    act(() => result.current.togglePlay());

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.isCountingIn).toBe(false);
    expect(result.current.countIn).toBe(0);
    expect(result.current.countInInternal).toBe(0);
    expect(result.current.currentStep).toBe(0);
  });
});

describe("useMetronomeStore - peek and apply are consistent", () => {
  beforeEach(resetStore);

  it("applyStep matches what peekNextStep predicted", () => {
    useMetronomeStore.setState({
      currentStep: 0,
      isCountingIn: false,
      isFirstPlaybackTick: true,
    });
    const { result } = renderHook(() => useMetronomeStore());
    const bricks = makeBricks([4, 4]);

    for (let i = 0; i < 8; i++) {
      let peeked: any;
      act(() => {
        peeked = result.current.peekNextStep(bricks);
      });

      act(() => {
        result.current.applyStep({
          scheduledTime: i * 0.857,
          countIn: null,
          currentStep: peeked.currentStep,
          isNewBrick: peeked.isNewBrick,
          isFirstStepTotal: peeked.isFirstStepTotal,
          isCountingIn: false,
          bassNoteFrequency: null,
        });
      });

      expect(useMetronomeStore.getState().currentStep).toBe(peeked.currentStep);
    }
  });

  it("full countIn then playback sequence is consistent", () => {
    const { result } = renderHook(() => useMetronomeStore());
    act(() => result.current.togglePlay());

    for (const v of [4, 3, 2, 1]) {
      act(() => result.current.applyStep(makeCountInEvent(v, v === 1)));
    }

    act(() => result.current.applyStep(makePlaybackEvent(0, true)));

    expect(result.current.isCountingIn).toBe(false);
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isFirstPlaybackTick).toBe(false);

    act(() => result.current.applyStep(makePlaybackEvent(1)));
    expect(result.current.currentStep).toBe(1);

    act(() => result.current.applyStep(makePlaybackEvent(2)));
    expect(result.current.currentStep).toBe(2);
  });
});
