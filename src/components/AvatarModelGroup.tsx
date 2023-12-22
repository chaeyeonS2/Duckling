import useSWRImmutable from "swr/immutable";
import { useGltf } from "@/components/GltfProvider";
import GroupWrpper, { GroupWrpperProps } from "@/components/GroupWrapper";

export interface AvatarModelGroupProps extends Omit<GroupWrpperProps, "groups"> {
  userId?: string | null;
  position?: [x: number, y: number, z: number];
}
export default function AvatarModelGroup({
  userId = localStorage.getItem("id"),
  position,
  ...props
}: AvatarModelGroupProps) {
  const { data: user } = useSWRImmutable(`/api/users/${userId}`);
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

  return <GroupWrpper groups={models} position={position} {...props} />;
}
