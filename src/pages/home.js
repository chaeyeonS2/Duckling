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
//import 'react-spring-bottom-sheet/dist/style.css'; // 스타일 파일을 불러옵니다.


const NewMapModel = (props) => {
  const { scene } = useGLTF(process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf');
  
  return (
  <mesh>
      <pointLight intensity={1}/>
      <primitive 
          object={scene}
          scale={props.scale}
          position={props.position}
          //cloth일 경우
          // scale={1.2}
          // position={[0,-0.05,0]}
      />
  </mesh>
   
  );
};

const Home = () => {
  var postArray = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]; //item 임의 개수

    return (
        <div className="layout">
            {/* <Header/> */}
            <div className="content" style={{width:'100vw', height:'100vh'}}>
            <Suspense fallback={null}>
            <Canvas shadows camera={{rotation: [0, 0, 0], fov: 150, zoom: 100, near: 1, far: 10 } }>
                        <spotLight intensity={1} position={[0, 30, 120]} angle={0.2} penumbra={1} castShadow/>
                        <ambientLight intensity={0.4} />
                        <NewMapModel 
                            scale= {1.1}
                            position={[0,-0.03,0]}
                            />
                    </Canvas>
                </Suspense>
            
            </div>
            <BottomSheet
              open
              skipInitialTransition
              snapPoints={({ maxHeight }) => [
                maxHeight/11.5, //최소
                maxHeight /2, //최대
              ]}
              blocking = {false}  //배경 블록 현상 해결
              header={
                <div className="bottom_header">
                  <div className="profileImg">
                    {/* 서버에서 받아온 이미지 넣기 */}
                  </div>
                  <div className="userName">
                    팜하니
                  </div>
                  <div className="btnAddNew">
                    <img src={process.env.PUBLIC_URL + "/img/writing/add.png"}/>
                  </div>
                </div>
              }
            >
              <div className="bottom_content">
                  
                  { //아이템 썸네일 박스
                    postArray.map((num)=>(
                      <div className="postImg">
                        <img className="item_img" src={process.env.PUBLIC_URL + "/img/item/jean.png"}/>
                      </div>

                  )

                    )}  

                  
              </div>
            </BottomSheet>
            
            <Footer/>
        </div>
    )
}

export default Home