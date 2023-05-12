import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import useWebSocket from "react-use-websocket";
import { ServerState, useServerStateStore } from "../lib/store";

function handleMessage(event: MessageEvent, serverState: ServerState) {
  const msg = event.data;

  const idx = msg.indexOf(":");
  const cmd = msg.substring(0, idx);
  const data = msg.substring(idx + 1);

  console.log("cmd: " + cmd + ", data: " + data);

  switch (cmd) {
    case "indexStatus":
      const args = data.split(",");
      if (args.length === 5) {
        const [ready, indexing, totalSteps, currentStep, currentDesc] = args;
        serverState.setSearch({
          ready: ready === "y",
          indexing: indexing === "y",
          totalSteps: parseInt(totalSteps),
          currentStep: parseInt(currentStep),
          currentDesc: currentDesc,
        });
      }
  }
}

export default function useWs(): WebSocketHook {
  let url = localStorage.getItem("api");

  if (url) {
    url = "ws://" + url + "/ws";
  } else {
    url = "ws://" + window.location.host + "/api/ws";
  }

  const serverState = useServerStateStore();

  return useWebSocket(url, {
    onMessage: (event) => handleMessage(event, serverState),
    shouldReconnect: () => true,
    share: true,
  });
}
