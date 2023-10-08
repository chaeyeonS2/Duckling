import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import SWRWrapper from "@/components/SWRWrapper";
import "./firebase/config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRWrapper>
      <App />
    </SWRWrapper>
  </React.StrictMode>
);
