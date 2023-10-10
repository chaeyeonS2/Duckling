import GroupWrpper from "@/components/GroupWrapper";
import { useGLTFs } from "@/lib/GltfManager";

export interface ModelGroupProps {
  isFaceDeco: boolean;
  defaultgltf: User["userAvatar"];
}

export default function ModelGroup({ defaultgltf, isFaceDeco }: ModelGroupProps) {
  const models = useGLTFs(...Object.values(defaultgltf).map((path) => ({ gltfPath: path, identifier: "deco" })), "/gltf/avatar/cheek_avatarglb.gltf", "/gltf/avatar/keyring.glb", "/gltf/avatar/nose.gltf", "/gltf/avatar/stage.glb");

  return (
    <group scale={isFaceDeco ? 1.3 : 0.8} position={isFaceDeco ? [0, -0.02, 0] : [0, 0.045, 0]} rotation={[0.08, 0, 0]}>
      <GroupWrpper groups={models.filter((m): m is NonNullable<typeof m> => !!m)} />
    </group>
  );
}
