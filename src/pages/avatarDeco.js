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
            scale={1.2}
            position={[0,-0.07,0]}
        />
    </mesh>
     
    );
};

// const SelectType = () => {
//     const [typeState, setTypeState] = useState("eye");
//     typeBtn.current.style.backgroundColor = '#BDFF6B';
//     return console.log("it work!")
// }

const AvatarDeco = () => {
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
                        <div className="face_btn eye">눈</div>
                        <div className="face_btn mouth">입</div>
                    </div>
                    <div>
                        {
                        itemArray.map(function(){
                            return (<div className="item_box"></div>)
                        })
                        };  
                    </div>
                    
                </div>
                
            </div>
            <div className="chooseBtnGroup">
                <div><button id="btn_face"><img src={process.env.PUBLIC_URL + "/img/VectorsmileTrue.png"} img alt="my image"/></button></div>
                <div><button id="btn_cloth"><img src={process.env.PUBLIC_URL + "/img/VectorclothTrue.png"} img alt="my image"/></button></div>
            </div>
            
        </div>
    )
}

export default AvatarDeco