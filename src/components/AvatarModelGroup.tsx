import useSWRImmutable from "swr/immutable";
import { useGltf } from "@/components/GltfProvider";
import GroupWrpper from "@/components/GroupWrapper";

export interface AvatarModelGroupProps {
  userId?: string | null;
}
export default function AvatarModelGroup({ userId = localStorage.getItem("id") }: AvatarModelGroupProps) {
  const { data: user } = useSWRImmutable<APIUserResponse>(`/api/users/${userId}`);
  const { getGLTFs } = useGltf();

  if (userId === null) return null;

  const models = getGLTFs(
    ...Object.values(user?.userAvatar ?? {}).map((path) => ({ gltfPath: path, identfier: "deco" } as const)),
    "/gltf/avatar/cheek_avatarglb.gltf",
    "/gltf/avatar/keyring.glb",
    "/gltf/avatar/nose.gltf",
    "/gltf/avatar/stage.glb"
    //"/gltf/avatar/pink_nasi.gltf"
  );

  return <GroupWrpper groups={models} position={[0, -0.01, 0]} rotation={[0.08, 0, 0]} />;
}
