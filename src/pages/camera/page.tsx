import View3D from "@egjs/react-view3d";
import * as styles from "./page.css";
import { useEffect, useRef, useState } from "react";

import "@egjs/view3d/css/view3d-bundle.min.css";
import "@egjs/view3d/css/view3d-ar.min.css";
import Footer from "@/components/layout/Footer";
import AnimationMenu from "./_components/AnimationMenu";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ARCameraPage() {
  const view3DRef = useRef<View3D | null>(null);
  const [playingAnimation, setplayingAnimation] = useState<number>(1);

  useEffect(() => {
    const initializeView3D = async () => {
      await view3DRef.current?.init();
      //의상 추가할 때 쓸 코드
      const loader = new GLTFLoader();
      loader.load("/gltf/avatar/stage.glb", (gltf) => {
        const clothingMesh = gltf.scene;
        view3DRef.current?.scene.add(clothingMesh);
      });
    };
    initializeView3D();
  }, [playingAnimation]);

  const handleDataFromAnimationMenu = (data: number) => {
    setplayingAnimation(data);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <View3D
          className={styles.canvas}
          ref={view3DRef}
          src="/gltf/test/animation_100.glb" //  /gltf/test/Rumba Dancing.gltf
          iosSrc="/gltf/test/test03_3.usd"
          arPriority={["webAR", "sceneViewer", "quickLook"]}
          center={[0, 0.9, 0.25]} //위치 조정
          defaultAnimationIndex={playingAnimation}
          useDefaultEnv={true}
        ></View3D>
        <AnimationMenu ref={view3DRef} animationNum={handleDataFromAnimationMenu} />
        <Footer />
      </div>
    </>
  );
}
