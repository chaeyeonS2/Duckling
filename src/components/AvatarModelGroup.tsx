import useSWRImmutable from "swr/immutable";
import { useGltf } from "@/components/GltfProvider";
import GroupWrpper from "@/components/GroupWrapper";

export default function AvatarModelGroup() {
  const { data: user } = useSWRImmutable<APIUserResponse>(`/api/users/${localStorage.getItem("id")}`);
  const { getGLTFs } = useGltf();

  const models = getGLTFs(
    ...Object.values(user?.userAvatar ?? {}).map((path) => ({ gltfPath: path, identfier: "deco" } as const)),
    "/gltf/avatar/cheek_avatarglb.gltf",
    "/gltf/avatar/keyring.glb",
    "/gltf/avatar/nose.gltf",
    "/gltf/avatar/stage.glb"
  );

  return <GroupWrpper groups={models} position={[0, -0.01, 0]} rotation={[0.08, 0, 0]} />;
}
