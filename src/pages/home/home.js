//import React from 'react';
import Footer from "../../footer";
import Header from "../../headers/header";
import "../../css/layout.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "../../css/customBottomSheet.css";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Mypost from "./myPost";
import axios from "axios";
import { AnimationMixer } from "three";

const myAssetArray = JSON.parse(localStorage.getItem("gltf"));
const tmp = ["", "", "", "", "", ""];
localStorage.setItem("gltf", JSON.stringify(tmp));

const GltfGroupModels = (props) => {
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
      process.env.PUBLIC_URL + "gltf/avatar/animation_met.gltf";
    const KeyringGltfPath = process.env.PUBLIC_URL + "/gltf/avatar/keyring.glb";
    const StageGltfPath = process.env.PUBLIC_URL + "/gltf/avatar/stage.glb";

    const gltfLoader = new GLTFLoader();
    putDecoGltf(myAssetArray[0], 1.1, 0, -0.04, 0, "eyes");
    putDecoGltf(myAssetArray[1], 1.1, 0, -0.04, 0, "mouth");
    putDecoGltf(myAssetArray[2], 1.1, 0, -0.04, 0, "top");
    putDecoGltf(myAssetArray[3], 1.1, 0, -0.04, 0, "bottom");
    putDecoGltf(myAssetArray[4], 1.1, 0, -0.04, 0, "shoes");
    putDecoGltf(myAssetArray[5], 1.1, 0, -0.04, 0, "accessory");
    putDecoGltf(KeyringGltfPath, 0.02, 0, 0.155, 0.01);
    putDecoGltf(StageGltfPath, 0.04, 0, -0.055, 0.0025);
    //avatar gltf 모델을 로드하여 그룹에 추가
    gltfLoader.load(AvatarGltfPath, (parentGltf) => {
      const avatarModel = parentGltf.scene;
      avatarModel.scale.set(1.1, 1.1, 1.1); // 부모 모델 크기 조정
      avatarModel.position.set(0, -0.04, 0);

      // //텍스쳐 적용 -> 이번에 적용할 수도 있는 기능이라 남겨두었습니다!
      // avatarModel.traverse((child) => {
      //   if (child.isMesh) {
      //     child.material = child.material.clone();
      //     child.material.map = texture;
      //   }
      // });

      groupRef.current.add(avatarModel);
    });
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
          `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`
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
      const promises = [];
      try {
        for (const area of areas) {
          for (const kind of kinds[area]) {
            promises.push(
              new Promise(async () => {
                const response = await axios.get(
                  `https://us-central1-netural-app.cloudfunctions.net/api/assets/${area}/${kind}`
                );

                const desiredAssetID = getDesiredAssetID(kind);
                const desiredItem = response.data.find(
                  (item) => item.assetID === array[desiredAssetID]
                );

                if (desiredItem) {
                  assetGltfArray[desiredAssetID] = desiredItem.assetGltf;
                }
              })
            );
          }
        }
        await Promise.all(promises);

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

const AvatarScene = () => {
  const avatarRef = useRef();
  const clothingRef = useRef();
  const mixer = useRef(); // AnimationMixer를 저장할 ref를 만듭니다.

  useEffect(() => {
    const loader = new GLTFLoader();

    let avatarSkeleton = null; // 아바타의 뼈 구조를 저장할 변수
    // 아바타 모델 로드
    loader.load(
      process.env.PUBLIC_URL + "gltf/avatar/animation_avatar.gltf",
      (gltf) => {
        const avatarMesh = gltf.scene;
        avatarRef.current.add(avatarMesh);

        // 아바타의 뼈 구조 추출
        avatarSkeleton = gltf.scene.getObjectByName("mixamorig_Spine1"); // 실제 이름으로 변경

        // 의상 메쉬 로드
        loader.load(
          process.env.PUBLIC_URL + "gltf/top/daniel_top.gltf",
          (gltf) => {
            const clothingMesh = gltf.scene;
            clothingRef.current.add(clothingMesh);
          }
        );
        loader.load(
          process.env.PUBLIC_URL + "gltf/bottom/hani_pants.gltf",
          (gltf) => {
            const clothingMesh = gltf.scene;
            clothingRef.current.add(clothingMesh);
          }
        );

        // 애니메이션 Mixer를 생성하고 애니메이션 클립을 추가합니다.
        mixer.current = new AnimationMixer(avatarMesh);
        const clips = gltf.animations;
        if (clips && clips.length > 0) {
          clips.forEach((clip) => {
            mixer.current.clipAction(clip).play(); // 모든 애니메이션 클립을 재생합니다.
          });
        }
      }
    );

    // 프레임마다 아바타 메쉬의 뼈 구조를 기반으로 의상 메쉬의 위치 업데이트
    const updateClothingPosition = () => {
      if (avatarSkeleton) {
        //clothingRef.current.position.copy(avatarSkeleton.position);
        clothingRef.current.position.x = avatarSkeleton.position.x;
        clothingRef.current.position.z = avatarSkeleton.position.z;
        clothingRef.current.quaternion.copy(avatarSkeleton.quaternion);
        clothingRef.current.scale.copy(avatarSkeleton.scale);
      }
    };

    // Three.js 렌더링 루프에서 위치 업데이트 함수와 애니메이션 업데이트 함수 호출
    const animate = () => {
      updateClothingPosition();
      if (mixer.current) {
        mixer.current.update(0.01); // AnimationMixer 업데이트
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <group ref={avatarRef}>
      <group ref={clothingRef} />
    </group>
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

            {/*<GltfGroupModels />*/}
            <AvatarScene />

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
