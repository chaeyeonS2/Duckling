import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/layout/headers/Header";
import AvatarCanvas from "@/components/AvatarCanvas";
import { useGltf } from "@/components/GltfProvider";
import GroupWrpper from "@/components/GroupWrapper";

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
  const cameraRef = useRef<RootState>(null);
  const [currentKind, setCurrentKind] = useState<keyof Avatar>("top");
  const [currentAsset, setCurrentAsset] = useState<string>();
  const isFaceDeco = currentKind === "eyes" || currentKind === "mouth";

  const { data: assets } = useSWRImmutable(`/api/assets/?kind=${currentKind}`);
  const { data: user } = useSWRImmutable(`/api/users/${localStorage.getItem("id")}`);
  const [avatar, setAvatar] = useState<Partial<Avatar>>(user?.userAvatar ?? {});
  useEffect(() => {
    if (!user) return;
    setAvatar(user.userAvatar);
  }, [user]);

  const { getGLTFs } = useGltf();
  const models = getGLTFs(
    ...Object.values(avatar).map((path) => ({ gltfPath: path, identfier: "deco" } as const)),
    "/gltf/avatar/T_POSED_BODY_RIGGED_FINAL.gltf",
    "/gltf/avatar/keyring.glb",
    "/gltf/avatar/stage.glb"
  );

  const handleDecoClick = (idx: number) => {
    setCurrentKind(idx == 0 ? "eyes" : "top");

    if (!cameraRef.current) return;
    if (idx == 0) {
      cameraRef.current.camera.zoom = 1;
    } else {
      cameraRef.current.camera.zoom = 0.6;
    }
  };

  const handleKindClick = (kind: keyof Avatar) => {
    setCurrentKind(kind);
    setCurrentAsset(undefined);
  };

  const handleItemClick = (kind: keyof Avatar, item: Asset) => {
    setCurrentAsset(item.assetID);

    setAvatar((prev) => ({
      ...prev,
      [kind]: item.assetGltf,
    }));
  };

  const handleAvatarUpload = () => {
    const uid = localStorage.getItem("id");
    axios
      .patch(`/api/users/${uid}`, {
        userAvatar: avatar,
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
        <GroupWrpper
          groups={models}
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
              onClick={() => handleDecoClick(0)}
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
              onClick={() => handleDecoClick(1)}
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
                onClick={() => handleKindClick(kind)}
                aria-selected={currentKind === kind}
              >
                {text}
              </button>
            ))}
          </div>

          <div className={styles.itemBoxDiv}>
            {assets?.map((item) => {
              return (
                <div
                  key={item.assetID}
                  className={styles.itemBox}
                  aria-selected={currentAsset == item.assetID}
                  onClick={() => handleItemClick(currentKind, item)}
                >
                  <img className={styles.itemImg} src={item.assetImg} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
