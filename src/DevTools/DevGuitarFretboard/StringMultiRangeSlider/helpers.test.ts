import { describe, it, expect } from "vitest";
import { getIndexRangeArray, getRangeFromVisibleStrings } from "./helpers";

describe("getIndexRangeArray()", () => {
  it("should return a single element when start equals end", () => {
    expect(getIndexRangeArray(3, 3)).toEqual([3]);
  });

  it("should return inclusive range from start to end", () => {
    expect(getIndexRangeArray(1, 4)).toEqual([1, 2, 3, 4]);
  });

  it("should handle reversed order (end < start)", () => {
    expect(getIndexRangeArray(5, 2)).toEqual([2, 3, 4, 5]);
  });

  it("should return correct length", () => {
    const result = getIndexRangeArray(0, 5);
    expect(result).toHaveLength(6);
  });

  it("should work with zero-based indexes", () => {
    expect(getIndexRangeArray(0, 3)).toEqual([0, 1, 2, 3]);
  });
});

describe("getRangeFromVisibleStrings()", () => {
  it("should return {start: 0, end: 0} for empty array", () => {
    expect(getRangeFromVisibleStrings([])).toEqual({ start: 0, end: 0 });
  });

  it("should return correct range for a single element", () => {
    expect(getRangeFromVisibleStrings([3])).toEqual({ start: 3, end: 3 });
  });

  it("should return min as start and max as end", () => {
    expect(getRangeFromVisibleStrings([2, 4, 1, 5])).toEqual({
      start: 1,
      end: 5,
    });
  });

  it("should handle already sorted input", () => {
    expect(getRangeFromVisibleStrings([1, 2, 3])).toEqual({ start: 1, end: 3 });
  });

  it("should handle reverse sorted input", () => {
    expect(getRangeFromVisibleStrings([5, 4, 3])).toEqual({ start: 3, end: 5 });
  });
});
