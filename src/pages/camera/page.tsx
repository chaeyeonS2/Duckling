import View3D, { ARButton, AROverlay } from "@egjs/react-view3d";
import ARScaleControl from "@egjs/react-view3d";
import * as styles from "./page.css";
import { useEffect, useRef } from "react";

import "@egjs/view3d/css/view3d-bundle.min.css";
import "@egjs/view3d/css/view3d-ar.min.css";
import Footer from "@/components/layout/Footer";
import AnimationMenu from "./_components/AnimationMenu";

export default function ARCameraPage() {
  const view3DRef = useRef<View3D | null>(null);
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
    view3DRef.current?.loadPlugins(new ARButton(arButtonOptions));
    //const arScaleControl = new ARScaleControl(arScaleControlOptions);
    //view3DRef.current?.arScaleControl;
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <View3D
          className={styles.canvas}
          ref={view3DRef}
          src="/gltf/test/Rumba Dancing.gltf"
          iosSrc="/gltf/test/test03_3.usd"
          arPriority={["webAR", "sceneViewer", "quickLook"]}
          center={[0, 0.9, 0.25]} //위치 조정
          //loadPlugins={arBtn}
        ></View3D>
        {/* <button
          onClick={() => {
            view3DRef.current?.loadPlugins(new ARButton());
          }}
        >
          CLICK ME
        </button> */}
        <AnimationMenu />
        <Footer />
      </div>
    </>
  );
}
