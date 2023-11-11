import AvatarModelGroup from "@/components/AvatarModelGroup";
import Header from "@/components/layout/headers/Header";
import AvatarCanvas from "@/components/AvatarCanvas";
import { Link } from "react-router-dom";

import { RootState } from "@react-three/fiber";
import { button } from "../deco/page.css";
import { useRef } from "react";

import * as styles from "./page.css";

export default function SharePage() {
  const rootStateRef = useRef<RootState>(null);
  const onCaptureClick = () => {
    if (!rootStateRef.current) return;
    rootStateRef.current.gl.render(rootStateRef.current.scene, rootStateRef.current.camera);
    console.log(rootStateRef.current.gl.domElement.toDataURL("image/png"));
  };
  return (
    <div>
      <Header>
        <Link to="/home">
          <img src="/img/close.png" />
        </Link>
      </Header>
      <div className={styles.pageContainer}>
        <div className={styles.canvasContainer}>
          <AvatarCanvas ref={rootStateRef} className={styles.avatarCanvas}>
            <AvatarModelGroup />
          </AvatarCanvas>
        </div>
        <button onClick={onCaptureClick} className={button + " " + styles.captureButton} aria-selected>
          Capture
        </button>
      </div>
    </div>
  );
}
