import { useRef, useState } from "react";

import useSWRImmutable from "swr/immutable";

import View3D from "@egjs/react-view3d";
import { Link } from "react-router-dom";
import Flicking from "@egjs/react-flicking";
import Footer from "@/components/layout/Footer";
import { DynamicIcon } from "@/components/Icon";
import Header from "@/components/layout/headers/Header";

import * as styles from "./page.css";
import "@egjs/view3d/css/view3d-ar.min.css";
import "@egjs/view3d/css/view3d-bundle.min.css";

export default function ARCameraPage() {
  const view3DRef = useRef<View3D>(null);
  const [motionAsset, setMotionAsset] = useState<Asset>();

  const { data: icons } = useSWRImmutable(`/api/assets/?kind=ar`);

  const usdzDataset: { [key: string]: string } = {
    "321d1de2-14f7-40dd-912e-72a764d32fcf": "motions/Danniel_Fin.usdz", //danniel
    "32ad4164-449e-4bcd-9751-19e8356de4f0": "motions/Haerin_Fin.usdz", //haerin
    "87c61cd7-7542-471a-8de8-07dd5697a6ae": "motions/Hanni_Fin.usdz", //hanni
    "9f331eb2-e0ca-497e-aa5e-e33f5fab2e83": "motions/hyein.usdz", //hyein
    "ff1704ff-a676-43c5-b341-adeb9723a182": "motions/minji.usdz", //minji
  };

  const gltfDataset: { [key: string]: string } = {
    "321d1de2-14f7-40dd-912e-72a764d32fcf": "motions/Danniel_Fin.gltf", //danniel
    "32ad4164-449e-4bcd-9751-19e8356de4f0": "motions/Haerin_Fin.gltf", //haerin
    "87c61cd7-7542-471a-8de8-07dd5697a6ae": "motions/Hanni_Fin.gltf", //hanni
    "9f331eb2-e0ca-497e-aa5e-e33f5fab2e83": "motions/hyein.glb", //hyein
    "ff1704ff-a676-43c5-b341-adeb9723a182": "motions/minji.glb", //minji
  };

  const handleMotionChange = (motion: Asset) => async () => {
    if (!view3DRef.current) return;

    await view3DRef.current.load(gltfDataset[motion.assetID], { iosSrc: usdzDataset[motion.assetID] });

    // if motion doesn't exist, it means this is the first select
    if (!motionAsset) {
      await view3DRef.current.init();
    }

    setMotionAsset(motion);
  };

  const enterAR = async () => {
    if (!view3DRef.current) return;
    const arAvailable = await view3DRef.current.ar.isAvailable();
    console.log("is available:", arAvailable);
    console.log("current motion:", motionAsset);
    console.log("current session:", view3DRef.current.ar.activeSession);
    await view3DRef.current.ar.enter();
  };
  const isValid = !!motionAsset;

  return (
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
        className={styles.canvas}
        ref={view3DRef}
        arPriority={["webAR", "sceneViewer", "quickLook"]}
        center={[0, 0.9, 0.25]} //위치 조정
        autoInit={false}
        useDefaultEnv
      />
      <div className={styles.menuContainer}>
        <p className={styles.title}>아바타 모션</p>
        <div className={styles.iconContainer}>
          <button className={styles.camera} disabled={!isValid} onClick={enterAR}>
            <DynamicIcon id="avatarmotion-camera" size="large" />
          </button>
          <div className={styles.menu}>
            <Flicking circular={false} bound>
              {icons?.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    className={styles.iconCheckbox}
                    checked={motionAsset?.assetID == item.assetID}
                    key={index}
                    onChange={handleMotionChange(item)}
                    style={{ position: "absolute", visibility: "hidden" }}
                  />
                  <div className={styles.iconBox}>
                    <img src={item.assetImg} alt="" />
                  </div>
                </label>
              ))}
            </Flicking>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
