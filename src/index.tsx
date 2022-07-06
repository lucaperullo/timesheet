import { createRoot } from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/react";
import { StateProvider } from "./context/state";
import { initialState, reducer } from "./context/reducers";
import App from "./App";

const container = document.getElementById("root");
const el1: HTMLElement = container!;
const root = createRoot(el1);

root.render(
  <>
    <ColorModeScript />
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </>
);
