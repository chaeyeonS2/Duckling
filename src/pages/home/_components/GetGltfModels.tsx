import { useEffect, useRef } from "react";
import loadModelToHome from "./loadModelToHome";
import useSWRImmutable from "swr/immutable";

export default function GetGltfModels() {
  const groupRef = useRef<THREE.Group>(null);
  const { data: user } = useSWRImmutable<APIUserResponse>(() => [`/api/users/${localStorage.getItem("id")}`]);

  useEffect(() => {
    if (!user) return;
    loadModelToHome(groupRef, user.userAvatar); //GLTF 모델 불러오기
  }, [user]);

  return <group ref={groupRef} position={[0, -0.01, 0]} rotation={[0.08, 0, 0]} />;
}
