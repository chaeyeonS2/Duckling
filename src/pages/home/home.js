//import React from 'react';
import Footer from "../../footer";
import Header from "../../headers/header";
import "../../css/layout.css";
import React, {
  useLayoutEffect,
  useState,
  Suspense,
  Component,
  useRef,
  useEffect,
  useContext,
} from "react";
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import { useGLTF } from "@react-three/drei";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "../../css/customBottomSheet.css";
//import 'react-spring-bottom-sheet/dist/style.css'; // 스타일 파일을 불러옵니다.
//import { css } from '@emotion/react';
import { OrbitControls } from "@react-three/drei";
import Mypost from "./myPost";
import { MeshBasicMaterial, PlaneGeometry } from "three";
import { AppContext } from "../avatar/avatarDeco";
import axios from "axios";

const myAssetArray = JSON.parse(localStorage.getItem("gltf"));
const myAssetIdArray = JSON.parse(localStorage.getItem("assetID"));
const eyeGltfPath =
  process.env.PUBLIC_URL + "/gltf/eye/NewJeans_DANIEL_eye.gltf";
const mouthGltfPath =
  process.env.PUBLIC_URL + "/gltf/mouth/NewJeans_DANIEL_mouth.gltf";
const topGltfPath = process.env.PUBLIC_URL + "/gltf/top/daniel_top.gltf";
const bottomGltfPath =
  "https://firebasestorage.googleapis.com/v0/b/netural-app.appspot.com/o/bottoms_gltf%2Fhb_hani_pants.gltf?alt=media&token=413ebc73-1132-4f6f-8fbf-b9fc58e94dec";
//const bottomGltfPath = process.env.PUBLIC_URL + '/gltf/bottom/daniel_skirt.gltf';
//const dressGltfPath = process.env.PUBLIC_URL + '';
const shoesGltfPath =
  process.env.PUBLIC_URL + "/gltf/shoes/Sneakers_Yellow.glb";
const bagGltfPath = "";
const accessoryGltfPath = "";
const tmp = ["", "", "", "", "", ""];
localStorage.setItem("gltf", JSON.stringify(tmp));

const GltfGroupModels = (props) => {
  let isFirstLoad = true; // 최초 로드 여부를 확인하는 변수

  const putDecoGltf = (gltfPath, setScale, positionX, positionY, positionZ) => {
    if (gltfPath) {
      // gltfPath가 null이나 undefined가 아닌 경우에만 실행
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(gltfPath, (childGltf) => {
        const model = childGltf.scene;
        model.scale.set(setScale, setScale, setScale);
        model.position.set(positionX, positionY, positionZ);
        groupRef.current.add(model);
      });
    } else {
      console.log("Invalid gltfPath:", gltfPath);
    }
  };

  const groupRef = useRef(props);

  // 부모와 자식 gltf 모델들을 로드하고 그룹에 추가하는 함수
  const loadModels = () => {
    const AvatarGltfPath =
      process.env.PUBLIC_URL + "gltf/avatar/cheek_avatarglb.gltf";
    const KeyringGltfPath = process.env.PUBLIC_URL + "/gltf/avatar/keyring.glb";
    const StageGltfPath = process.env.PUBLIC_URL + "/gltf/avatar/stage.glb";

    const gltfLoader = new GLTFLoader();
    //const texture = new TextureLoader().load('/gltf/avatar/wood.jpg');

    // 파일 path, scale, position(x, y, z) 순서
    // putDecoGltf(topGltfPath, 1.1, 0,-0.04,0);
    // putDecoGltf(bottomGltfPath, 1.1, 0,-0.04,0);
    // putDecoGltf(shoesGltfPath, 1.1, 0,-0.04,0);
    // putDecoGltf(accessoryGltfPath, 1.1, 0,-0.04,0);
    // putDecoGltf(bagGltfPath, 1.1, 0,-0.04,0);
    putDecoGltf(myAssetArray[0], 1.1, 0, -0.04, 0, "eyes");
    putDecoGltf(myAssetArray[1], 1.1, 0, -0.04, 0, "mouth");
    putDecoGltf(myAssetArray[2], 1.1, 0, -0.04, 0, "top");
    putDecoGltf(myAssetArray[3], 1.1, 0, -0.04, 0, "bottom");
    putDecoGltf(myAssetArray[4], 1.1, 0, -0.04, 0, "shoes");
    putDecoGltf(myAssetArray[5], 1.1, 0, -0.04, 0, "accessory");

    //avatar gltf 모델을 로드하여 그룹에 추가
    gltfLoader.load(AvatarGltfPath, (parentGltf) => {
      const avatarModel = parentGltf.scene;
      avatarModel.scale.set(1.1, 1.1, 1.1); // 부모 모델 크기 조정
      avatarModel.position.set(0, -0.04, 0);

      // //텍스쳐 적용
      // avatarModel.traverse((child) => {
      //   if (child.isMesh) {
      //     child.material = child.material.clone();
      //     child.material.map = texture;
      //   }
      // });

      groupRef.current.add(avatarModel);
    });
    //keyring gltf 모델을 로드하여 그룹에 추가
    gltfLoader.load(KeyringGltfPath, (parentGltf) => {
      const model = parentGltf.scene;
      model.scale.set(0.02, 0.02, 0.02); // 부모 모델 크기 조정
      model.position.set(0, 0.155, 0.01);
      groupRef.current.add(model);
    });
    gltfLoader.load(
      process.env.PUBLIC_URL + "/gltf/avatar/nose.gltf",
      (parentGltf) => {
        const model = parentGltf.scene;
        model.scale.set(1.1, 1.1, 1.1); // 부모 모델 크기 조정
        model.position.set(0, -0.04, 0);
        groupRef.current.add(model);
      },
    );
    //stage gltf 모델을 로드하여 그룹에 추가
    putDecoGltf(StageGltfPath, 0.04, 0, -0.055, 0.0025);

    // // eye gltf 모델을 로드하여 그룹에 추가
    // gltfLoader.load(eyeGltfPath, (childGltf) => {
    //   const model = childGltf.scene;
    //   model.scale.set(1.1, 1.1, 1.1); // 자식 모델 크기 조정
    //   model.position.set(0,-0.04,0); // 자식 모델 위치 설정
    //   groupRef.current.add(model);
    // });
    // // mouth gltf 모델을 로드하여 그룹에 추가
    // gltfLoader.load(mouthGltfPath, (childGltf) => {
    //   const model = childGltf.scene;
    //   model.scale.set(1.1, 1.1, 1.1); // 자식 모델 크기 조정
    //   model.position.set(0,-0.04,0); // 자식 모델 위치 설정
    //   groupRef.current.add(model);
    // });
  };

  const [defaultAsset, setDefaultAsset] = useState([]);
  const [defaultgltf, setDefaultGltf] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  // gltf 모델들을 로드하기 위해 컴포넌트가 마운트될 때 한 번만 실행합니다.
  useEffect(() => {
    const uid = localStorage.getItem("id");
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`,
        );
        setUserInfo(response.data);
        setDefaultAsset(response.data.userAvatar);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, []);
  const array = [
    defaultAsset.eyes,
    defaultAsset.mouth,
    defaultAsset.top,
    defaultAsset.bottom,
    defaultAsset.shoes,
    defaultAsset.accessory,
  ];

  useEffect(() => {
    localStorage.setItem("assetID", JSON.stringify(array));

    const data = localStorage.getItem("assetID");
    console.log("내 아바타 에셋들", data); // [1, 2, 3, 4, 5]

    const getAssetInfo = async () => {
      var assetGltfTmp = [0, 0, 0, 0, 0];
      const areas = ["face", "body"];
      const kinds = {
        face: ["eyes", "mouth"],
        body: ["top", "bottom", "shoes", "accessory"],
      };
      const assetGltfArray = ["", "", "", "", ""]; // 초기값은 null로 설정 또는 원하는 기본 값으로 설정 가능

      try {
        for (const area of areas) {
          for (const kind of kinds[area]) {
            const response = await axios.get(
              `https://us-central1-netural-app.cloudfunctions.net/api/assets/${area}/${kind}`,
            );

            const desiredAssetID = getDesiredAssetID(kind);
            const desiredItem = response.data.find(
              (item) => item.assetID === array[desiredAssetID],
            );

            if (desiredItem) {
              assetGltfArray[desiredAssetID] = desiredItem.assetGltf;
            }
          }
        }

        console.log("Asset gltf array:", assetGltfArray);

        setDefaultGltf(assetGltfArray);
        // 이곳에서 assetGltfArray를 활용하는 로직을 추가할 수 있습니다.
      } catch (error) {
        console.error(error);
      }
    };

    // kind에 따른 assetID 매핑
    const getDesiredAssetID = (kind) => {
      if (kind === "eyes") return 0;
      if (kind === "mouth") return 1;
      if (kind === "top") return 2;
      if (kind === "bottom") return 3;
      if (kind === "shoes") return 4;
      if (kind === "accessory") return 5;
      // if (kind === "eyes") return array[0];
      // if (kind === "mouth") return array[1];
      // if (kind === "bottom") return array[2];
      // if (kind === "shoes") return array[3];
      // if (kind === "accessory") return array[4];
      return -1; // 기본 값 설정
      // try {
      //   for (const area of areas) {
      //     for (const kind of kinds[area]) {
      //       const response = await axios.get(`https://us-central1-netural-app.cloudfunctions.net/api/assets/${area}/${kind}`);
      //       //const assetGltfArray = response.data.assetGltf;
      //       var assetGltfArray = [];

      //       response.data.forEach(item => {
      //         assetGltfArray.push(item.assetGltf);
      //       });
      //       console.log(`Asset for ${area}/${kind}:`, assetGltfArray);
      //       // 이곳에 assetGltf를 활용하는 로직을 추가할 수 있습니다.
      //       // assetID로 해당 아이템 찾기
      //       var desiredAssetID = -1;
      //       if(kind === "eyes"){
      //         desiredAssetID = 0;
      //       }
      //       else if(kind === "mouth"){
      //         desiredAssetID = 1;
      //       }
      //       else if(kind === "bottom"){
      //         desiredAssetID = 2;
      //       }
      //       else if(kind === "shoes"){
      //         desiredAssetID = 3;
      //       }
      //       else if(kind === "accessory"){
      //         desiredAssetID = 4;
      //       }
      //     const desiredItem = assetGltfArray.find(item => item.assetID === array[desiredAssetID]);
      //     assetGltfTmp[desiredAssetID] = desiredItem.assetGltf;

      //     }
      //   }
      //   setDefaultGltf(assetGltfTmp);

      // } catch (error) {
      //   console.error(error);
      // }
    };
    getAssetInfo();
  }, [defaultAsset]);

  useEffect(() => {
    localStorage.setItem("gltf", JSON.stringify(defaultgltf));

    const data = localStorage.getItem("gltf");
    console.log("내 아바타 주소들", data); // [1, 2, 3, 4, 5]

    setTimeout(() => {
      loadModels();
    }, 6000); // 일정 시간 후에 실행
  }, [defaultgltf]);

  useEffect(() => {
    //loadModels();
    if (userInfo.length) {
      console.log("테스트", userInfo);
    }
  }, [userInfo]);

  return (
    <group ref={groupRef} position={[0, -0.01, 0]} rotation={[0.08, 0, 0]} />
  );
};

const Home = () => {
  return (
    <div className="layoutA">
      <Header />
      <div
        className="content"
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
              penumbra={1}
              castShadow
            />
            <ambientLight intensity={0.5} />

            <GltfGroupModels />

            {/* 마우스 컨트롤 */}
            {/* <OrbitControls /> */}
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
            {/* 이하 Three.js 관련 요소들을 추가할 수 있습니다 */}
          </Canvas>
        </Suspense>
      </div>
      <Mypost />

      <Footer btn={1} />
    </div>
  );
};

export default Home;
