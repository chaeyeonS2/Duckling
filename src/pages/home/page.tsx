import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/headers/Header";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "@/css/customBottomSheet.css";
import { OrbitControls } from "@react-three/drei";
import Mypost from "./_components/MyPost";
import ModelGroup from "./_components/ModelGroup";

export default function HomePage() {
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
            <spotLight intensity={1} position={[0, 30, 80]} angle={0.2} penumbra={1} castShadow />
            <ambientLight intensity={0.5} />

            <ModelGroup />

            <OrbitControls
              enableZoom={false} // 확대/축소 비활성화
              enableRotate={true} // 회전 활성화
              enablePan={false} // 이동 비활성화
              enableDamping // 부드러운 움직임 효과 활성화
              dampingFactor={0.1} // 부드러운 움직임 강도 설정
            />
          </Canvas>
        </Suspense>
      </div>
      <Mypost />

      <Footer btn={1} />
    </div>
  );
}
