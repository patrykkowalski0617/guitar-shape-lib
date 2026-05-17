import { useState } from "react";
import { ModuleRack } from "./ModuleRack";
import { ExportModal } from "./ExportModal";
import { DEFAULT_CONFIG, generateSynthCode } from "./synthCodeGenerator";
import type { ModuleConfig } from "./types";

export const ModularSynthBuilder = () => {
  const [modules, setModules] = useState<ModuleConfig[]>(
    JSON.parse(JSON.stringify(DEFAULT_CONFIG.modules))
  );
  const [showExport, setShowExport] = useState(false);

  const handleParamChange = (
    moduleId: string,
    paramKey: string,
    value: number
  ) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              params: {
                ...m.params,
                [paramKey]: { ...m.params[paramKey], value },
              },
            }
          : m
      )
    );
  };

  const handleReorder = (dragIndex: number, dropIndex: number) => {
    setModules((prev) => {
      const next = [...prev];
      const [removed] = next.splice(dragIndex, 1);
      next.splice(dropIndex, 0, removed);
      return next;
    });
  };

  const handleReset = () => {
    setModules(JSON.parse(JSON.stringify(DEFAULT_CONFIG.modules)));
  };

  const generatedCode = generateSynthCode(modules);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        <button onClick={() => setShowExport(true)}>Export synth.ts</button>
        <button onClick={handleReset}>Reset to default</button>
      </div>

      <ModuleRack
        modules={modules}
        onParamChange={handleParamChange}
        onReorder={handleReorder}
      />

      {showExport && (
        <ExportModal
          code={generatedCode}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
};
