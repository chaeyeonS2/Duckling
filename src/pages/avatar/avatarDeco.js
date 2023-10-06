import HeaderDeco from "../../headers/headerDeco";
import "../../css/avatarDeco.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Item from "./item";
import axios from "axios";
import { OrbitControls } from "@react-three/drei";

const itemTypeArray = ["eyes", "mouth", "top", "bottom", "shoes", "accessory"];
var addGltfPath = "";
var type = "";
var assetid = "";

export function isClick(index, itemtype, gltfPath) {
  //의상 index 받아오기
  type = itemtype;
  assetid = index;
  addGltfPath = gltfPath;
  const event = new CustomEvent("globalFunctionCalled");
  window.dispatchEvent(event);
}

const AvatarDeco = () => {
  var [defaultgltf, setgltfPathArray] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem("id");
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`
        );
        await setgltfPathArray(response.data.userAvatar);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, []);

  const GltfGroupModels = (props) => {
    const groupRef = useRef();

    useEffect(() => {
      function handleGlobalFunctionCall() {
        putDecoGltf(addGltfPath, 1.1, 0, -0.04, 0, type, assetid);
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
      gltfPath,
      setScale,
      positionX,
      positionY,
      positionZ,
      type
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

              const newArray = defaultgltf;
              newArray[n] = gltfPath;
              setgltfPathArray(newArray);
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
    const removeDecoGltf = (type) => {
      if (groupRef.current) {
        const childToRemove = groupRef.current.children.find(
          (child) => child.userData.type === type
        );

        if (childToRemove) {
          groupRef.current.remove(childToRemove);
        }
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

      putDecoGltf(
        process.env.PUBLIC_URL + "/gltf/avatar/cheek_avatarglb.gltf",
        1.1,
        0,
        -0.04,
        0,
        "etc"
      );
      putDecoGltf(
        process.env.PUBLIC_URL + "/gltf/avatar/keyring.glb",
        0.02,
        0,
        0.155,
        0.01,
        "etc"
      );
      putDecoGltf(
        process.env.PUBLIC_URL + "/gltf/avatar/nose.gltf",
        1.1,
        0,
        -0.04,
        0,
        "etc"
      );
      putDecoGltf(
        process.env.PUBLIC_URL + "/gltf/avatar/stage.glb",
        0.04,
        0,
        -0.055,
        0.0025,
        "etc"
      );
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
  };

  //데코(얼굴, 옷) 카테고리 선택
  const [typeDecoState, setDecoTypeState] = useState([true, false]);
  const decoArray = ["face", "cloth"];

  const handleDecoClick = (idx) => {
    const newArr = Array(decoArray.length).fill(false);
    newArr[idx] = true;
    setDecoTypeState(newArr);
  };

  const handleAvatarUpload = async () => {
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
              peassetidbra={1}
              castShadow
            />
            <ambientLight intensity={0.5} />
            <GltfGroupModels />
            <OrbitControls
              enableZoom={false} // 확대/축소 비활성화
              enableRotate={true} // 회전 활성화
              enablePan={false} // 이동 비활성화
              enableDamping // 부드러운 움직임 효과 활성화
              dampingFactor={0.1} // 부드러운 움직임 강도 설정
              enableKeys={false} // 키보드 단축키 비활성화
              touchZoomSpeed={0} // 모바일 확대/축소 비활성화
              touchRotateSpeed={1} // 모바일 회전 활성화
            />
          </Canvas>
        </Suspense>

        {typeDecoState[0] ? <Item type={"face"} /> : <Item type={"cloth"} />}
      </div>
      <div className="saveAvatar" onClick={() => handleAvatarUpload()}>
        <img src={process.env.PUBLIC_URL + "/img/deco/save.png"} alt="" />
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
                ? process.env.PUBLIC_URL + "/img/VectorsmileTrue.png"
                : process.env.PUBLIC_URL + "/img/VectorsmileFalse.png"
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
                ? process.env.PUBLIC_URL + "/img/VectorclothTrue.png"
                : process.env.PUBLIC_URL + "/img/VectorclothFalse.png"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarDeco;
