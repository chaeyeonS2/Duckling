import View3D, { ARButton, AROverlay } from "@egjs/react-view3d";
import ARScaleControl from "@egjs/react-view3d";
//import * as styles from "./page.css";
import "./page.css";
import { useEffect, useRef } from "react";

import "@egjs/view3d/css/view3d-bundle.min.css";
import "@egjs/view3d/css/view3d-ar.min.css";

export default function ARCameraPage() {
  const view3DRef = useRef();
  const arScaleControlOptions = {
    min: 1,
    max: 1,
  };

  const arButtonOptions = {
    availableText: "View in AR",
    unavailableText: "AR is not available in this browser",
    // 나머지 옵션들도 필요한 경우에 수정해주세요.
  };

  useEffect(() => {
    view3DRef.current.loadPlugins(new ARButton(arButtonOptions));
    const arScaleControl = new ARScaleControl(arScaleControlOptions);
    view3DRef.current.arScaleControl;
  }, []);

  return (
    <>
      <View3D
        ref={view3DRef}
        src="/gltf/test/animation_100.glb"
        iosSrc="/gltf/test/test03_3.usd"
        arPriority={["webAR", "sceneViewer", "quickLook"]}
        initialZoom={5}
        center={[0.2, 1, 0]}
        //loadPlugins={arBtn}
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
