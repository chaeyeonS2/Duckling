import GltfProvider from "./components/GltfProvider";
import SWRWrapper from "@/components/SWRWrapper";
import Router from "./components/Router";

import "./config/axios";
import "./config/firebase";
import "@/css/global.css";

export default function Routes() {
  return (
    <GltfProvider>
      <SWRWrapper>
        <Router />
      </SWRWrapper>
    </GltfProvider>
  );
}
