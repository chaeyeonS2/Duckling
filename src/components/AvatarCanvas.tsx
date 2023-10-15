import { OrbitControls } from "@react-three/drei";
import { Canvas, RootState } from "@react-three/fiber";
import { forwardRef } from "react";

const AvatarCanvas = forwardRef<RootState, React.PropsWithChildren<React.ComponentProps<typeof Canvas>>>(
  ({ children, ...props }, ref) => {
    return (
      <Canvas
        onCreated={(rootState) => {
          if (!ref) return;
          if (typeof ref === "function") ref(rootState);
          else ref.current = rootState;
        }}
        style={{ background: "transparent", position: "absolute", width: "100%", height: "100%" }}
        shadows
        camera={{
          rotation: [0, 0, 0],
          fov: 150,
          zoom: 100,
          near: 1,
          far: 10,
        }}
        {...props}
      >
        <spotLight position={[0, 0.2, 0.5]} />
        <ambientLight />

        {children}

        <OrbitControls
          enableZoom={false} // 확대/축소 비활성화
          enableRotate={true} // 회전 활성화
          enablePan={false} // 이동 비활성화
          enableDamping // 부드러운 움직임 효과 활성화
          dampingFactor={0.1} // 부드러운 움직임 강도 설정
        />
      </Canvas>
    );
  }
);
export default AvatarCanvas;
