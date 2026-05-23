export class ScheduledNodesManager {
  private scheduledNodes: AudioNode[] = [];

  add(...nodes: AudioNode[]) {
    this.scheduledNodes.push(...nodes);
  }

  cancelAll() {
    this.scheduledNodes.forEach((node) => {
      if ("stop" in node && typeof node.stop === "function") {
        try {
          (node as AudioScheduledSourceNode).stop(0);
        } catch (_e) {}
      }
    });
    this.scheduledNodes = [];
  }

  clear() {
    this.scheduledNodes = [];
  }
}
