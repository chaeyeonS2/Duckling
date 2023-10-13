import useSWRImmutable from "swr/immutable";
import { useGLTFs } from "@/lib/GltfManager";
import GroupWrpper from "@/components/GroupWrapper";

export default function ModelGroup() {
  const { data: user } = useSWRImmutable<APIUserResponse>(`/api/users/${localStorage.getItem("id")}`);
  const models = useGLTFs(
    ...Object.values(user?.userAvatar ?? {}).map((path) => ({ gltfPath: path, identfier: "deco" } as const)),
    "/gltf/avatar/basic_avatar_[no_face].gltf",
    "/gltf/avatar/keyring.glb",
    "/gltf/avatar/stage.glb"
  );

  return (
    <group position={[0, -0.01, 0]} rotation={[0.08, 0, 0]}>
      <GroupWrpper groups={models.filter((m): m is NonNullable<typeof m> => !!m)} />
    </group>
  );
}
