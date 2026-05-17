export interface ParamConfig {
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
}

export interface ModuleConfig {
  id: string;
  type: string;
  name: string;
  icon: string;
  params: Record<string, ParamConfig>;
}

export interface ModuleRackProps {
  modules: ModuleConfig[];
  onParamChange: (moduleId: string, paramKey: string, value: number) => void;
  onReorder: (dragIndex: number, dropIndex: number) => void;
}

export interface ModuleProps {
  module: ModuleConfig;
  index: number;
  onParamChange: (paramKey: string, value: number) => void;
  onDragStart: (index: number) => void;
  onDragEnd: () => void;
  onDrop: (dropIndex: number) => void;
  isDragging: boolean;
  isDragOver: boolean;
}

export interface ExportModalProps {
  code: string;
  onClose: () => void;
}
