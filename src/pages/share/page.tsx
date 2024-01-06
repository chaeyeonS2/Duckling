import { useEffect, useRef } from "react";

import { DynamicIcon } from "@/components/Icon";
import BaseModal from "@/components/modal/BaseModal";
import AvatarCanvas from "@/components/AvatarCanvas";
import Header from "@/components/layout/headers/Header";
import AvatarModelGroup from "@/components/AvatarModelGroup";

import { Link, useParams } from "react-router-dom";
import { RootState } from "@react-three/fiber";
import { overlays } from "@/utils/overlays";
import mergeImages from "merge-images";

import { button } from "../deco/page.css";
import * as styles from "./page.css";
import { overlay } from "three/examples/jsm/nodes/Nodes.js";

export default function SharePage() {
  const { userID } = useParams();

  const handleDownload = (imageSrc: string) => () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "avatar.png";
    link.click();

    overlays.open(({ overlayId }) => {
      useEffect(() => {
        setTimeout(() => {
          overlays.close(overlayId);
        }, 2000);
      }, []);
      return <BaseModal title="프로필 이미지가 변경되었습니다" logoImgSrc={<DynamicIcon id="check" size="medium" />} />;
    });
  };
  const handleXShare = (imageSrc: string) => () => {
    // todo: x 공유하기 구현

    overlays.open(({ overlayId }) => {
      useEffect(() => {
        setTimeout(() => {
          overlays.close(overlayId);
        }, 2000);
      }, []);
      return <BaseModal title="포스팅을 위해 X로 이동합니다." logoImgSrc={<DynamicIcon id="X-logo" size="medium" />} />;
    });
  };

  const rootStateRef = useRef<RootState>(null);
  const onCaptureClick = async () => {
    if (!rootStateRef.current) return;

    rootStateRef.current.gl.render(rootStateRef.current.scene, rootStateRef.current.camera);

    const loadingOverlayId = overlays.open(() => <BaseModal title="생성중..." />);
    const imageSrc = await mergeImages([
      "/img/share-background-green.png",
      rootStateRef.current.gl.domElement.toDataURL("image/png"),
    ]);
    overlays.close(loadingOverlayId);

    overlays.open(({ overlayId }) => (
      <>
        <div className={styles.modalContainer} onClick={() => overlays.close(overlayId)}>
          <div className={styles.modalBody}>
            <div>
              <img src={imageSrc} alt="" className={styles.modalImage} />
            </div>
            <div className={styles.modalButtonGroup}>
              <button onClick={handleDownload(imageSrc)} className={button + " " + styles.button} aria-selected>
                <DynamicIcon id="save" size="medium" />
                저장하기
              </button>
              <button onClick={handleXShare(imageSrc)} className={button + " " + styles.button} disabled>
                <DynamicIcon id="X-logo" size="medium" />
                공유하기
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
          <DynamicIcon id="cancel" size="medium" />
        </Link>
      </Header>
      <div className={styles.pageContainer}>
        <div className={styles.canvasContainer}>
          <img src="/img/share-background-green.png" alt="" className={styles.backgroundImage} />
          <AvatarCanvas ref={rootStateRef}>
            <AvatarModelGroup userId={userID} position={[0, -0.05, 0]} />
          </AvatarCanvas>
        </div>
        <button onClick={onCaptureClick} className={button + " " + styles.captureButton} aria-selected>
          <DynamicIcon id="save" size="small" />
          저장하기
        </button>
      </div>
    </div>
  );
}
