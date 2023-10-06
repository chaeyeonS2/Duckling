import HeaderDeco from "../../headers/headerDeco";
import "../../css/avatarDeco.css";
<<<<<<< HEAD
import React, {
  useState,
  Suspense,
  useRef,
  useEffect,
  createContext,
} from "react";
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
import Item from "./item";
import { OrbitControls } from "@react-three/drei";
import html2canvas from "html2canvas";
import dataArrays from "./ItemArray";
import axios from "axios";

const uid = localStorage.getItem("id");
const myAssetArray = JSON.parse(localStorage.getItem("gltf"));
const myAssetIdArray = JSON.parse(localStorage.getItem("assetID"));
// var eyeGltfPath = myAssetArray[0];
// var mouthGltfPath = myAssetArray[1];
// var topGltfPath = myAssetArray[2];
// var bottomGltfPath = myAssetArray[3];
// //const dressGltfPath = process.env.PUBLIC_URL + '';
// var shoesGltfPath = myAssetArray[4];
// var bagGltfPath = '';
// var accessoryGltfPath = myAssetArray[5];
// var eyeGltfPath = process.env.PUBLIC_URL  +'/gltf/eye/NewJeans_DANIEL_eye.gltf';
// var mouthGltfPath = process.env.PUBLIC_URL + '/gltf/mouth/NewJeans_DANIEL_mouth.gltf';
// var topGltfPath = process.env.PUBLIC_URL + '/gltf/top/daniel_top.gltf';
// var bottomGltfPath = process.env.PUBLIC_URL + '/gltf/bottom/daniel_skirt.gltf';
// //const dressGltfPath = process.env.PUBLIC_URL + '';
// var shoesGltfPath = process.env.PUBLIC_URL + '/gltf/shoes/Sneakers_Yellow.glb';
// var bagGltfPath = '';
// var accessoryGltfPath = '';

var itemTypeArray = ["eyes", "mouth", "top", "bottom", "shoes", "accessory"];
var gltfTypeArray = [
  "gltfEye",
  "gltfMouth",
  "gltfTop",
  "gltfBottom",
  "gltfShoes",
  "gltfEtc",
];
//var gltfPathArray = [eyeGltfPath, mouthGltfPath, topGltfPath, bottomGltfPath, shoesGltfPath, accessoryGltfPath];
//var gltfPathArray = [eyeGltfPath, mouthGltfPath, topGltfPath, bottomGltfPath, shoesGltfPath, accessoryGltfPath];
=======
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Item from "./item";
import axios from "axios";
import { OrbitControls } from "@react-three/drei";

const itemTypeArray = ["eyes", "mouth", "top", "bottom", "shoes", "accessory"];
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
var addGltfPath = "";
var type = "";
var assetid = "";

export function isClick(index, itemtype, gltfPath) {
  //의상 index 받아오기
  type = itemtype;
  assetid = index;
  addGltfPath = gltfPath;
<<<<<<< HEAD
  //addGltfPath = dataArrays[matchItemtoGltf()][index];
=======
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
  const event = new CustomEvent("globalFunctionCalled");
  window.dispatchEvent(event);
}

<<<<<<< HEAD
// const matchItemtoGltf = () => {
//   const index = itemTypeArray.indexOf(type);
//   console.log(gltfTypeArray[index]);
//   return gltfTypeArray[index];
// }

const AvatarDeco = () => {
  const [data, setData] = useState(null);

  var [gltfPathdefault, setgltfPathArray] = useState(myAssetArray);
  var [assetIddefault, setAssetIdArray] = useState(myAssetIdArray);
=======
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
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda

  const GltfGroupModels = (props) => {
    const groupRef = useRef();

    useEffect(() => {
      function handleGlobalFunctionCall() {
<<<<<<< HEAD
        console.log(type);
        // 원하는 작업 수행
        //removeDecoGltf();
        putDecoGltf(addGltfPath, 1.1, 0, -0.04, 0, type, assetid);
        console.log(addGltfPath);
=======
        putDecoGltf(addGltfPath, 1.1, 0, -0.04, 0, type, assetid);
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
      }

      window.addEventListener("globalFunctionCalled", handleGlobalFunctionCall);

      return () => {
        window.removeEventListener(
          "globalFunctionCalled",
<<<<<<< HEAD
          handleGlobalFunctionCall,
=======
          handleGlobalFunctionCall
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
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
<<<<<<< HEAD
      type,
      aid,
=======
      type
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
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

<<<<<<< HEAD
              const newArray = myAssetArray;
              newArray[itemTypeArray.indexOf(n)] = gltfPath;
              setgltfPathArray(newArray);

              const newArray2 = myAssetIdArray;
              newArray2[itemTypeArray.indexOf(n)] = aid;
              setAssetIdArray(newArray2);
            }
          });

          groupRef.current.add(model);
=======
              const newArray = defaultgltf;
              newArray[n] = gltfPath;
              setgltfPathArray(newArray);
            }
          });
          if (groupRef.current) {
            groupRef.current.add(model);
          }
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
        });
      } else {
        console.log("Invalid gltfPath:", gltfPath);
      }
    };

    //deco 초기화하는 함수
    const removeDecoGltf = (type) => {
<<<<<<< HEAD
      const childToRemove = groupRef.current.children.find(
        (child) => child.userData.type === type,
      );

      if (childToRemove) {
        //console.log(childToRemove);
        groupRef.current.remove(childToRemove);
      }
      // 모델이 로드되어 있으면 제거
      //groupRef.current.remove(groupRef.current.children[0]);
      //setModelLoaded(false);
    };

    const groupRef = useRef(props);
    // gltf 모델들을 로드하고 그룹에 추가하는 함수
    const loadModels = () => {
      const AvatarGltfPath =
        process.env.PUBLIC_URL + "gltf/avatar/cheek_avatarglb.gltf";
      const KeyringGltfPath =
        process.env.PUBLIC_URL + "/gltf/avatar/keyring.glb";
      const StageGltfPath = process.env.PUBLIC_URL + "/gltf/avatar/stage.glb";

      const gltfLoader = new GLTFLoader();

      // 파일 path, scale, position(x, y, z) 순서
      putDecoGltf(myAssetArray[0], 1.1, 0, -0.04, 0, "eyes", myAssetIdArray[0]);
      putDecoGltf(
        myAssetArray[1],
        1.1,
        0,
        -0.04,
        0,
        "mouth",
        myAssetIdArray[1],
      );
      putDecoGltf(myAssetArray[2], 1.1, 0, -0.04, 0, "top", myAssetIdArray[2]);
      putDecoGltf(
        myAssetArray[3],
        1.1,
        0,
        -0.04,
        0,
        "bottom",
        myAssetIdArray[3],
      );
      putDecoGltf(
        myAssetArray[4],
        1.1,
        0,
        -0.04,
        0,
        "shoes",
        myAssetIdArray[4],
      );
      putDecoGltf(
        myAssetArray[5],
        1.1,
        0,
        -0.04,
        0,
        "accessory",
        myAssetIdArray[5],
      );

      //avatar gltf 모델을 로드하여 그룹에 추가
      gltfLoader.load(AvatarGltfPath, (parentGltf) => {
        const avatarModel = parentGltf.scene;
        avatarModel.scale.set(1.1, 1.1, 1.1); // 부모 모델 크기 조정
        avatarModel.position.set(0, -0.04, 0);
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
    };

    // gltf 모델들을 로드하기 위해 컴포넌트가 마운트될 때 한 번만 실행합니다.
    // useEffect(() => {
    //   loadModels();
    // }, [isClick]);
    useEffect(() => {
      loadModels();
      // if(isClick){
      //   putDecoGltf(addGltfPath, 1.1, 0,-0.04,0);
      //   console.log("success");
      // }
    }, [addGltfPath]);

    // useEffect(()=>{
    //   console.log("success");
    //   putDecoGltf(addGltfPath, 1.1, 0,-0.04,0);
    // },[addGltfPath]);
=======
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
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda

    return (
      <group
        ref={groupRef}
        scale={typeDecoState[0] ? 1.3 : 0.8}
        position={typeDecoState[0] ? [0, -0.02, 0] : [0, 0.045, 0]}
<<<<<<< HEAD
        //scale={props.scale}
        //position={props.position}
        //position={[0, -0.01, 0]}
=======
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
        rotation={[0.08, 0, 0]}
      />
    );
  };

  //데코(얼굴, 옷) 카테고리 선택
  const [typeDecoState, setDecoTypeState] = useState([true, false]);
  const decoArray = ["face", "cloth"];
<<<<<<< HEAD

  const handleDecoClick = (idx) => {
    const newArr = Array(decoArray.length).fill(false);
    newArr[idx] = true;
    setDecoTypeState(newArr);
  };
  var [isClick, setClick] = useState(false);

  var getData = (getClick) => {
    //isClick = getGltfPath;
    setClick(getClick);
    console.log("ahppy");
  };

  const captureRef = useRef(null);
  const canvasRef = useRef(null); // 캡처용 캔버스

  const handleCapture = () => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;

      const canvasWidth = canvasElement.offsetWidth;
      const canvasHeight = canvasElement.offsetHeight;

      // Canvas를 이미지 데이터 URL로 변환
      const imgDataUrl = canvasElement.toDataURL("image/png");

      // 이미지 다운로드 링크 생성
      const downloadLink = document.createElement("a");
      downloadLink.href = imgDataUrl;
      downloadLink.download = "captured_image.png";
      downloadLink.click();
    }
  };
  // const captureRef = useRef(null);
  // const handleCapture = () => {
  //   if (captureRef.current) {
  //     const canvasElement = captureRef.current;
  //     const canvasWidth = canvasElement.offsetWidth;
  //     const canvasHeight = canvasElement.offsetHeight;

  //     // Canvas를 이미지로 변환
  //     html2canvas(canvasElement, { width: canvasWidth, height: canvasHeight }).then(canvas => {
  //       // Canvas를 이미지 URL로 변환
  //       const imgDataUrl = canvas.toDataURL('image/png');

  //       // 이미지 다운로드 링크 생성
  //       const downloadLink = document.createElement('a');
  //       downloadLink.href = imgDataUrl;
  //       downloadLink.download = 'captured_image.png';
  //       downloadLink.click();
  //     });
  //   }
  // };
  //   const handleCapture = () => {
  //     console.log("capture");
  //   if (captureRef.current) {
  //     html2canvas(captureRef.current).then(canvas => {
  //       // Canvas를 이미지 URL로 변환
  //       const imgDataUrl = canvas.toDataURL('image/png');

  //       // 이미지 다운로드 링크 생성
  //       const downloadLink = document.createElement('a');
  //       downloadLink.href = imgDataUrl;
  //       downloadLink.download = 'captured_image.png';
  //       downloadLink.click();
  //     });
  //   }
  // };

  const handleAvatarUpload = async () => {
    try {
      console.log("gltf:", gltfPathdefault);
      console.log("asset:", assetIddefault);
      localStorage.setItem("assetID", JSON.stringify(assetIddefault));
      localStorage.setItem("gltf", JSON.stringify(gltfPathdefault));
      const response = await axios.patch(
        `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`,
        {
          userAvatar: {
            eyes: assetIddefault[0],
            mouth: assetIddefault[1],
            top: assetIddefault[2],
            bottom: assetIddefault[3],
            accessory: assetIddefault[4],
            shoes: assetIddefault[5],
          },
        },
      );
      console.log("asset upload success");
=======

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
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
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
<<<<<<< HEAD
            ref={canvasRef}
=======
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
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
<<<<<<< HEAD
            {/* <ParentAndbottomModels /> */}
            <GltfGroupModels />
            {/* {typeDecoState[0] ? <GltfGroupModels
                                                scale= {1.3}
                                                position={[0,-0.02,0]}
                                            /> :
                                            <GltfGroupModels
                                                scale= {0.8}
                                                position={[0,0.045,0]}
                                                // eyePath = {process.env.PUBLIC_URL + "/gltf/eye/NewJeans_HANI_eye.gltf"}
                                                // mouthGltfPath = {process.env.PUBLIC_URL + "/gltf/mouth/NewJeans_HANI_mouth.gltf"}
                        />} */}
            {/* <OrbitControls /> */}
=======
            <GltfGroupModels />
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
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
<<<<<<< HEAD
            {/* 이하 Three.js 관련 요소들을 추가할 수 있습니다 */}
          </Canvas>
        </Suspense>

        {typeDecoState[0] ? (
          <Item type={"face"} getData={getData} />
        ) : (
          <Item type={"cloth"} getData={getData} />
        )}
        {/* {typeDecoState[1] ? <Item type={"cloth"} /> : ''} */}
      </div>
      <div className="saveAvatar" onClick={() => handleAvatarUpload()}>
        <img src={process.env.PUBLIC_URL + "/img/deco/save.png"} />
=======
          </Canvas>
        </Suspense>

        {typeDecoState[0] ? <Item type={"face"} /> : <Item type={"cloth"} />}
      </div>
      <div className="saveAvatar" onClick={() => handleAvatarUpload()}>
        <img src={process.env.PUBLIC_URL + "/img/deco/save.png"} alt="" />
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
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
<<<<<<< HEAD
=======
            alt=""
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
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
<<<<<<< HEAD
=======
            alt=""
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
          />
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
var gltfArray = [
  process.env.PUBLIC_URL + "/gltf/bottom/hani_pants.gltf",
  process.env.PUBLIC_URL + "/gltf/top/hani_top.gltf",
  process.env.PUBLIC_URL + "/gltf/bottom/herin_skirt.gltf",
  process.env.PUBLIC_URL + "/gltf/top/herin_top.gltf",
  process.env.PUBLIC_URL + "/gltf/bottom/hyein_pants.gltf",
  process.env.PUBLIC_URL + "/gltf/top/hyein_top.gltf",
  process.env.PUBLIC_URL + "/gltf/bottom/minji_pants.gltf",
  process.env.PUBLIC_URL + "/gltf/top/minji_top.gltf",
];

=======
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
export default AvatarDeco;
