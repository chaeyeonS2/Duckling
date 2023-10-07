import "../../css/avatarDeco.css";
import { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const itemTypeArray: Array<keyof User["userAvatar"]> = [
  "eyes",
  "mouth",
  "top",
  "bottom",
  "shoes",
  "accessory",
];

// TODO: refactor
var addGltfPath = "";
var type = "";
export function isClick(itemtype: string, gltfPath: string) {
  //의상 index 받아오기
  type = itemtype;
  addGltfPath = gltfPath;
  const event = new CustomEvent("globalFunctionCalled");
  window.dispatchEvent(event);
}

export interface GltfGroupModelsProps {
  typeDecoState: [boolean, boolean];
  defaultgltf: User["userAvatar"];
  setDefaultGltf: (newGltf: User["userAvatar"]) => void;
}
export default function GltfGroupModels({
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
