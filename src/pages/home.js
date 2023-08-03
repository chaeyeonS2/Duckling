//import React from 'react';
import Footer from "../footer";
import Header from "../headers/header";
import "../css/layout.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { BottomSheet } from 'react-spring-bottom-sheet';
import "../css/customBottomSheet.css";


// function Box(props) {
//     const mesh = useRef();
//     useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//     return (
//        <mesh {...props} ref={mesh}>
//           <boxGeometry args={[3, 3, 3]} />
//           <meshStandardMaterial color={"orange"} />
//        </mesh>
//     );
// }

// function Avatar(props) {
//     // load GLTF
//     const gltf = useLoader(GLTFLoader, "/hani_avatar_netural.glb");
//     return (
//         <primitive object={gltf.scene} />
//     );
// }

const NewMapModel = (props) => {
  const { scene } = useGLTF(process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf');
  
  return (
  <mesh>
      <pointLight intensity={1}/>
      <primitive 
          object={scene}
          scale={1.2}
          position={[0,-0.07,0]}
      />
  </mesh>
   
  );
};

function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <NewMapModel/>
        
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

  

const Home = () => {
  const [show, setShow] = useState(false); // show 상태와 setShow 함수를 선언합니다.


    return (
        <div className="layout">
            <Header/>
            <div className="content">
            <Suspense fallback={null}>
                    <Canvas shadows camera={{rotation: [0, 0, 0], fov: 150, zoom: 100, near: 1, far: 10 } }>
                        <spotLight intensity={1} position={[0, 30, 120]} angle={0.2} penumbra={1} castShadow/>
                        <ambientLight intensity={0.4} />
                        <NewMapModel />  
                    </Canvas>
                </Suspense>
            
            </div>
            <BottomSheet
                    open={show} // 바닥 시트 열림 상태
                    onDismiss={() => setShow(false)} // 닫기 버튼 클릭 시 호출되는 함수
                >
                    <div className="commentBox">
                    댓글용 바닥 시트
                    </div>
            </BottomSheet>
            <Footer/>
        </div>
    )
}

export default Home