import { useEffect, useRef } from "react";

import { DynamicIcon } from "@/components/Icon";
import BaseModal from "@/components/modal/BaseModal";
import AvatarCanvas from "@/components/AvatarCanvas";
import AlertModal from "@/components/modal/AlertModal";
import Header from "@/components/layout/headers/Header";
import AvatarModelGroup from "@/components/AvatarModelGroup";

import { Link, useParams } from "react-router-dom";
import { RootState } from "@react-three/fiber";
import { overlays } from "@/utils/overlays";
import mergeImages from "merge-images";
import axios from "axios";

import { button } from "../deco/page.css";
import * as styles from "./page.css";

export default function SharePage() {
  const { userID } = useParams();

  const handleDownload = (imageSrc: string) => {
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
      return <BaseModal title="저장되었습니다!" logoImgSrc={<DynamicIcon id="check" size="medium" />} />;
    });
  };
  const handleXShare = async (imageSrc: string) => {
    const loadingOverlayId = overlays.open(() => (
      <BaseModal title="포스팅 중..." logoImgSrc={<DynamicIcon id="X-logo" size="medium" />} />
    ));
    const res = await axios
      .post(`/api/twitter/${localStorage.getItem("id")}`, {
        postImg_url: imageSrc.replace("data:image/png;base64,", ""),
      })
      .catch(console.log);
    overlays.close(loadingOverlayId);
    if (!res) {
      overlays.open(({ overlayId }) => (
        <AlertModal
          title="포스팅 실패!"
          description="예기치 못한 오류가 발생했습니다. 다시 시도해주세요."
          logoImgSrc={<DynamicIcon id="warning" size="medium" />}
          onClose={() => overlays.close(overlayId)}
        />
      ));
      return;
    }

    overlays.open(({ overlayId }) => (
      <AlertModal
        title="포스팅 완료!"
        logoImgSrc={<DynamicIcon id="check" size="medium" />}
        onClose={() => overlays.close(overlayId)}
      />
    ));
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

    overlays.open(({ overlayId }) => {
      const handleClick = (callback: (imgsrc: string) => void) => () => {
        overlays.close(overlayId);
        callback(imageSrc);
      };

      return (
        <>
          <div className={styles.modalContainer}>
            <div className={styles.modalBody}>
              <div>
                <img src={imageSrc} alt="" className={styles.modalImage} />
              </div>
              <div className={styles.modalButtonGroup}>
                <button onClick={handleClick(handleDownload)} className={button + " " + styles.button} aria-selected>
                  <DynamicIcon id="save" size="medium" />
                  저장하기
                </button>
                <button onClick={handleClick(handleXShare)} className={button + " " + styles.button}>
                  <DynamicIcon id="X-logo" size="medium" />
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </>
      );
    });
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
