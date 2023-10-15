import HeaderDeco from "@/components/layout/headers/HeaderDeco";
import { useState, useRef } from "react";
import type { RootState } from "@react-three/fiber";
import Item from "./_components/Item";
import axios from "axios";
import AvatarModelGroup from "@/components/AvatarModelGroup";
import useSWRImmutable from "swr/immutable";

import * as styles from "./page.css";
import AvatarCanvas from "@/components/AvatarCanvas";

const subNav = {
  face: [
    ["eyes", "눈"],
    ["mouth", "입"],
  ],
  body: [
    ["top", "상의"],
    ["bottom", "하의"],
    ["shoes", "신발"],
    ["accessory", "기타"],
  ],
};
export default function DecoPage() {
  const { data: user } = useSWRImmutable<APIUserResponse>(`/api/users/${localStorage.getItem("id")}`);
  const cameraRef = useRef<RootState>(null);
  //데코(얼굴, 옷) 카테고리 선택
  const [isFaceDeco, setIsFaceDeco] = useState(false);
  const [currentKind, setCurrentKind] = useState("top");

  const handleDecoClick = (idx: number) => {
    setIsFaceDeco(idx == 0 ? true : false);
    setCurrentKind(idx == 0 ? "eyes" : "top");

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
    <>
      <HeaderDeco />

      <AvatarCanvas
        ref={cameraRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <AvatarModelGroup />
      </AvatarCanvas>

      <img
        src="/img/home/background.png"
        alt=""
        style={{ position: "absolute", zIndex: -1, height: "100%", width: "100%" }}
      />

      <main className={styles.pageContainer}>
        <div className={styles.topActionsContainer}>
          <div className={styles.categorySelectGroup}>
            <button
              className={styles.categorySelectButton}
              aria-selected={isFaceDeco}
              onClick={() => {
                handleDecoClick(0);
              }}
            >
              <img
                src={isFaceDeco ? "/img/VectorsmileTrue.png" : "/img/VectorsmileFalse.png"}
                className={styles.iconImg}
                alt=""
              />
            </button>
            <button
              className={styles.categorySelectButton}
              aria-selected={!isFaceDeco}
              onClick={() => {
                handleDecoClick(1);
              }}
            >
              <img
                src={!isFaceDeco ? "/img/VectorclothTrue.png" : "/img/VectorclothFalse.png"}
                className={styles.iconImg}
                alt=""
              />
            </button>
          </div>

          <button className={styles.button} onClick={handleAvatarUpload} aria-selected>
            저장하기
          </button>
        </div>

        <div className={styles.decorationListContainer}>
          <div className={styles.buttonGroup}>
            {subNav[isFaceDeco ? "face" : "body"].map(([kind, text]) => (
              <button
                key={kind}
                className={styles.button}
                onClick={() => setCurrentKind(kind)}
                aria-selected={currentKind === kind}
              >
                {text}
              </button>
            ))}
          </div>
          <Item currentKind={currentKind} isFaceDeco={isFaceDeco} />
        </div>
      </main>
    </>
  );
}
