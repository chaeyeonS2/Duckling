import { loadDecoModel } from "@/utils/loadDecoModel";
import { useRef, useEffect } from "react";

export interface ModelGroupProps {
  isFaceDeco: boolean;
  defaultgltf: User["userAvatar"];
  setDefaultGltf: (newGltf: User["userAvatar"]) => void;
}
export default function ModelGroup({ defaultgltf, isFaceDeco, setDefaultGltf }: ModelGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const kindGltfMap = useRef<Map<string, THREE.Group>>(new Map());

  //deco 추가하는 함수
  const putDecoGltf = async (
    gltfPath: string,
    setScale: number,
    positionX: number,
    positionY: number,
    positionZ: number,
    type: string
  ) => {
    if (!groupRef.current) return;
    const { scene: model } = await loadDecoModel(gltfPath, setScale, positionX, positionY, positionZ);
    const childToRemove = kindGltfMap.current.get(type);
    if (childToRemove) {
      groupRef.current.remove(childToRemove);
    }
    groupRef.current.add(model);
    kindGltfMap.current.set(type, model);

    setDefaultGltf({ [type]: gltfPath, ...defaultgltf });
  };

  // gltf 모델들을 로드하고 그룹에 추가하는 함수
  useEffect(() => {
    // 파일 path, scale, position(x, y, z) 순서
    putDecoGltf(defaultgltf["eyes"], 1.1, 0, -0.04, 0, "eyes");
    putDecoGltf(defaultgltf["mouth"], 1.1, 0, -0.04, 0, "mouth");
    putDecoGltf(defaultgltf["top"], 1.1, 0, -0.04, 0, "top");
    putDecoGltf(defaultgltf["bottom"], 1.1, 0, -0.04, 0, "bottom");
    putDecoGltf(defaultgltf["shoes"], 1.1, 0, -0.04, 0, "shoes");
    putDecoGltf(defaultgltf["accessory"], 1.1, 0, -0.04, 0, "accessory");

    loadDecoModel("/gltf/avatar/cheek_avatarglb.gltf", 1.1, 0, -0.04, 0);
    loadDecoModel("/gltf/avatar/keyring.glb", 0.02, 0, 0.155, 0.01);
    loadDecoModel("/gltf/avatar/nose.gltf", 1.1, 0, -0.04, 0);
    loadDecoModel("/gltf/avatar/stage.glb", 0.04, 0, -0.055, 0.0025);
  }, [defaultgltf]);

  return (
    <group
      ref={groupRef}
      scale={isFaceDeco ? 1.3 : 0.8}
      position={isFaceDeco ? [0, -0.02, 0] : [0, 0.045, 0]}
      rotation={[0.08, 0, 0]}
    />
  );
}
