import GltfProvider from "./components/GltfProvider";
import SWRWrapper from "@/components/SWRWrapper";
import { OverlayAnchor } from "./overlays";
import Router from "./components/Router";

import "./config/axios";
import "./config/firebase";
import "@/css/global.css";
import "minireset.css";

export default function Routes() {
  return (
    <GltfProvider>
      <SWRWrapper>
        <Router />
        <OverlayAnchor />
      </SWRWrapper>
    </GltfProvider>
  );
}
