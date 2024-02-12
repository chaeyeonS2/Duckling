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
  const [playingGtlfModel, setplayingGtlfModel] = useState<{ gltfPath: string; assetID: string } | null>(null);

  const usdzDataset: { [key: string]: string } = {
    "2784869c-eb65-4e77-945a-3486e9b4f0e8": "usdz/Danniel_Fin.usdz", //danniel
    "43bf33ce-d1ad-4232-86b6-46a67e2ee532": "usdz/Haerin_Fin.usdz", //haerin
    "947b3e1c-40db-453f-a987-d0f29618c1b2": "usdz/Hanni_Fin.usdz", //hanni
    "e67207f2-9a91-4041-ad86-e8bb2cf51bf1": "usdz/hyein.usdz", //hyein
    "877605f7-8b15-4020-80b5-28639136f82f": "usdz/minji.usdz", //minji
  };

  const gltfDataset: { [key: string]: string } = {
    "2784869c-eb65-4e77-945a-3486e9b4f0e8": "gltf/avatar/Danniel_Fin.gltf", //danniel
    "43bf33ce-d1ad-4232-86b6-46a67e2ee532": "gltf/avatar/Haerin_Fin.gltf", //haerin
    "947b3e1c-40db-453f-a987-d0f29618c1b2": "gltf/avatar/Hanni_Fin.gltf", //hanni
    "e67207f2-9a91-4041-ad86-e8bb2cf51bf1": "gltf/avatar/hyein.glb", //hyein
    "877605f7-8b15-4020-80b5-28639136f82f": "gltf/avatar/minji.glb", //minji
  };

  const handleDataFromAnimationMenu = (gltfPath: string, assetID: string) => {
    setplayingGtlfModel({ gltfPath, assetID });
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
          key={playingGtlfModel?.assetID}
          className={styles.canvas}
          ref={view3DRef}
          src={playingGtlfModel ? gltfDataset[playingGtlfModel.assetID] : ""}
          iosSrc={playingGtlfModel ? usdzDataset[playingGtlfModel.assetID] : ""}
          arPriority={["webAR", "sceneViewer", "quickLook"]}
          center={[0, 0.9, 0.25]} //위치 조정
          useDefaultEnv={true}
        ></View3D>
        <AnimationMenu ref={view3DRef} animationGltf={handleDataFromAnimationMenu} />
        <Footer />
      </div>
    </>
  );
}
