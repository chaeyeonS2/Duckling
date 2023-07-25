import { Link } from "react-router-dom";
import Footer from "../footer";
import HeaderDeco from "../headerDeco";
import "../css/avatarDeco.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';
 
const NewMapModel = (props) => {
    const { scene } = useGLTF(process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf');
    
    return (
    <mesh>
        <pointLight intensity={1}/>
        <primitive 
            object={scene}
            scale={1.5}
            position={[0,-0.08,0]}
        />
    </mesh>
     
    );
};

const ItemModel = (props) => {
    const { scene } = useGLTF(process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf');
    
    return (
    <mesh>
        <pointLight intensity={1}/>
        <primitive 
            object={scene}
            scale={1.2}
            position={[0,-0.1,0]}
        />
    </mesh>
     
    );
};

const Square = () => {
    return (
      <mesh rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}>
        <boxGeometry args={[0.05,0.05,0.05]}/>
        <meshStandardMaterial color={"blue"} />
      </mesh>
    )
  }


  
const AvatarDeco = () => {
    var imgSrcList = [process.env.PUBLIC_URL + "/img/VectorsmileTrue.png",
                    process.env.PUBLIC_URL + "/img/VectorsmileFalse.png",
                    process.env.PUBLIC_URL + "/img/VectorclothTrue.png",
                    process.env.PUBLIC_URL + "/img/VectorclothFalse.png"]
    const [imgSrc, setImageSrc] = useState(imgSrcList[0]);
    const [typeDecoState, setDecoTypeState] = useState();  //데코(얼굴, 옷) 카테고리
    const [isClicked, setIsClicked] = useState(false);
    
    const [typeItemState, setItemTypeState] = useState("eye");  //아이템 카테고리
    var itemArray = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]; //item 개수
    return (
        <div className="layoutDeco">
            <div><HeaderDeco/></div>
            <div className="avatarDeco">
                <Suspense fallback={null}>
                    <Canvas shadows camera={{rotation: [0, 0, 0], fov: 150, zoom: 100, near: 1, far: 10 } }>
                        <spotLight intensity={1} position={[0, 30, 120]} angle={0.2} penumbra={1} castShadow/>
                        <ambientLight intensity={0.4} />
                        <NewMapModel />  
                    </Canvas>
                </Suspense>
                
                <div className="faceDeco">
                    <div className="faceBtnGroup">
                        <div className={typeItemState === "eye" ? "selectBtn" : "face_btn"} onClick={() => {setItemTypeState("eye")}}>눈</div>
                        <div className={typeItemState === "mouth" ? "selectBtn" : "face_btn"} onClick={() => {setItemTypeState("mouth")}}>입</div>
                    </div>
                    <div>
                        {
                        itemArray.map(function(){
                            return (<div className="item_box">
                                <img className="item_img" src={process.env.PUBLIC_URL + "/img/jean.png"} img alt="my image"/>
                            </div>)
                        })
                        };  
                    </div>
                    
                </div>
                
            </div>
            <div className="chooseBtnGroup">
                <div className="btn_face" onClick={()=>{setImageSrc(imgSrcList[0])}}><img src={imgSrc} img alt="my image"/></div>
                <div className="btn_cloth"onClick={()=>{setImageSrc(imgSrcList[3])}}><img src={imgSrc} img alt="my image"/></div>
            </div>
            
        </div>
    )
}

export default AvatarDeco