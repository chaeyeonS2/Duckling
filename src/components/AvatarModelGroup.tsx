import useSWR from "swr";
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
  const { data: user } = useSWR(`/api/users/${userId}`);
  const { getGLTFs } = useGltf();

  if (userId === null) return null;

  const models = getGLTFs(
    ...Object.values(user?.userAvatar ?? {}).map((path) => ({ gltfPath: path, identfier: "deco" } as const)),
    "/gltf/avatar/T_POSED_BODY_RIGGED_FINAL.gltf",
    "/gltf/avatar/nose.gltf",
    "/gltf/avatar/stage.glb"
  );

  return <GroupWrpper groups={models} position={position} {...props} />;
}
