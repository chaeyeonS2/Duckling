//import React from 'react';
import Footer from "../footer"; 
import Header from "../headers/header";
import "../css/layout.css"; 
import React, { useLayoutEffect, useState, Suspense, Component ,useRef, useEffect, useContext } from "react";
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { BottomSheet } from 'react-spring-bottom-sheet';
import "../css/customBottomSheet.css";
//import 'react-spring-bottom-sheet/dist/style.css'; // 스타일 파일을 불러옵니다.
//import { css } from '@emotion/react';
import { OrbitControls } from '@react-three/drei';
import Mypost from "./home/myPost";
import { MeshBasicMaterial, PlaneGeometry } from 'three';
import { AppContext } from "./avatar/avatarDeco";
import axios from 'axios';





const eyeGltfPath = process.env.PUBLIC_URL  +'/gltf/eye/NewJeans_DANIEL_eye.gltf';
const mouthGltfPath = process.env.PUBLIC_URL + '/gltf/mouth/NewJeans_DANIEL_mouth.gltf';
const topGltfPath = process.env.PUBLIC_URL + '/gltf/top/daniel_top.gltf';
const bottomGltfPath = "https://firebasestorage.googleapis.com/v0/b/netural-app.appspot.com/o/bottoms_gltf%2Fhb_hani_pants.gltf?alt=media&token=413ebc73-1132-4f6f-8fbf-b9fc58e94dec";
//const bottomGltfPath = process.env.PUBLIC_URL + '/gltf/bottom/daniel_skirt.gltf';
//const dressGltfPath = process.env.PUBLIC_URL + ''; 
const shoesGltfPath = process.env.PUBLIC_URL + '/gltf/shoes/Sneakers_Yellow.glb';
const bagGltfPath = '';
const accessoryGltfPath = ''; 

const GltfGroupModels = (props) => {


  const putDecoGltf = (gltfPath, setScale, positionX, positionY, positionZ) => {
    const gltfLoader = new GLTFLoader();
        gltfLoader.load(gltfPath, (childGltf) => {
        const model = childGltf.scene;
        //model.scale.set(0.00018, 0.00018, 0.00018); // 자식 모델 크기 조정
        model.scale.set(setScale, setScale, setScale); // 자식 모델 크기 조정
        //model.position.set(0,0,0.01); // 자식 모델 위치 설정
        model.position.set(positionX, positionY, positionZ); // 자식 모델 위치 설정
      
        groupRef.current.add(model);
      }); 
    } 

  const groupRef = useRef(props);
  // 부모와 자식 gltf 모델들을 로드하고 그룹에 추가하는 함수
  const loadModels = () => {
    const AvatarGltfPath = process.env.PUBLIC_URL + 'gltf/avatar/cheek_avatarglb.gltf';
    const KeyringGltfPath = process.env.PUBLIC_URL  +'/gltf/avatar/keyring.glb';
    const StageGltfPath = process.env.PUBLIC_URL  +'/gltf/avatar/stage.glb';
    
    const gltfLoader = new GLTFLoader();
    //const texture = new TextureLoader().load('/gltf/avatar/wood.jpg');

                 // 파일 path, scale, position(x, y, z) 순서  
    putDecoGltf(topGltfPath, 1.1, 0,-0.04,0);
    putDecoGltf(bottomGltfPath, 1.1, 0,-0.04,0);
    putDecoGltf(shoesGltfPath, 1.1, 0,-0.04,0);
    putDecoGltf(accessoryGltfPath, 1.1, 0,-0.04,0);
    putDecoGltf(bagGltfPath, 1.1, 0,-0.04,0);


    //avatar gltf 모델을 로드하여 그룹에 추가
    gltfLoader.load(AvatarGltfPath, (parentGltf) => {
      const avatarModel = parentGltf.scene;
      avatarModel.scale.set(1.1, 1.1, 1.1); // 부모 모델 크기 조정
      avatarModel.position.set(0,-0.04,0);

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
    gltfLoader.load(mouthGltfPath, (childGltf) => {
      const model = childGltf.scene;
      model.scale.set(1.1, 1.1, 1.1); // 자식 모델 크기 조정
      model.position.set(0,-0.04,0); // 자식 모델 위치 설정
      groupRef.current.add(model);
    });

  };

  const [defaultAsset, setDefaultAsset] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  // gltf 모델들을 로드하기 위해 컴포넌트가 마운트될 때 한 번만 실행합니다.
  useEffect(() => {
    const uid = localStorage.getItem("id");
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`);
        setUserInfo(response.data);
        setDefaultAsset(response.data.userAvatar);
      } catch (error) {
        console.error(error);
      }
    };
  
    getUserInfo();


    
  }, []);
  useEffect(() => {
    loadModels();
    if (userInfo.length) {
      console.log("테스트",userInfo);
      
    }
  }, [userInfo]);

  //   useEffect(() => {
  //     loadModels();
  // }, );


  return (
    <group ref={groupRef}
      position={[0, -0.01, 0]} 
      rotation={[0.08, 0, 0]}
    />
  );
};
 


const Home = () => {
  

    return (
        <div className="layoutA">
            <Header/>
            <div className="content" style={{width:'100vw', height:'100vh', backgroundImage:"url(/img/home/background.png)"}}>
            <Suspense fallback={null}>
            <Canvas style={{ background: 'transparent' }}
            shadows camera={{rotation: [0, 0, 0], fov: 150, zoom: 100, near: 1, far: 10 } }>
                        <spotLight intensity={1} position={[0, 30, 80]} angle={0.2} penumbra={1} castShadow/>
                        <ambientLight intensity={0.5} />
                        
                          <GltfGroupModels/>
                        
                        {/* 마우스 컨트롤 */}
                        {/* <OrbitControls /> */}
                    </Canvas>
                </Suspense>
                        
            </div>
            <Mypost/>
            
            <Footer btn = {1}/>
        </div>
    )
}

export default Home
