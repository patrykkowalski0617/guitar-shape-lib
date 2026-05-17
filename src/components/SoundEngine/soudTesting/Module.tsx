import type { ModuleProps } from "./types";

export const Module = ({
  module,
  index,
  onParamChange,
  onDragStart,
  onDragEnd,
  onDrop,
  isDragging,
  isDragOver,
}: ModuleProps) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(index)}
      style={{
        minWidth: "220px",
        maxWidth: "220px",
        background: "var(--color-background-secondary)",
        border: isDragOver
          ? "2px solid var(--color-border-info)"
          : "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-md)",
        padding: "12px",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        transition: "opacity 0.15s",
      }}
    >
      <div
        style={{
          fontWeight: 500,
          fontSize: "14px",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <i className={`ti ti-${module.icon}`} style={{ fontSize: "16px" }} />
        {module.name}
      </div>

      {Object.entries(module.params).map(([key, param]) => (
        <div key={key} style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-text-secondary)",
              marginBottom: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{param.label}</span>
            <span style={{ fontWeight: 500 }}>
              {param.value.toFixed(param.step < 1 ? 2 : 0)}
            </span>
          </div>
          <input
            type="range"
            min={param.min}
            max={param.max}
            step={param.step}
            value={param.value}
            onChange={(e) => onParamChange(key, parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
};
