import { useEffect, useRef } from "react";
import { AnimationMixer } from "three";
import { Canvas } from "@react-three/fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export default function AnimationPage() {
  const avatarRef = useRef();
  const clothingRef = useRef();
  const mixer = useRef(); // AnimationMixer를 저장할 ref를 만듭니다.

  useEffect(() => {
    const loader = new GLTFLoader();

    let avatarSkeleton = null; // 아바타의 뼈 구조를 저장할 변수
    // 아바타 모델 로드
    loader.load("/gltf/avatar/animation_100.glb", (gltf) => {
      const avatarMesh = gltf.scene;
      avatarRef.current.add(avatarMesh);

      // 아바타의 뼈 구조 추출
      avatarSkeleton = gltf.scene.getObjectByName("mixamorig_Spine1"); // 실제 이름으로 변경
      //avatarSkeleton = gltf.scene.getObjectByName("mixamorig_Hip"); // 실제 이름으로 변경
      // 의상 뼈 로드
      loader.load("/gltf/avatar/Mantoman_Rigged.gltf", (gltf) => {
        const clothingBone = gltf.scene.getObjectByName("mixamorig_Spine1");
        clothingRef.current.add(clothingBone);
      });
      

      // 애니메이션 Mixer를 생성하고 애니메이션 클립을 추가합니다.
      mixer.current = new AnimationMixer(avatarMesh);
      const clips = gltf.animations;
      if (clips && clips.length > 0) {
        clips.forEach((clip) => {
          mixer.current.clipAction(clip).play(); // 모든 애니메이션 클립을 재생합니다.
        });
      }
    });


    // 프레임마다 아바타 메쉬의 뼈 구조를 기반으로 의상 메쉬의 위치 업데이트
    const updateClothingPosition = () => {
      if (avatarSkeleton) {
        //clothingRef.current.position.copy(avatarSkeleton.position);
        clothingRef.current.position.x = avatarSkeleton.position.x;
        clothingRef.current.position.z = avatarSkeleton.position.z;
        clothingRef.current.quaternion.copy(avatarSkeleton.quaternion);
        clothingRef.current.scale.copy(avatarSkeleton.scale);
      }
    };

    // Three.js 렌더링 루프에서 위치 업데이트 함수와 애니메이션 업데이트 함수 호출
    const animate = () => {
      updateClothingPosition();
      if (mixer.current) {
        mixer.current.update(0.01); // AnimationMixer 업데이트
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <Canvas
      style={{ background: "transparent", position: "absolute", width: "100%", height: "100%" }}
      shadows
      camera={{
        rotation: [0, 0, 0],
        fov: 150,
        zoom: 10,
        near: 1,
        far: 10,
      }}
    >
      <spotLight position={[0, 2, 0.5]} />
      <ambientLight />

      <group ref={avatarRef}>
        <group ref={clothingRef} />
      </group>
    </Canvas>
  );
}
