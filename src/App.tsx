import GltfProvider from "./components/GltfProvider";
import SWRWrapper from "@/components/SWRWrapper";
import { OverlayAnchor } from "./utils/overlays";
import Router from "./components/Router";

import "./config/axios";
import "./config/firebase";
import "@/css/global.css";
import "minireset.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
