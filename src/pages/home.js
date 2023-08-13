//import React from 'react';
import Footer from "../footer";
import Header from "../headers/header";
import "../css/layout.css";
import React, { useLayoutEffect, useState, Suspense, Component ,useRef, useEffect } from "react";
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { BottomSheet } from 'react-spring-bottom-sheet';
import "../css/customBottomSheet.css";
//import 'react-spring-bottom-sheet/dist/style.css'; // 스타일 파일을 불러옵니다.
import { css } from '@emotion/react';

const bottomSheetStyle = css`
[data-rsbs-overlay] {
  border-top-left-radius: 16px;
  border-top-left-radius: var(--rsbs-overlay-rounded,16px);
  border-top-right-radius: 16px;
  border-top-right-radius: var(--rsbs-overlay-rounded,16px);
  display: flex;
  background: #fff;
  background: var(--rsbs-bg,#fff);
  flex-direction: column;
  height: 0px;
  height: var(--rsbs-overlay-h,0px);
  transform: translate3d(0, 0px, 0);
  transform: translate3d(0, var(--rsbs-overlay-translate-y,0px), 0);
  will-change: height;
}

[data-rsbs-overlay]:focus {
  outline: none;
}

[data-rsbs-is-blocking='false'] [data-rsbs-overlay] {
  box-shadow: 0 -5px 60px 0 rgba(38, 89, 115, 0.11),
    0 -1px 0 rgba(38, 89, 115, 0.05);
}

[data-rsbs-overlay],
[data-rsbs-root]:after {
  max-width: auto;
  max-width: var(--rsbs-max-w,auto);
  margin-left: env(safe-area-inset-left);
  margin-left: var(--rsbs-ml,env(safe-area-inset-left));
  margin-right: env(safe-area-inset-right);
  margin-right: var(--rsbs-mr,env(safe-area-inset-right));
}

[data-rsbs-overlay],
[data-rsbs-backdrop],
[data-rsbs-root]:after {
  z-index: 3;
  -ms-scroll-chaining: none;
      overscroll-behavior: none;
  touch-action: none;
  position: fixed;
  right: 0;
  /* 이 부분 수정해서 바텀 높이 올림 */
  bottom: 88px;
  left: 0;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

[data-rsbs-backdrop] {
  top: -60px;
  bottom: -60px;
  /* background-color: rgba(255, 255, 255, 0.6); */
  /* background-color: var(--rsbs-backdrop-bg,rgba(0, 0, 0, 0.6)); */
  will-change: opacity;
  cursor: pointer;
  opacity: 1;
}

[data-rsbs-is-dismissable='false'] [data-rsbs-backdrop] {
  cursor: ns-resize;
}

[data-rsbs-root]:after {
  content: '';
  pointer-events: none;
  background: #fff;
  background: var(--rsbs-bg,#fff);
  height: 1px;
  transform-origin: bottom;
  transform: scale3d(1, 0, 1);
  transform: scale3d(1, var(--rsbs-antigap-scale-y,0), 1);
  will-change: transform;
}

[data-rsbs-footer],
[data-rsbs-header] {
  flex-shrink: 0;
  cursor: ns-resize;
  padding: 16px;
}

[data-rsbs-header] {
  text-align: center;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  box-shadow: 0 1px 0
    rgba(46, 59, 66, calc(1 * 0.125));
  box-shadow: 0 1px 0
    rgba(46, 59, 66, calc(var(--rsbs-content-opacity,1) * 0.125));
  z-index: 1;
  padding-top: 15px;
  padding-bottom: 12px;

  /* 커스텀할 내용 추가 */
  height: 50px;
  border-radius: 20px 20px 0 0;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-top: 5px solid black;
}

/* [data-rsbs-header]:before {
  position: absolute;
  content: '';
  display: block;
  width: 36px;
  height: 4px;
  top: calc(8px + env(safe-area-inset-top));
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  background-color: hsla(0, 0%, 0%, 0.14);
  background-color: var(--rsbs-handle-bg,hsla(0, 0%, 0%, 0.14));
} */

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
  [data-rsbs-header]:before {
    transform: translateX(-50%) scaleY(0.75);
  }
}

[data-rsbs-has-header='false'] [data-rsbs-header] {
  box-shadow: none;
  padding-top: calc(12px + env(safe-area-inset-top));
}

[data-rsbs-scroll] {
  flex-shrink: 1;
  flex-grow: 1;
  -webkit-tap-highlight-color: revert;
  -webkit-touch-callout: revert;
  -webkit-user-select: auto;
  -ms-user-select: auto;
  -moz-user-select: auto;
       user-select: auto;
  overflow: auto;
  -ms-scroll-chaining: none;
      overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  /* 커스텀할 내용 추가 */
  border-left: 1px solid black;
  border-right: 1px solid black;
}

[data-rsbs-scroll]:focus {
  outline: none;
}

[data-rsbs-has-footer='false'] [data-rsbs-content] {
  padding-bottom: env(safe-area-inset-bottom);
}

[data-rsbs-content] {
  /* The overflow hidden is to ensure any margin on child nodes are included when the resize observer is measuring the height */
  overflow: hidden;
}

[data-rsbs-footer] {
  box-shadow: 0 -1px 0 rgba(46, 59, 66, calc(1 * 0.125)),
    0 2px 0 #fff;
  box-shadow: 0 -1px 0 rgba(46, 59, 66, calc(var(--rsbs-content-opacity,1) * 0.125)),
    0 2px 0 var(--rsbs-bg,#fff);
  overflow: hidden;
  z-index: 1;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
}

[data-rsbs-is-dismissable='true'] [data-rsbs-header] > *, [data-rsbs-is-dismissable='true'] [data-rsbs-scroll] > *, [data-rsbs-is-dismissable='true'] [data-rsbs-footer] > *, [data-rsbs-is-dismissable='false'][data-rsbs-state='opening'] [data-rsbs-header] > *, [data-rsbs-is-dismissable='false'][data-rsbs-state='closing'] [data-rsbs-header] > *, [data-rsbs-is-dismissable='false'][data-rsbs-state='opening'] [data-rsbs-scroll] > *, [data-rsbs-is-dismissable='false'][data-rsbs-state='closing'] [data-rsbs-scroll] > *, [data-rsbs-is-dismissable='false'][data-rsbs-state='opening'] [data-rsbs-footer] > *, [data-rsbs-is-dismissable='false'][data-rsbs-state='closing'] [data-rsbs-footer] > * {
    opacity: 1;
    opacity: var(--rsbs-content-opacity,1);
  }

[data-rsbs-is-dismissable='true'] [data-rsbs-backdrop], [data-rsbs-is-dismissable='false'][data-rsbs-state='opening'] [data-rsbs-backdrop], [data-rsbs-is-dismissable='false'][data-rsbs-state='closing'] [data-rsbs-backdrop] {
    opacity: 1;
    opacity: var(--rsbs-backdrop-opacity,1);
  }

[data-rsbs-state='closed'],
[data-rsbs-state='closing'] {
  /* Allows interactions on the rest of the page before the close transition is finished */
  pointer-events: none;
}

/* 헤더 커스텀 */
.bottom_header{
width: 100%;
}

.profileImg{
float: left;
width: 50px;
height: 50px;
border-radius: 100%;
background-color: #D9D9D9;
}

.userName{
float: left;
display: flex;
align-items: center;
width: auto;
height: 50px;
margin-left: 20px;
font-size: 22px;
}

.btnAddNew{
float: right;
width: 50px;
height: 50px;
}

.btnAddNew img{
width: 40px;
height: 40px;
margin: 5px;
}

/* 내용 커스텀 */
.bottom_content{
display: flex;
flex-wrap: wrap;
}

.postImg{
width: 33vw; /* 각 열의 너비 */
height: 33vw;
background-color: #f0f0f0;
}
`;

 
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

const KeyModel = (props) => {
  const { scene } = useGLTF(process.env.PUBLIC_URL  +'/gltf/keyring.glb');

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

  useLayoutEffect(() => {

    const parentDiv = document.getElementById('parentDiv-home');
    if (parentDiv) {
      const childDivs = parentDiv.querySelectorAll('div');
      
      childDivs.forEach((childDiv) => {
        childDiv.classList.add('homeSheet');
      });
       
      return () => {
        childDivs.forEach((childDiv) => {
          childDiv.classList.remove('homeSheet');
        });
      };
    }
  }, []);

  
  var postArray = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]; //item 임의 개수

    return (
        <div className="layoutA">
            <Header/>
            <div className="content" style={{width:'100vw', height:'100vh'}}>
            <Suspense fallback={null}>
            <Canvas shadows camera={{rotation: [0, 0, 0], fov: 150, zoom: 100, near: 1, far: 10 } }>
                        <spotLight intensity={1} position={[35, 60, 150]} angle={0.2} penumbra={1} castShadow/>
                        <ambientLight intensity={0.5 } />
                        <NewMapModel 
                          scale= {1.1}
                          position={[0,-0.04,0]}
                        />
                        <KeyModel 
                          scale= {0.02}
                          position={[0,0.155,0.01]}
                        />

                    </Canvas>
                </Suspense>
            
            </div>
            <BottomSheet className="homeSheet" id="parentDiv-home" 
              open
              skipInitialTransition
              snapPoints={({ maxHeight }) => [
                maxHeight/11.5, //최소
                maxHeight /2, //최대 
              ]}
              blocking = {false}  //배경 블록 현상 해결
              header ={
                <div className="bottom_header homeSheet">
                  <div className="profileImg homeSheet">
                    {/* 서버에서 받아온 이미지 넣기 */}
                  </div>
                  <div className="userName homeSheet">
                    팜하니
                  </div>
                  
                  <div className="btnAddNew homeSheet">
                    <img src={process.env.PUBLIC_URL + "/img/writing/add.png"}/>
                  </div>
                </div>
              }
            >
              <div className="bottom_content homeSheet">
                  
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