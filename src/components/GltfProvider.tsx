import { loadModel } from "@/utils/loadModel";
import { createContext, useContext, useState } from "react";

interface GLTFContext {
  registry: Record<string, THREE.Group>;

  /**
   * 단일 모델에 대하여 경로를 제공받아서 실행합니다.
   * @param gltfPath 불러올 모델 경로
   * @param identfier 모델 로드 사후 크기/위치 설정을 위한 데이터셋 커스텀 키. 기본값은 gltfPath의 gltf 파일명
   * @returns 모델이 존재한다면 바로 사용, 존재하지 않는다면 불러오고 나중에 재랜더링하여 사용
   */
  getGLTF(gltfPath: string, identfier?: "deco"): THREE.Group | undefined;

  /**
   * 여러 모델들에 대하여 경로를 제공받아서 실행합니다.
   * @param modelData 불러올 모델 데이터, 내용은 `useGltf` 파라미터와 동일
   * @returns `useGltf`의 반환값의 배열 버전. 관련 로직은 모두 동일
   */
  getGLTFs(...gltfPathData: Array<string | { gltfPath: string; identfier?: "deco" }>): Array<THREE.Group>;
}
const GltfContext = createContext<GLTFContext>({ registry: {}, getGLTF: () => undefined, getGLTFs: () => [] });

export default function GltfProvider({ children }: React.PropsWithChildren) {
  const [registry, setRegistry] = useState<Record<string, THREE.Group>>({});

  const getGLTF = (gltfPath: string, identfier?: "deco") => {
    const gltfKey = identfier ?? gltfPath.split(/[\/|\.]/).slice(-2, -1)[0];
    if (!registry[gltfPath]) {
      loadModel(gltfPath, gltfKey).then((model) => {
        setRegistry((registry) => ({ ...registry, [gltfPath]: model }));
      });
    }
    return registry[gltfPath];
  };

  const getGLTFs = (...gltfPathData: Array<string | { gltfPath: string; identfier?: "deco" }>) => {
    const models: THREE.Group[] = [];
    for (const strOrData of gltfPathData) {
      const { gltfPath, identfier } =
        typeof strOrData === "string" ? { gltfPath: strOrData, identfier: undefined } : strOrData;
      const model = getGLTF(gltfPath, identfier);
      if (model) models.push(model);
    }

    return models;
  };

  return <GltfContext.Provider value={{ registry, getGLTF, getGLTFs }}>{children}</GltfContext.Provider>;
}
export const useGltf = () => useContext(GltfContext);
