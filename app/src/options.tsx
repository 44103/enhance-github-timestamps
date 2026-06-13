import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { OptionsView } from "./01_frameworks-driver.layer/options/Options.view";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OptionsView />
  </React.StrictMode>
);
