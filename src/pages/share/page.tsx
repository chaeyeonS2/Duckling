import AvatarModelGroup from "@/components/AvatarModelGroup";
import Header from "@/components/layout/headers/Header";
import AvatarCanvas from "@/components/AvatarCanvas";
import { Link, useParams } from "react-router-dom";

import { RootState } from "@react-three/fiber";
import { button } from "../deco/page.css";
import { useRef } from "react";

import * as styles from "./page.css";
import { overlays } from "@/utils/overlays";
import Icon from "@/components/Icon";

export default function SharePage() {
  const { userID } = useParams();

  const rootStateRef = useRef<RootState>(null);
  const onCaptureClick = () => {
    if (!rootStateRef.current) return;

    rootStateRef.current.gl.render(rootStateRef.current.scene, rootStateRef.current.camera);
    const imageSrc = rootStateRef.current.gl.domElement.toDataURL("image/png");

    overlays.open(({ overlayId }) => (
      <>
        <div className={styles.modalContainer} onClick={() => overlays.close(overlayId)}>
          <div className={styles.modalBody}>
            <div>
              <img src={imageSrc} alt="" className={styles.modalImage} />
            </div>
            <div className={styles.modalButtonGroup}>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = imageSrc;
                  link.download = "avatar.png";
                  link.click();
                }}
                className={button + " " + styles.button}
                aria-selected
              >
                <Icon id="download" size="medium" />
                Save
              </button>
              <button className={button + " " + styles.button} disabled>
                <Icon id="twitter" size="medium" />
                twitter
              </button>
            </div>
          </div>
        </div>
      </>
    ));
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
          <AvatarCanvas ref={rootStateRef}>
            <AvatarModelGroup userId={userID} position={[0, -0.05, 0]} />
          </AvatarCanvas>
        </div>
        <button onClick={onCaptureClick} className={button + " " + styles.captureButton} aria-selected>
          Capture
        </button>
      </div>
    </div>
  );
}
