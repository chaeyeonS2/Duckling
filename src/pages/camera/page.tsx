import View3D from "@egjs/react-view3d";
import * as styles from "./page.css";
import { useRef, useState } from "react";
import Header from "@/components/layout/headers/Header";
import { Link } from "react-router-dom";

import "@egjs/view3d/css/view3d-bundle.min.css";
import "@egjs/view3d/css/view3d-ar.min.css";
import Footer from "@/components/layout/Footer";
import AnimationMenu from "./_components/AnimationMenu";
import { DynamicIcon } from "@/components/Icon";

export default function ARCameraPage() {
  const view3DRef = useRef<View3D | null>(null);
  const [playingGtlfModel, setplayingGtlfModel] = useState<string>("");

  /*
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
  }, []);
  */

  const handleDataFromAnimationMenu = (data: string) => {
    setplayingGtlfModel(data);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <Header closable>
          <Link to={"/share/" + localStorage.getItem("id")}>
            <DynamicIcon id="share" size="medium" />
          </Link>
          <Link to="/deco">
            <DynamicIcon id="clothes" size="medium" />
          </Link>
          <Link to="/setting">
            <DynamicIcon id="settings" size="medium" />
          </Link>
        </Header>
        <View3D
          key={playingGtlfModel} // playingGtlfModel을 기반으로 한 고유한 키 추가
          className={styles.canvas}
          ref={view3DRef}
          src={playingGtlfModel}
          iosSrc="/gltf/test/test3.usdz"
          arPriority={["webAR", "sceneViewer", "quickLook"]}
          center={[0, 0.9, 0.25]} //위치 조정
          //defaultAnimationIndex={playingAnimation}
          useDefaultEnv={true}
        ></View3D>
        <AnimationMenu ref={view3DRef} animationGltf={handleDataFromAnimationMenu} />
        <Footer />
      </div>
    </>
  );
}
