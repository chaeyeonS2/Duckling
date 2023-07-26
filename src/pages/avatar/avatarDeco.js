import { Link } from "react-router-dom";
import Footer from "../../footer";
import HeaderDeco from "../../headerDeco";
import "../../css/avatarDeco.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, Camera, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';
import Item from "./item";

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

const Square = () => {
    return (
      <mesh rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}>
        <boxGeometry args={[0.05,0.05,0.05]}/>
        <meshStandardMaterial color={"blue"} />
      </mesh>
    )
  }


  
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
                        <spotLight intensity={1} position={[0, 30, 120]} angle={0.2} penumbra={1} castShadow/>
                        <ambientLight intensity={0.4} />
                        {typeDecoState[0] ? <NewMapModel
                                                scale= {1.5}
                                                position={[0,-0.08,0]}
                                            /> :
                                            <NewMapModel
                                                scale= {1.2}
                                                position={[0,-0.05,0]}
                        />}
                    </Canvas>
                </Suspense>
                
                {typeDecoState[0] ? <Item type={"face"} /> : ''}
                {typeDecoState[1] ? <Item type={"cloth"} /> : ''}
                
            </div>
            <div className="chooseBtnGroup">
                <div className="btn_face" onClick={()=>{handleDecoClick(0)}}><img src={typeDecoState[0] ? process.env.PUBLIC_URL + "/img/VectorsmileTrue.png" : process.env.PUBLIC_URL + "/img/VectorsmileFalse.png"}/></div>
                <div className="btn_cloth"onClick={()=>{handleDecoClick(1)}}><img src={typeDecoState[1] ? process.env.PUBLIC_URL + "/img/VectorclothTrue.png" : process.env.PUBLIC_URL + "/img/VectorclothFalse.png"}/></div>
            </div>
            
        </div>
    )
}

export default AvatarDeco