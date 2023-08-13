import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import "./css/style.css";
import {OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Layout from './layout';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import AvatarDeco from './pages/avatar/avatarDeco';
import Post from "./pages/writing/post";
import Home from "./pages/home";
import PostView from "./pages/writing/postView";
import Login from "./pages/login";
import IsImage from "./alert/isImage";
import Uploading from "./alert/uploading";
import Delete from "./alert/delete";
import PostShare from "./alert/postShare";
import Look from "./pages/looking/look";
import Tmp from "./pages/writing/tmp";

// function CubeShow() {S
//   return (
//     <>
//       <OrbitControls 
//         target={[0, 0.35, 0]}
//         maxPolarAngle={1.45}
//       />

//       <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

//       <mesh>
//         <boxGeometry args = {[1,1,1]}/>
//         <meshBasicMaterial color={"red"}/>
//       </mesh>
//     </>
//   );
// }

function Box(props) {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
     <mesh {...props} ref={mesh}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color={"orange"} />
     </mesh>
  );
}

function Model(props) {
  const { nodes, materials } = useGLTF('./hani_avatar_netural.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.eye_highlight_heart.geometry} material={materials.lambert4} />
        <mesh geometry={nodes.EYE_LEFT.geometry} material={materials.lambert1} position={[1.189, 2.935, -9.104]} rotation={[-0.004, -0.06, -0.303]} scale={[1.133, 0.192, 1.133]} />
        <mesh geometry={nodes.EYE_RIGHT.geometry} material={materials.lambert1} position={[1.189, 2.935, -9.104]} rotation={[-0.004, -0.06, -0.303]} scale={[1.133, 0.192, 1.133]} />
        <mesh geometry={nodes.eyebrow_LEFT.geometry} material={materials.lambert1} position={[1.18, 2.226, -10.55]} rotation={[0, 0, -0.431]} scale={[0.822, 1, 0.156]} />
        <mesh geometry={nodes.eyebrow_RIGHT.geometry} material={materials.lambert1} position={[1.18, 2.226, -10.55]} rotation={[0, 0, -0.431]} scale={[0.822, 1, 0.156]} />
        <mesh geometry={nodes.LASH_LEFT.geometry} material={materials.lambert1} position={[1.569, 2.794, -9.361]} rotation={[-0.922, 0.569, 0.617]} scale={[0.443, 0.195, 0.1]} />
        <mesh geometry={nodes.LASH_RIGHT.geometry} material={materials.lambert1} position={[1.569, 2.794, -9.361]} rotation={[-0.922, 0.569, 0.617]} scale={[0.443, 0.195, 0.1]} />
        <mesh geometry={nodes.mouth_hani_.geometry} material={materials.lambert1} position={[0, 3.536, -8.213]} rotation={[0.265, 0, 0]} scale={[1, 0.067, 0.111]} />
        <mesh geometry={nodes.nose.geometry} material={materials.lambert1} position={[0, 3.49, -8.574]} scale={[0.288, 0.16, 0.16]} />
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.Mesh009.geometry} material={materials.lambert_rabbit} />
        <mesh geometry={nodes.Mesh009_1.geometry} material={materials.lambert_innerear} />
      </group>
    </group>
  )
}

// const Model = () => {
//   const gltf = useLoader(GLTFLoader, "../scene.gltf")
//   return (
//       <>
//           <primitive  position={[0, 0, 0]} object={gltf.scene} scale={1} />
//       </>
//   );
// };

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
  <BrowserRouter>
      <Home/>
      <Routes>
        <Route path="/" component={Layout}/>
      <Route exact path="/avatarDeco" component={AvatarDeco}/>
      </Routes>
  </BrowserRouter>
    
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path="/header"> 
    //       <Header />
    //     </Route>
    //     <Route exact path="/pages/avatarDeco"> 
    //       <avatarDeco />
    //     </Route>
    //   </Routes>

    // </BrowserRouter>
    


    
    
  );
}

export default App;

