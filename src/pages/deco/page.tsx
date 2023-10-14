import HeaderDeco from "@/components/layout/headers/HeaderDeco";
import { useState, useRef } from "react";
import type { RootState } from "@react-three/fiber";
import Item from "./_components/Item";
import axios from "axios";
import AvatarModelGroup from "@/components/AvatarModelGroup";
import useSWRImmutable from "swr/immutable";

import * as styles from "./page.css";
import AvatarCanvas from "@/components/AvatarCanvas";

export default function DecoPage() {
  const { data: user } = useSWRImmutable<APIUserResponse>(`/api/users/${localStorage.getItem("id")}`);
  const cameraRef = useRef<RootState>(null);
  //데코(얼굴, 옷) 카테고리 선택
  const [isFaceDeco, setIsFaceDeco] = useState(false);
  const handleDecoClick = (idx: number) => {
    setIsFaceDeco(idx == 0 ? true : false);

    if (!cameraRef.current) return;
    if (idx == 0) {
      cameraRef.current.camera.zoom = 1;
    } else {
      cameraRef.current.camera.zoom = 0.6;
    }
  };

  const handleAvatarUpload = () => {
    if (!user) return;

    const uid = localStorage.getItem("id");
    axios
      .patch(`/api/users/${uid}`, {
        userAvatar: user.userAvatar,
      })
      .catch((error) => console.error("Error uploading document:", error));
  };

  return (
    <div className={styles.layoutDeco}>
      <div>
        <HeaderDeco />
      </div>
      <div
        className={styles.avatarDeco}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(/img/home/background.png)",
        }}
      >
        <AvatarCanvas ref={cameraRef}>
          <AvatarModelGroup />
        </AvatarCanvas>

        <Item type={isFaceDeco ? "face" : "cloth"} />
      </div>

      <div className={styles.saveAvatar} onClick={handleAvatarUpload}>
        <img src="/img/deco/save.png" alt="" />
      </div>

      <div className={styles.chooseBtnGroup}>
        <div
          className={styles.btnFace}
          onClick={() => {
            handleDecoClick(0);
          }}
        >
          <img src={isFaceDeco ? "/img/VectorsmileTrue.png" : "/img/VectorsmileFalse.png"} alt="" />
        </div>
        <div
          className={styles.btnCloth}
          onClick={() => {
            handleDecoClick(1);
          }}
        >
          <img src={!isFaceDeco ? "/img/VectorclothTrue.png" : "/img/VectorclothFalse.png"} alt="" />
        </div>
      </div>
    </div>
  );
}
