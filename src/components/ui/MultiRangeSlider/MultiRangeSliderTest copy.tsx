import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const SegmentedRangeSlider = ({ values, range, onChange }) => {
  const trackRef = useRef(null);
  const [dragState, setDragState] = useState(null);
  const totalSegments = values.length;

  const getIndex = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    return Math.max(
      0,
      Math.min(Math.floor(position * totalSegments), totalSegments - 1),
    );
  };

  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (!dragState) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const currentIndex = getIndex(clientX);
      const diff = currentIndex - dragState.startIdx;

      if (dragState.type === "move") {
        const newStart = dragState.initialRange.start + diff;
        const newEnd = dragState.initialRange.end + diff;
        if (newStart >= 0 && newEnd < totalSegments) {
          onChange({ start: newStart, end: newEnd });
        }
      } else if (dragState.type === "left") {
        onChange({ ...range, start: Math.min(currentIndex, range.end) });
      } else if (dragState.type === "right") {
        onChange({ ...range, end: Math.max(currentIndex, range.start) });
      }
    };

    const handleGlobalUp = () => setDragState(null);

    if (dragState) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
      window.addEventListener("touchmove", handleGlobalMove);
      window.addEventListener("touchend", handleGlobalUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [dragState, range, totalSegments, onChange]);

  const onStart = (type, e) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragState({
      type,
      startIdx: getIndex(clientX),
      initialRange: { ...range },
    });
  };

  const segmentWidth = 100 / totalSegments;

  return (
    <Track ref={trackRef}>
      <ActiveRange
        style={{
          left: `${range.start * segmentWidth}%`,
          width: `${(range.end - range.start + 1) * segmentWidth}%`,
        }}
      >
        <Handle
          onMouseDown={(e) => onStart("left", e)}
          onTouchStart={(e) => onStart("left", e)}
        />
        <Grab
          onMouseDown={(e) => onStart("move", e)}
          onTouchStart={(e) => onStart("move", e)}
        >
          {values[range.start]} - {values[range.end]}
        </Grab>
        <Handle
          onMouseDown={(e) => onStart("right", e)}
          onTouchStart={(e) => onStart("right", e)}
        />
      </ActiveRange>
    </Track>
  );
};

export default function Test() {
  const [ranges, setRanges] = useState({
    A: { start: 1, end: 3 },
    B: { start: 0, end: 2 },
  });

  const configs = {
    A: [0, 1, 2, 3, 4, 5],
    B: [10, 20, 30, 40],
  };

  const masterRange = {
    start: Math.min(ranges.A.start, ranges.B.start),
    end: Math.max(ranges.A.end, ranges.B.end),
  };

  const onMasterChange = (next) => {
    const dS = next.start - masterRange.start;
    const dE = next.end - masterRange.end;

    const valid = Object.keys(configs).every((key) => {
      const nS = ranges[key].start + dS;
      const nE = ranges[key].end + dE;
      return nS >= 0 && nE < configs[key].length && nS <= nE;
    });

    if (valid) {
      setRanges({
        A: { start: ranges.A.start + dS, end: ranges.A.end + dE },
        B: { start: ranges.B.start + dS, end: ranges.B.end + dE },
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <p>Master</p>
      <SegmentedRangeSlider
        values={[0, 1, 2, 3, 4, 5]}
        range={masterRange}
        onChange={onMasterChange}
      />
      <hr />
      <p>A</p>
      <SegmentedRangeSlider
        values={configs.A}
        range={ranges.A}
        onChange={(r) => setRanges((prev) => ({ ...prev, A: r }))}
      />
      <p>B</p>
      <SegmentedRangeSlider
        values={configs.B}
        range={ranges.B}
        onChange={(r) => setRanges((prev) => ({ ...prev, B: r }))}
      />
    </div>
  );
}

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  background: #eee;
  user-select: none;
  touch-action: none;
`;

const ActiveRange = styled.div`
  position: absolute;
  height: 100%;
  background: #333;
  display: flex;
`;

const Grab = styled.div`
  flex: 1;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  &:active {
    cursor: grabbing;
  }
`;

const Handle = styled.div`
  width: 25px;
  background: rgba(0, 0, 0, 0.5);
  cursor: ew-resize;
`;
