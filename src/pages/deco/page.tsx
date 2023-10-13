import HeaderDeco from "@/components/layout/headers/HeaderDeco";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Item from "./_components/Item";
import axios from "axios";
import { OrbitControls } from "@react-three/drei";
import ModelGroup from "./_components/ModelGroup";
import useSWRImmutable from "swr/immutable";

import * as styles from "./page.css";

export default function DecoPage() {
  const { data: user, mutate } = useSWRImmutable<APIUserResponse>(`/api/users/${localStorage.getItem("id")}`);

  //데코(얼굴, 옷) 카테고리 선택
  const [isFaceDeco, setIsFaceDeco] = useState(true);
  const handleDecoClick = (idx: number) => {
    setIsFaceDeco(idx == 0 ? true : false);
  };

  const handleAvatarUpload = async () => {
    if (!user) return;

    const uid = localStorage.getItem("id");
    await axios
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
      <div className={styles.avatarDeco}>
        <Suspense fallback={null}>
          <Canvas
            style={{ background: "transparent" }}
            shadows
            camera={{
              rotation: [0, 0, 0],
              fov: 150,
              zoom: 100,
              near: 1,
              far: 10,
            }}
          >
            <spotLight intensity={1} position={[0, 30, 80]} angle={0.2} castShadow />
            <ambientLight intensity={0.5} />
            {user && <ModelGroup defaultgltf={user.userAvatar} isFaceDeco={isFaceDeco} />}
            <OrbitControls
              enableZoom={false} // 확대/축소 비활성화
              enableRotate={true} // 회전 활성화
              enablePan={false} // 이동 비활성화
              enableDamping // 부드러운 움직임 효과 활성화
              dampingFactor={0.1} // 부드러운 움직임 강도 설정
            />
          </Canvas>
        </Suspense>
        <Item
          type={isFaceDeco ? "face" : "cloth"}
          onItemClick={(kind, { assetGltf }) =>
            mutate((prev) => (!prev ? prev : { ...prev, userAvatar: { ...prev.userAvatar, [kind]: assetGltf } }))
          }
        />
      </div>
      <div className={styles.saveAvatar} onClick={() => handleAvatarUpload()}>
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
