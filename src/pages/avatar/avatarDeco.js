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

const ItemModel = (props) => {
    const { scene } = useGLTF(process.env.PUBLIC_URL  +'/gltf/bottom/HYERIN_HB.gltf');
    //const { scene } = useGLTF(process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf');

    return (
    <mesh>
        {/* <boxGeometry args={[0.05,0.05,0.05]}/>
        <meshStandardMaterial color={"blue"} /> */}
        <pointLight intensity={1}/>
        <primitive 
            object={scene}
            // scale={props.scale}
            // position={props.position}
            //cloth일 경우
            scale={0.0002}
            position={[0,-0.005,0.01]}
            
        />
    </mesh>
     
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
                        <spotLight intensity={1} position={[0, 30, 120]} angle={0.2} penumbra={1} castShadow/>
                        <ambientLight intensity={0.4} />
                        {/* <ParentAndbottomModels /> */}
                        {typeDecoState[0] ? <ParentAndbottomModels
                                                scale= {1.2}
                                                position={[0,-0.01,0]}
                                            /> :
                                            <ParentAndbottomModels
                                                scale= {1}
                                                position={[0,0.01,0]}
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

const ParentAndbottomModels = (props) => {
    const groupRef = useRef(props);
  
    // 부모와 자식 gltf 모델들을 로드하고 그룹에 추가하는 함수
    const loadModels = () => {
      const AvatarGltfPath = process.env.PUBLIC_URL  +'/img/hani_avatar_netural.gltf';
      const bottomGltfPath = process.env.PUBLIC_URL  +'/gltf/bottom/HYERIN_HB.gltf';
  
      const gltfLoader = new GLTFLoader();
  
      // 부모 gltf 모델을 로드하여 그룹에 추가
      gltfLoader.load(AvatarGltfPath, (parentGltf) => {
        const avatarModel = parentGltf.scene;
        avatarModel.scale.set(1.2, 1.2, 1.2); // 부모 모델 크기 조정
        avatarModel.position.set(0,-0.05,0);
        groupRef.current.add(avatarModel);
      });
  
    <putChildGltf/>
      // 자식 gltf 모델을 로드하여 그룹에 추가
      gltfLoader.load(bottomGltfPath, (childGltf) => {
        const bottomModel = childGltf.scene;
        bottomModel.scale.set(0.0002, 0.0002, 0.0002); // 자식 모델 크기 조정
        bottomModel.position.set(0,-0.005,0.01); // 자식 모델 위치 설정
        groupRef.current.add(bottomModel);
      });
    };
  
    // 부모와 자식 gltf 모델들을 로드하기 위해 컴포넌트가 마운트될 때 한 번만 실행합니다.
    useEffect(() => {
      loadModels();
    }, []);
  
    // const putChildGltf = () => {
    //     const gltfLoader = new GLTFLoader();
    //     const topGltfPath = process.env.PUBLIC_URL  +'/gltf/bottom/HYERIN_HB.gltf';

    //     // 자식 gltf 모델을 로드하여 그룹에 추가
    //     gltfLoader.load(topGltfPath, (childGltf) => {
    //     const topModel = childGltf.scene;
    //     topModel.scale.set(0.0002, 0.0002, 0.0002); // 자식 모델 크기 조정
    //     topModel.position.set(0,-0.005,0.01); // 자식 모델 위치 설정
    //     groupRef.current.add(topModel);
    //   });
    // }
    return (
      <group ref={groupRef} 
        scale={props.scale}
        position={props.position}
      />
    );
  };

export default AvatarDeco