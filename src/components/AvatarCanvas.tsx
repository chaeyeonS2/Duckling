import { OrbitControls } from "@react-three/drei";
import { Canvas, RootState, CanvasProps } from "@react-three/fiber";
import { forwardRef, useCallback } from "react";

const AvatarCanvas = forwardRef<RootState, CanvasProps>(({ children, camera, ...props }, ref) => {
  const rootStateRef = useCallback((rootState: RootState) => {
    if (!ref) return;

    rootState.gl.domElement.addEventListener(
      "webglcontextlost",
      function (event) {
        event.preventDefault();
        setTimeout(function () {
          rootState.gl.forceContextRestore();
        }, 100);
      },
      false
    );

    if (typeof ref === "function") ref(rootState);
    else ref.current = rootState;
  }, []);

  return (
    <Canvas
      onCreated={rootStateRef}
      shadows
      camera={{
        //position: [0, 0, 5],
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
        minDistance={2}
        maxDistance={8}
        enableRotate // 회전 활성화
        enableDamping // 부드러운 움직임 효과 활성화
        enablePan={false} // 이동 비활성화
        dampingFactor={0.1} // 부드러운 움직임 강도 설정
      />
    </Canvas>
  );
});
export default AvatarCanvas;
