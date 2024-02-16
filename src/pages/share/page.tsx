import { useEffect, useRef } from "react";

import { DynamicIcon } from "@/components/Icon";
import BaseModal from "@/components/modal/BaseModal";
import AvatarCanvas from "@/components/AvatarCanvas";
import Header from "@/components/layout/headers/Header";
import AvatarModelGroup from "@/components/AvatarModelGroup";

import ConfirmModal from "@/components/modal/ConfirmModal";
import showAsyncModal from "@/utils/showAsyncModal";
import { Link, useParams } from "react-router-dom";
import { RootState } from "@react-three/fiber";
import { overlays } from "@/utils/overlays";
import mergeImages from "merge-images";
import { Pica } from "@/lib/pica";
import axios from "axios";

import * as styles from "./page.css";
import { button } from "../deco/page.css";
import AlertModal from "@/components/modal/AlertModal";

const WIDTH = 286,
  HEIGHT = 508;
export default function SharePage() {
  const { userID } = useParams();

  const rootStateRef = useRef<RootState>(null);
  const onCaptureClick = async () => {
    try {
      if (!rootStateRef.current) {
        overlays.open(({ overlayId }) => (
          <AlertModal
            overlayId={overlayId}
            title="이미지 생성이 실패했습니다."
            description="rootState ref doesn't exist"
          />
        ));
        return;
      }
      rootStateRef.current.gl.render(rootStateRef.current.scene, rootStateRef.current.camera);

      const avatarCanvas = rootStateRef.current.gl.domElement;
      const backgroundCanvas = document.createElement("canvas");
      const backgroundImage = document.createElement("img");
      backgroundImage.width = avatarCanvas.width;
      backgroundImage.height = avatarCanvas.height;
      backgroundImage.src = "/img/share-background-green.png";

      backgroundCanvas.width = avatarCanvas.width;
      backgroundCanvas.height = avatarCanvas.height;
      const ctx = backgroundCanvas.getContext("2d");
      ctx?.drawImage(backgroundImage, 0, 0, avatarCanvas.width, avatarCanvas.height);

      const avatarDataUrl = avatarCanvas.toDataURL("image/png");
      const backgroundDataUrl = backgroundCanvas.toDataURL("image/png");

      const { result: imageSrc } = await showAsyncModal(mergeImages([backgroundDataUrl, avatarDataUrl], {}), {
        progress: "이미지 생성중...",
        success: null,
        failure: "이미지 생성이 실패했습니다.",
      });
      if (imageSrc) {
        overlays.open(({ overlayId }) => <PreviewModal overlayId={overlayId} imageSrc={imageSrc} />);
      }
    } catch (error) {
      overlays.open(({ overlayId }) => (
        <AlertModal
          overlayId={overlayId}
          title="이미지 생성이 실패했습니다."
          description={`Uncaught Error: ${error}`}
        />
      ));
    }
  };

  return (
    <div>
      <Header>
        <Link to="/home">
          <DynamicIcon id="cancel" size="medium" />
        </Link>
      </Header>
      <div className={styles.pageContainer}>
        <div className={styles.canvasContainer} style={{ width: WIDTH, height: HEIGHT }}>
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

function PreviewModal({ overlayId, imageSrc }: { overlayId: number; imageSrc: string }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "avatar.png";
    link.click();

    overlays.close(overlayId);
    overlays.open(({ overlayId }) => {
      useEffect(() => {
        setTimeout(() => {
          overlays.close(overlayId);
        }, 2000);
      }, []);
      return (
        <BaseModal title="저장되었습니다!" logoImgSrc={<DynamicIcon id="check" size="medium" />} disableBackdrop />
      );
    });
  };

  const handleXShare = async () => {
    overlays.close(overlayId);

    const isConfirmed = await new Promise((res) =>
      overlays.open(({ overlayId }) => (
        <ConfirmModal
          overlayId={overlayId}
          title="정말로 X에 공유하시겠습니까?"
          onNo={() => {
            res(false);
          }}
          onYes={() => {
            res(true);
          }}
          noText="취소"
          yesText="공유하기"
        />
      ))
    );
    if (!isConfirmed) return;

    showAsyncModal(
      axios.post(`/api/twitter/${localStorage.getItem("id")}`, {
        postImg_url: imageSrc.replace("data:image/png;base64,", ""),
      }),
      {
        progress: "포스팅 중...",
        success: "포스팅 완료!",
        failure: "포스팅 실패!",
      }
    );
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBackdrop} onClick={() => overlays.close(overlayId)} />
      <div className={styles.modalBody}>
        <div>
          <img src={imageSrc} alt="" className={styles.modalImage} />
        </div>
        <div className={styles.modalButtonGroup}>
          <button onClick={handleDownload} className={button + " " + styles.button} aria-selected>
            <DynamicIcon id="save" size="medium" />
            저장하기
          </button>
          <button onClick={handleXShare} className={button + " " + styles.button}>
            <DynamicIcon id="X-logo" size="medium" />
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
}
