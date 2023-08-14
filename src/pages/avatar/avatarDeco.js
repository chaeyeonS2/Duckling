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
const bottomGltfPath = process.env.PUBLIC_URL + '/gltf/bottom/hani_pants.gltf';
const dressGltfPath = process.env.PUBLIC_URL + ''; 
const shoesGltfPath = process.env.PUBLIC_URL + '/gltf/shoes/Sneakers_Yellow.glb';
const bagGltfPath = process.env.PUBLIC_URL + '/gltf/bag/KR_sh_bag_w.glb';
const accessoryGltfPath = process.env.PUBLIC_URL + '/gltf/accessory/butterfly_pin_set.glb'; 

const GltfGroupModels = (props) => {

  const putDecoGltf = (gltfPath, setScale, positionX, positionY, positionZ) => {
    const gltfLoader = new GLTFLoader();
        gltfLoader.load(gltfPath, (childGltf) => {
        const model = childGltf.scene;
        model.scale.set(setScale, setScale, setScale); // 모델 크기 조정
        model.position.set(positionX, positionY, positionZ); // 모델 위치 설정
      
        groupRef.current.add(model);
      }); 
    } 

  const groupRef = useRef(props);
  // gltf 모델들을 로드하고 그룹에 추가하는 함수
  const loadModels = () => {
    const AvatarGltfPath = process.env.PUBLIC_URL  +'/gltf/avatar/basic_avatar_[no_face].gltf';
    const KeyringGltfPath = process.env.PUBLIC_URL  +'/gltf/avatar/keyring.glb';
    const StageGltfPath = process.env.PUBLIC_URL  +'/gltf/avatar/stage.glb';
    
    const gltfLoader = new GLTFLoader();

                 // 파일 path, scale, position(x, y, z) 순서  
    putDecoGltf(topGltfPath, 1.1, 0,-0.04,0);
    //putDecoGltf(topGltfPath, 0.00018, 0, 0.0218, 0.0025);
    
    putDecoGltf(bottomGltfPath, 1.1, 0,-0.04,0);
    putDecoGltf(shoesGltfPath, 0.025, -0.004 , -0.048, -0.018);
    putDecoGltf(accessoryGltfPath, 0.05, 0,-0.03,0.005);
    putDecoGltf(bagGltfPath, 0.029, 0.02,-0.098,0.004);

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
  useEffect(() => {
    loadModels();
  }, []);

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
    const [typeDecoState, setDecoTypeState] = useState(false);  
    const decoArray = ["face", "cloth"];

    const handleDecoClick = (idx) => {
        const newArr = Array(decoArray.length).fill(false);
        newArr[idx] = true;
        setDecoTypeState(newArr);
    }
    
    return (
        <div className="layoutDeco">
            <div><HeaderDeco/></div>
            <div className="avatarDeco">
            <Suspense fallback={null}>
            <Canvas shadows camera={{rotation: [0, 0, 0], fov: 150, zoom: 100, near: 1, far: 10 } }>
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
                
                {typeDecoState[0] ? <Item type={"face"} /> : <Item type={"cloth"}/>}
                {/* {typeDecoState[1] ? <Item type={"cloth"} /> : ''} */}
                
            </div>
            <div className="saveAvatar">

            </div>

            <div className="chooseBtnGroup">
                <div className="btn_face" onClick={()=>{handleDecoClick(0)}}><img src={typeDecoState[0] ? process.env.PUBLIC_URL + "/img/VectorsmileTrue.png" : process.env.PUBLIC_URL + "/img/VectorsmileFalse.png"}/></div>
                <div className="btn_cloth"onClick={()=>{handleDecoClick(1)}}><img src={typeDecoState[1] ? process.env.PUBLIC_URL + "/img/VectorclothTrue.png" : process.env.PUBLIC_URL + "/img/VectorclothFalse.png"}/></div>              
            </div>            
        </div>
    )
}

// const ParentAndbottomModels = (props) => {
//     const groupRef = useRef(props);
  
//     // 부모와 자식 gltf 모델들을 로드하고 그룹에 추가하는 함수
//     const loadModels = () => {
//       const AvatarGltfPath = process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf';
//       const bottomGltfPath = process.env.PUBLIC_URL  +'/gltf/bottom/HYERIN_HB.gltf';
  
//       const gltfLoader = new GLTFLoader();
  
//       // 부모 gltf 모델을 로드하여 그룹에 추가
//       gltfLoader.load(AvatarGltfPath, (parentGltf) => {
//         const avatarModel = parentGltf.scene;
//         avatarModel.scale.set(1.2, 1.2, 1.2); // 부모 모델 크기 조정
//         avatarModel.position.set(0,-0.05,0);
//         groupRef.current.add(avatarModel);
//       });
  
//     <putChildGltf/>
//       // 자식 gltf 모델을 로드하여 그룹에 추가
//       gltfLoader.load(bottomGltfPath, (childGltf) => {
//         const bottomModel = childGltf.scene;
//         bottomModel.scale.set(0.0002, 0.0002, 0.0002); // 자식 모델 크기 조정
//         bottomModel.position.set(0,-0.005,0.01); // 자식 모델 위치 설정
//         groupRef.current.add(bottomModel);
//       });
//     };
  
//     // 부모와 자식 gltf 모델들을 로드하기 위해 컴포넌트가 마운트될 때 한 번만 실행합니다.
//     useEffect(() => {
//       loadModels();
//     }, []);
  
//     // const putChildGltf = () => {
//     //     const gltfLoader = new GLTFLoader();
//     //     const topGltfPath = process.env.PUBLIC_URL  +'/gltf/bottom/HYERIN_HB.gltf';

//     //     // 자식 gltf 모델을 로드하여 그룹에 추가
//     //     gltfLoader.load(topGltfPath, (childGltf) => {
//     //     const topModel = childGltf.scene;
//     //     topModel.scale.set(0.0002, 0.0002, 0.0002); // 자식 모델 크기 조정
//     //     topModel.position.set(0,-0.005,0.01); // 자식 모델 위치 설정
//     //     groupRef.current.add(topModel);
//     //   });
//     // }
//     return (
//       <group ref={groupRef} 
//         scale={props.scale}
//         position={props.position}
//       />
//     );
//   };

export default AvatarDeco