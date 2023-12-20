import useSWRImmutable from "swr/immutable";
import { useGltf } from "@/components/GltfProvider";
import GroupWrpper from "@/components/GroupWrapper";

export interface AvatarModelGroupProps {
  userId?: string | null;
  position?: [x: number, y: number, z: number];
}
export default function AvatarModelGroup({ userId = localStorage.getItem("id"), position }: AvatarModelGroupProps) {
  const { data: user } = useSWRImmutable(`/api/users/${userId}`);
  const { getGLTFs } = useGltf();

  if (userId === null) return null;

  const models = getGLTFs(
    ...Object.values(user?.userAvatar ?? {}).map((path) => ({ gltfPath: path, identfier: "deco" } as const)),
    "/gltf/avatar/cheek_avatarglb.gltf",
    "/gltf/avatar/keyring.glb",
    "/gltf/avatar/nose.gltf",
    "/gltf/avatar/stage.glb"
  );

  return <GroupWrpper groups={models} position={position} />;
}
