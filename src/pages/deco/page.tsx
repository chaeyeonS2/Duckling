import { useState, useRef } from "react";

import AvatarModelGroup from "@/components/AvatarModelGroup";
import Header from "@/components/layout/headers/Header";
import AvatarCanvas from "@/components/AvatarCanvas";
import { Link } from "react-router-dom";
import Item from "./_components/Item";

import type { RootState } from "@react-three/fiber";
import useSWRImmutable from "swr/immutable";
import axios from "axios";

import * as styles from "./page.css";

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
} as const;

export default function DecoPage() {
  const { data: user } = useSWRImmutable(`/api/users/${localStorage.getItem("id")}`);
  const cameraRef = useRef<RootState>(null);
  //데코(얼굴, 옷) 카테고리 선택
  const [isFaceDeco, setIsFaceDeco] = useState(false);
  const [currentKind, setCurrentKind] = useState<keyof User["userAvatar"]>("top");

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
    <main className={styles.pageContainer}>
      <Header>
        <Link to="/home">
          <img src="/img/close.png" />
        </Link>
      </Header>

      <AvatarCanvas
        ref={cameraRef}
        style={{ transform: `translateY(-56px)` }}
        camera={{
          fov: 150,
          zoom: 100,
          near: 1,
          far: 10,
        }}
      >
        <AvatarModelGroup
          position={isFaceDeco ? [0, -0.025, 0] : [0, 0.05, 0]}
          scale={isFaceDeco ? [1.75, 1.75, 1.75] : [1, 1, 1]}
        />
      </AvatarCanvas>

      <div className={styles.bottomContainer}>
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
          <Item currentKind={currentKind} />
        </div>
      </div>
    </main>
  );
}
