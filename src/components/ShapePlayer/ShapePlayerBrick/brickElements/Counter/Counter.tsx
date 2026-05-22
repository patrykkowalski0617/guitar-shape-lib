export interface CounterProps {
  playLength: number;
  isCurrentBrickPlayed: boolean;
  activeBeatIndex: number | undefined;
}

export const Counter = ({
  playLength,
  isCurrentBrickPlayed,
  activeBeatIndex,
}: CounterProps) => {
  return (
    <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
      {Array.from({ length: playLength }).map((_, index) => {
        const isPartActive = isCurrentBrickPlayed && activeBeatIndex === index;
        return (
          <div
            key={index}
            style={{
              width: "20px",
              height: "10px",
              backgroundColor: isPartActive ? "#4caf50" : "#e0e0e0",
              borderRadius: "2px",
              transition: "background-color 0.1s",
            }}
          />
        );
      })}
    </div>
  );
};
