import HeaderDeco from "../../headers/HeaderDeco";
import "../../css/avatarDeco.css";
import { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Item from "./Item";
import axios from "axios";
import { OrbitControls } from "@react-three/drei";

const itemTypeArray: Array<keyof User["userAvatar"]> = [
  "eyes",
  "mouth",
  "top",
  "bottom",
  "shoes",
  "accessory",
];
var addGltfPath = "";
var type = "";
export function isClick(itemtype: string, gltfPath: string) {
  //의상 index 받아오기
  type = itemtype;
  addGltfPath = gltfPath;
  const event = new CustomEvent("globalFunctionCalled");
  window.dispatchEvent(event);
}

interface GltfGroupModelsProps {
  typeDecoState: [boolean, boolean];
  defaultgltf: User["userAvatar"];
  setDefaultGltf: (newGltf: User["userAvatar"]) => void;
}
function GltfGroupModels({
  defaultgltf,
  typeDecoState,
  setDefaultGltf,
}: GltfGroupModelsProps) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    function handleGlobalFunctionCall() {
      putDecoGltf(addGltfPath, 1.1, 0, -0.04, 0, type);
    }

    window.addEventListener("globalFunctionCalled", handleGlobalFunctionCall);

    return () => {
      window.removeEventListener(
        "globalFunctionCalled",
        handleGlobalFunctionCall
      );
    };
  }, []);

  //deco 추가하는 함수
  const putDecoGltf = (
    gltfPath: string,
    setScale: number,
    positionX: number,
    positionY: number,
    positionZ: number,
    type: string
  ) => {
    if (gltfPath) {
      // gltfPath가 null이나 undefined가 아닌 경우에만 실행
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(gltfPath, (childGltf) => {
        const model = childGltf.scene;
        model.scale.set(setScale, setScale, setScale);
        model.position.set(positionX, positionY, positionZ);
        model.userData.type = type;

        itemTypeArray.forEach((n) => {
          if (type === n) {
            // 기존에 있고, 현재 모델의 타입과 일치하는 타입의 모델 지우기
            removeDecoGltf(type);

            const newGltf = defaultgltf;
            newGltf[n] = gltfPath;
            setDefaultGltf(newGltf);
          }
        });
        if (groupRef.current) {
          groupRef.current.add(model);
        }
      });
    } else {
      console.log("Invalid gltfPath:", gltfPath);
    }
  };

  //deco 초기화하는 함수
  const removeDecoGltf = (type: string) => {
    if (!groupRef.current) return;

    const childToRemove = groupRef.current.children.find(
      (child) => child.userData.type === type
    );

    if (childToRemove) {
      groupRef.current.remove(childToRemove);
    }
  };

  // gltf 모델들을 로드하고 그룹에 추가하는 함수
  const loadModels = () => {
    // 파일 path, scale, position(x, y, z) 순서
    putDecoGltf(defaultgltf["eyes"], 1.1, 0, -0.04, 0, "eyes");
    putDecoGltf(defaultgltf["mouth"], 1.1, 0, -0.04, 0, "mouth");
    putDecoGltf(defaultgltf["top"], 1.1, 0, -0.04, 0, "top");
    putDecoGltf(defaultgltf["bottom"], 1.1, 0, -0.04, 0, "bottom");
    putDecoGltf(defaultgltf["shoes"], 1.1, 0, -0.04, 0, "shoes");
    putDecoGltf(defaultgltf["accessory"], 1.1, 0, -0.04, 0, "accessory");

    putDecoGltf("/gltf/avatar/cheek_avatarglb.gltf", 1.1, 0, -0.04, 0, "etc");
    putDecoGltf("/gltf/avatar/keyring.glb", 0.02, 0, 0.155, 0.01, "etc");
    putDecoGltf("/gltf/avatar/nose.gltf", 1.1, 0, -0.04, 0, "etc");
    putDecoGltf("/gltf/avatar/stage.glb", 0.04, 0, -0.055, 0.0025, "etc");
  };
  useEffect(() => {
    loadModels();
  }, [defaultgltf, loadModels]);

  return (
    <group
      ref={groupRef}
      scale={typeDecoState[0] ? 1.3 : 0.8}
      position={typeDecoState[0] ? [0, -0.02, 0] : [0, 0.045, 0]}
      rotation={[0.08, 0, 0]}
    />
  );
}

const AvatarDeco = () => {
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
};

export default AvatarDeco;
