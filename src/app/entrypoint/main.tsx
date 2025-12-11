import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "../styles/global.scss";

import { retrieveLaunchParams } from "@tma.js/sdk-react";
import { init } from "../environment/init-tma.ts";

import { HashRouter } from "react-router";

const root = createRoot(document.getElementById("root")!);

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug =
    (launchParams.tgWebAppStartParam || "").includes("debug") ||
    import.meta.env.DEV;

  await init({
    debug,
    eruda: debug && ["ios", "android"].includes(platform),
    mockForMacOS: platform === "macos",
  }).then(() => {
    root.render(
      <HashRouter>
        <App />
      </HashRouter>
    );
  });
} catch (e) {
  console.log("error");
}
