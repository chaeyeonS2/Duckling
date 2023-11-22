import View3D, { ARButton, AROverlay } from "@egjs/react-view3d";
//import * as styles from "./page.css";
import "./page.css";
import { useEffect, useRef } from "react";

import "@egjs/view3d/css/view3d-bundle.min.css";
import "@egjs/view3d/css/view3d-ar.min.css";

export default function ARCameraPage() {
  const view3DRef = useRef(null);

  return (
    <>
      <View3D
        ref={view3DRef}
        src="/gltf/test/animation_100.glb"
        iosSrc="/gltf/test/test3.usdz"
        arPriority={["webAR", "sceneViewer", "quickLook"]}
        initialZoom={5}
        center={[0.2, 1, 0]}
        //loadPlugins={[new ARButton()]}
      ></View3D>
      <button
        onClick={() => {
          view3DRef.current.loadPlugins(new ARButton());
        }}
      >
        CLICK ME
      </button>
    </>
  );
}
