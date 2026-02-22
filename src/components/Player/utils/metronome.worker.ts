// utils/metronome.worker.ts
let timerID: any = null;
const interval = 25;

self.onmessage = (e) => {
  if (e.data === "start") {
    timerID = setInterval(() => postMessage("tick"), interval);
  } else if (e.data === "stop") {
    clearInterval(timerID);
    timerID = null;
  }
};
