export const exportProgress = (state: { learned: string[]; learning: string[] }) => {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `guitar-progress-${new Date().toISOString().split("T")[0]}.json`;
  link.click();
};

export const importProgress = (onData: (data: any) => void) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          onData(json);
        } catch (err) {
          alert("Incorrect file format!");
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
};
