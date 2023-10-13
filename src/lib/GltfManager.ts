import { useSyncExternalStore } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface GLTFLoadOptions {
  scale: number;
  position: [number, number, number];
}

/**
 * `GLTFLoader`로 gltf 파일을 불러오고 나서
 * scale과 position를 설정하기 위한 Preset 모음
 */
const gltfDataset: Record<string, GLTFLoadOptions> = {
  deco: { scale: 1.1, position: [0, -0.04, 0] },
  cheek_avatarglb: { scale: 1.1, position: [0, -0.04, 0] },
  keyring: { scale: 0.02, position: [0, 0.155, 0.01] },
  nose: { scale: 1.1, position: [0, -0.04, 0] },
  stage: { scale: 0.04, position: [0, -0.055, 0.0025] },
  "basic_avatar_[no_face]": { scale: 1.1, position: [0, -0.04, 0] },
};

/**
 * .gltf, 즉 모델은 정적 에셋이다 = 바뀌지 않는다
 * 그럼 그냥 gltfPath: model로다가 매핑하면 장땡 아닌가
 */
class GltfManager {
  loader: GLTFLoader = new GLTFLoader();
  registry: Map<string, THREE.Group> = new Map();
  listeners: Set<() => void> = new Set();

  loadModel(gltfPath: string, options: GLTFLoadOptions) {
    return new Promise((res, rej) => {
      this.loader.load(
        gltfPath,
        (childGltf) => {
          const model = childGltf.scene;
          model.scale.set(options.scale, options.scale, options.scale);
          model.position.set(...options.position);
          this.registry.set(gltfPath, model);
          this.onChanged();
          res(childGltf);
        },
        () => {},
        rej
      );
    });
  }

  onChanged() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot() {
    return this.registry;
  }
}

const gltfManager = new GltfManager();

/**
 * 단일 모델에 대하여 경로를 제공받아서 실행합니다.
 * @param gltfPath 불러올 모델 경로
 * @param identfier 모델 로드 사후 크기/위치 설정을 위한 데이터셋 커스텀 키. 기본값은 gltfPath의 gltf 파일명
 * @returns 모델이 존재한다면 바로 사용, 존재하지 않는다면 불러오고 나중에 재랜더링하여 사용
 */
export const useGLTF = (gltfPath: string, identfier?: "deco") => {
  const gltfKey = identfier ?? gltfPath.split(/[\/|\.]/).slice(-2, -1)[0];
  const registry = useSyncExternalStore(
    (listener) => gltfManager.subscribe(listener),
    () => gltfManager.getSnapshot()
  );
  const model = registry.get(gltfPath);
  if (!model) gltfManager.loadModel(gltfPath, gltfDataset[gltfKey]);
  return model;
};

/**
 * 여러 모델들에 대하여 경로를 제공받아서 실행합니다.
 * @param modelData 불러올 모델 데이터, 내용은 `useGltf` 파라미터와 동일
 * @returns `useGltf`의 반환값의 배열 버전. 관련 로직은 모두 동일
 */
export const useGLTFs = (...modelData: Array<string | { gltfPath: string; identfier?: "deco" }>) => {
  const models = [];
  const registry = useSyncExternalStore(
    (listener) => gltfManager.subscribe(listener),
    () => gltfManager.getSnapshot()
  );
  for (const data of modelData) {
    const identfier = typeof data === "string" ? undefined : data.identfier;
    const gltfPath = typeof data === "string" ? data : data.gltfPath;
    const gltfKey = identfier ?? gltfPath.split(/[\/|\.]/).slice(-2, -1)[0];

    const model = registry.get(gltfPath);
    if (!model) gltfManager.loadModel(gltfPath, gltfDataset[gltfKey]);
    models.push(model);
  }
  return models;
};
