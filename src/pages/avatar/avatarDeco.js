import { Link } from "react-router-dom";
import Footer from "../../footer";
import HeaderDeco from "../../headers/headerDeco";
import "../../css/avatarDeco.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';
import Item from "./item";
import { OrbitControls } from '@react-three/drei';
import html2canvas from 'html2canvas';

// const NewMapModel = (props) => {
//     const { scene } = useGLTF(process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf');
    
//     return (
//     <mesh>
//         <pointLight intensity={1}/>
//         <primitive 
//             object={scene}
//             scale={props.scale}
//             position={props.position}
//             //cloth일 경우
//             // scale={1.2}
//             // position={[0,-0.05,0]}
//         />
//     </mesh>
     
//     );
// };

// const ItemModel = (props) => {
//     const { scene } = useGLTF(process.env.PUBLIC_URL  +'/gltf/bottom/HYERIN_HB.gltf');
//     //const { scene } = useGLTF(process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf');

//     return (
//     <mesh>
//         {/* <boxGeometry args={[0.05,0.05,0.05]}/>
//         <meshStandardMaterial color={"blue"} /> */}
//         <pointLight intensity={1}/>
//         <primitive 
//             object={scene}
//             // scale={props.scale}
//             // position={props.position}
//             //cloth일 경우
//             scale={0.0002}
//             position={[0,-0.005,0.01]}
            
//         />
//     </mesh>
     
//     );
// };
  
const eyeGltfPath = process.env.PUBLIC_URL  +'/gltf/eye/NewJeans_eye/NewJeans_HANI_eye.gltf';
const mouthGltfPaht = process.env.PUBLIC_URL + '/gltf/mouth/NewJeans_mouth/NewJeans_DANIEL_mouth.gltf';
const topGltfPath = process.env.PUBLIC_URL + '/gltf/top/hyein_top.gltf';
const bottomGltfPath =   process.env.PUBLIC_URL + "/gltf/bottom/daniel_skirt.gltf";
const dressGltfPath = process.env.PUBLIC_URL + ''; 
const shoesGltfPath = process.env.PUBLIC_URL + '/gltf/shoes/Sneakers_Yellow.glb';
const bagGltfPath = process.env.PUBLIC_URL + '/gltf/bag/KR_sh_bag_w.glb';
const accessoryGltfPath = process.env.PUBLIC_URL + '/gltf/accessory/butterfly_pin_set.glb'; 

var itemTypeArray = ['eye', 'mouth', 'top', 'bottom', 'shoes', 'etc'];

var addGltfPath = '';
var type = '';
export function isClick(index, itemtype){ //의상 index 받아오기
  type = itemtype;
  addGltfPath = gltfArray[index];
  const event = new CustomEvent('globalFunctionCalled');
  window.dispatchEvent(event);
}

const GltfGroupModels = (props) => {
  useEffect(() => {
    function handleGlobalFunctionCall() {
      console.log(type);
      // 원하는 작업 수행
      //removeDecoGltf();
      putDecoGltf(addGltfPath, 1.1, 0,-0.04,0, type);
      console.log(addGltfPath);
    }

    window.addEventListener('globalFunctionCalled', handleGlobalFunctionCall);

    return () => {
      window.removeEventListener('globalFunctionCalled', handleGlobalFunctionCall);
    };
  }, []);
  
  
  //deco 추가하는 함수
  const putDecoGltf = (gltfPath, setScale, positionX, positionY, positionZ, type) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(gltfPath, (childGltf) => {
    const model = childGltf.scene;
    model.scale.set(setScale, setScale, setScale); // 모델 크기 조정
    model.position.set(positionX, positionY, positionZ); // 모델 위치 설정
    model.userData.type = type; // 원하는 타입 값을 설정합니다.
    
    itemTypeArray.map((n)=>{
      if(type === n){
        //기존에 있고, 현재 모델의 타입과 일치하는 타입의 모델 지우기
        removeDecoGltf(type)
      }
    })
    
    groupRef.current.add(model);
    }); 
  } 
  //deco 초기화하는 함수
  const removeDecoGltf = (type) => {
    const childToRemove = groupRef.current.children.find(
      (child) => child.userData.type === type
    );
  
    if (childToRemove) {
      groupRef.current.remove(childToRemove);
    }
      // 모델이 로드되어 있으면 제거
      //groupRef.current.remove(groupRef.current.children[0]);
      //setModelLoaded(false);
  
  }

  const groupRef = useRef(props);
  // gltf 모델들을 로드하고 그룹에 추가하는 함수
  const loadModels = () => {
    const AvatarGltfPath = process.env.PUBLIC_URL + 'gltf/avatar/cheek_avatarglb.gltf';
    const KeyringGltfPath = process.env.PUBLIC_URL  +'/gltf/avatar/keyring.glb';
    const StageGltfPath = process.env.PUBLIC_URL  +'/gltf/avatar/stage.glb';
    
    const gltfLoader = new GLTFLoader();

                 // 파일 path, scale, position(x, y, z) 순서  
    // putDecoGltf(topGltfPath, 1.1, 0,-0.04,0);
    // //putDecoGltf(topGltfPath, 0.00018, 0, 0.0218, 0.0025);
    // putDecoGltf(bottomGltfPath, 1.1, 0,-0.04,0);
    // putDecoGltf(shoesGltfPath, 0.025, -0.004 , -0.048, -0.018);
    // putDecoGltf(accessoryGltfPath, 0.05, 0,-0.03,0.005);
    // putDecoGltf(bagGltfPath, 0.029, 0.02,-0.098,0.004);

    //avatar gltf 모델을 로드하여 그룹에 추가
    gltfLoader.load(AvatarGltfPath, (parentGltf) => {
      const avatarModel = parentGltf.scene;
      avatarModel.scale.set(1.1, 1.1, 1.1); // 부모 모델 크기 조정
      avatarModel.position.set(0,-0.04,0);
      groupRef.current.add(avatarModel); 
    });  
    //keyring gltf 모델을 로드하여 그룹에 추가
    gltfLoader.load(KeyringGltfPath, (parentGltf) => {
      const model = parentGltf.scene;
      model.scale.set(0.02, 0.02, 0.02); // 부모 모델 크기 조정
      model.position.set(0,0.155,0.01);
      groupRef.current.add(model);
    }); 
    //stage gltf 모델을 로드하여 그룹에 추가
    putDecoGltf(StageGltfPath, 0.04, 0, -0.055, 0.0025);

    // eye gltf 모델을 로드하여 그룹에 추가
    gltfLoader.load(eyeGltfPath, (childGltf) => {
      const model = childGltf.scene;
      model.scale.set(1.1, 1.1, 1.1); // 자식 모델 크기 조정
      model.position.set(0,-0.04,0); // 자식 모델 위치 설정
      groupRef.current.add(model);
    });
    // mouth gltf 모델을 로드하여 그룹에 추가
    gltfLoader.load(mouthGltfPaht, (childGltf) => {
      const model = childGltf.scene;
      model.scale.set(1.1, 1.1, 1.1); // 자식 모델 크기 조정
      model.position.set(0,-0.04,0); // 자식 모델 위치 설정
      groupRef.current.add(model);
    });

  };

  // gltf 모델들을 로드하기 위해 컴포넌트가 마운트될 때 한 번만 실행합니다.
  // useEffect(() => {
  //   loadModels();
  // }, [isClick]);
  useEffect(()=>{
    loadModels();
    // if(isClick){
    //   putDecoGltf(addGltfPath, 1.1, 0,-0.04,0);
    //   console.log("success");
    // }
    
  },[addGltfPath])

  // useEffect(()=>{
  //   console.log("success");
  //   putDecoGltf(addGltfPath, 1.1, 0,-0.04,0);
  // },[addGltfPath]);

  return (
    <group ref={groupRef}
      scale={props.scale}
      position={props.position}
      //position={[0, -0.01, 0]} 
      rotation={[0.08, 0, 0]}
    />
  );
};

const AvatarDeco = () => {
    //데코(얼굴, 옷) 카테고리 선택
    const [typeDecoState, setDecoTypeState] = useState([true, false]);  
    const decoArray = ["face", "cloth"];

    const handleDecoClick = (idx) => {
        const newArr = Array(decoArray.length).fill(false);
        newArr[idx] = true;
        setDecoTypeState(newArr);
    }
    var [isClick, setClick] = useState(false);

    var getData = (getClick) =>{
      //isClick = getGltfPath;
      setClick(getClick);
      console.log("ahppy");
    }

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
    return (
        <div className="layoutDeco">
            <div><HeaderDeco/></div>
            <div className="avatarDeco" >
            <Suspense fallback={null}>
            <Canvas ref={canvasRef}
            shadows camera={{rotation: [0, 0, 0], fov: 150, zoom: 100, near: 1, far: 10 } }>
                        <spotLight intensity={1} position={[0, 30, 80]} angle={0.2} penumbra={1} castShadow/>
                        <ambientLight intensity={0.5} />
                        {/* <ParentAndbottomModels /> */}
                        {typeDecoState[0] ? <GltfGroupModels
                                                scale= {1.3}
                                                position={[0,-0.02,0]}
                                            /> :
                                            <GltfGroupModels
                                                scale= {0.8}
                                                position={[0,0.045,0]}
                        />}
                        <OrbitControls />
                    </Canvas>
                </Suspense>
                
                {typeDecoState[0] ? <Item type={"face"} getData={getData} /> : <Item type={"cloth"} getData={getData}/>}
                {/* {typeDecoState[1] ? <Item type={"cloth"} /> : ''} */}
                
            </div>
            <div className="saveAvatar" onClick={handleCapture}>
                <img src={process.env.PUBLIC_URL + "/img/deco/save.png"} />
            </div>

            <div className="chooseBtnGroup">
                <div className="btn_face" onClick={()=>{handleDecoClick(0)}}><img src={typeDecoState[0] ? process.env.PUBLIC_URL + "/img/VectorsmileTrue.png" : process.env.PUBLIC_URL + "/img/VectorsmileFalse.png"}/></div>
                <div className="btn_cloth"onClick={()=>{handleDecoClick(1)}}><img src={typeDecoState[1] ? process.env.PUBLIC_URL + "/img/VectorclothTrue.png" : process.env.PUBLIC_URL + "/img/VectorclothFalse.png"}/></div>              
            </div>            
        </div>
    )
}

var gltfArray = [
  process.env.PUBLIC_URL + "/gltf/bottom/hani_pants.gltf",
  process.env.PUBLIC_URL + "/gltf/top/hani_top.gltf", 
  process.env.PUBLIC_URL + "/gltf/bottom/herin_skirt.gltf", 
  process.env.PUBLIC_URL + "/gltf/top/herin_top.gltf", 
  process.env.PUBLIC_URL + "/gltf/bottom/hyein_pants.gltf", 
  process.env.PUBLIC_URL + "/gltf/top/hyein_top.gltf", 
  process.env.PUBLIC_URL + "/gltf/bottom/minji_pants.gltf", 
  process.env.PUBLIC_URL + "/gltf/top/minji_top.gltf"
];

export default AvatarDeco
