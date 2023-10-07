import HeaderDeco from "../../headers/HeaderDeco";
import "../../css/avatarDeco.css";
import { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Item from "./Item";
import axios from "axios";
import { OrbitControls } from "@react-three/drei";
import GltfGroupModels from "./GltfGroupModels";

export default function AvatarDeco() {
  var [defaultgltf, setDefaultGltf] = useState<User["userAvatar"]>();

  useEffect(() => {
    const uid = localStorage.getItem("id");
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`
        );
        setDefaultGltf(response.data.userAvatar);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, []);

  //데코(얼굴, 옷) 카테고리 선택
  const [typeDecoState, setDecoTypeState] = useState<[boolean, boolean]>([
    true,
    false,
  ]);
  const handleDecoClick = (idx: number) => {
    const newArr = [false, false] as [boolean, boolean];
    newArr[idx] = true;
    setDecoTypeState(newArr);
  };

  const handleAvatarUpload = async () => {
    if (!defaultgltf) return;

    try {
      const uid = localStorage.getItem("id");

      await axios.patch(
        `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`,
        {
          userAvatar: {
            eyes: defaultgltf["eyes"],
            mouth: defaultgltf["mouth"],
            top: defaultgltf["top"],
            bottom: defaultgltf["bottom"],
            accessory: defaultgltf["accessory"],
            shoes: defaultgltf["shoes"],
          },
        }
      );
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <div className="layoutDeco">
      <div>
        <HeaderDeco />
      </div>
      <div
        className="avatarDeco"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(/img/home/background.png)",
        }}
      >
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
            <spotLight
              intensity={1}
              position={[0, 30, 80]}
              angle={0.2}
              castShadow
            />
            <ambientLight intensity={0.5} />
            {defaultgltf && (
              <GltfGroupModels
                defaultgltf={defaultgltf}
                setDefaultGltf={setDefaultGltf}
                typeDecoState={typeDecoState}
              />
            )}
            <OrbitControls
              enableZoom={false} // 확대/축소 비활성화
              enableRotate={true} // 회전 활성화
              enablePan={false} // 이동 비활성화
              enableDamping // 부드러운 움직임 효과 활성화
              dampingFactor={0.1} // 부드러운 움직임 강도 설정
            />
          </Canvas>
        </Suspense>

        {typeDecoState[0] ? <Item type={"face"} /> : <Item type={"cloth"} />}
      </div>
      <div className="saveAvatar" onClick={() => handleAvatarUpload()}>
        <img src={"/img/deco/save.png"} alt="" />
      </div>

      <div className="chooseBtnGroup">
        <div
          className="btn_face"
          onClick={() => {
            handleDecoClick(0);
          }}
        >
          <img
            src={
              typeDecoState[0]
                ? "/img/VectorsmileTrue.png"
                : "/img/VectorsmileFalse.png"
            }
            alt=""
          />
        </div>
        <div
          className="btn_cloth"
          onClick={() => {
            handleDecoClick(1);
          }}
        >
          <img
            src={
              typeDecoState[1]
                ? "/img/VectorclothTrue.png"
                : "/img/VectorclothFalse.png"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
