import Footer from "../../footer";
import Header from "../../headers/header";
import "../../css/layout.css";
import React, {Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "../../css/customBottomSheet.css";
import { OrbitControls } from "@react-three/drei";
import Mypost from "./myPost";
import GetGltfModels from "./GetGltfModels";

const Home = () => {
  return (
    <div className="layoutA">
      <Header />
      <div
        className="content"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(/img/home/background.png)",
        }}
      >
        <Suspense fallback={null}>
          <Canvas
            style={{ background: "transparent" }}
            shadows
            camera={{
              rotation: [0, 0, 0],
              fov: 150,
              zoom: 100,
              near: 1,
              far: 10,
            }}
          >
            <spotLight
              intensity={1}
              position={[0, 30, 80]}
              angle={0.2}
              penumbra={1}
              castShadow
            />
            <ambientLight intensity={0.5} />

            <GetGltfModels page={"home"} />

            <OrbitControls
              enableZoom={false} // 확대/축소 비활성화
              enableRotate={true} // 회전 활성화
              enablePan={false} // 이동 비활성화
              enableDamping // 부드러운 움직임 효과 활성화
              dampingFactor={0.1} // 부드러운 움직임 강도 설정
              enableKeys={false} // 키보드 단축키 비활성화
              touchZoomSpeed={0} // 모바일 확대/축소 비활성화
              touchRotateSpeed={1} // 모바일 회전 활성화
            />
          </Canvas>
        </Suspense>
      </div>
      <Mypost />

      <Footer btn={1} />
    </div>
  );
};

export default Home;
