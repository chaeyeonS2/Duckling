import useSWRImmutable from "swr/immutable";
import { useGLTFs } from "@/lib/GltfManager";
import GroupWrpper from "@/components/GroupWrapper";

export default function AvatarModelGroup() {
  const { data: user } = useSWRImmutable<APIUserResponse>(`/api/users/${localStorage.getItem("id")}`);
  const models = useGLTFs(
    ...Object.values(user?.userAvatar ?? {}).map((path) => ({ gltfPath: path, identfier: "deco" } as const)),
    "/gltf/avatar/cheek_avatarglb.gltf",
    "/gltf/avatar/keyring.glb",
    "/gltf/avatar/nose.gltf",
    "/gltf/avatar/stage.glb"
  );

  return <GroupWrpper groups={models} position={[0, -0.01, 0]} rotation={[0.08, 0, 0]} />;
}
