import { useEffect, useRef } from "react";
import { loadDecoModel } from "@/utils/loadDecoModel";
import useSWRImmutable from "swr/immutable";

export default function ModelGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { data: user } = useSWRImmutable<APIUserResponse>(() => [`/api/users/${localStorage.getItem("id")}`]);

  useEffect(() => {
    if (!user) return;
    for (const keys in user.userAvatar) {
      loadDecoModel(keys, 1.1, 0, -0.04, 0).then((gltf) => groupRef.current?.add(gltf.scene));
    }
    loadDecoModel("gltf/avatar/basic_avatar_[no_face].gltf", 1.1, 0, -0.04, 0).then((gltf) =>
      groupRef.current?.add(gltf.scene)
    );
    loadDecoModel("/gltf/avatar/keyring.glb", 0.02, 0, 0.155, 0.01).then((gltf) => groupRef.current?.add(gltf.scene));
    loadDecoModel("/gltf/avatar/stage.glb", 0.04, 0, -0.055, 0.0025).then((gltf) => groupRef.current?.add(gltf.scene));
  }, [user]);

  return <group ref={groupRef} position={[0, -0.01, 0]} rotation={[0.08, 0, 0]} />;
}
