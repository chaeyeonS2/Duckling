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
  deco: { scale: 0.13, position: [0, -0.04, 0] },
  nose: { scale: 0.13, position: [0, -0.04, 0] },
  T_POSED_BODY_RIGGED_FINAL: { scale: 0.13, position: [0, -0.04, 0] },
  stage: { scale: 0.04, position: [0, -0.055, 0.0025] },
};
const loader: GLTFLoader = new GLTFLoader();
const regist: Record<string, Promise<THREE.Group> | undefined> = {};
export function loadModel(gltfPath: string, options: string | GLTFLoadOptions) {
  const pending = regist[gltfPath];
  if (pending) {
    return new Promise<THREE.Group>((res, rej) => pending.then(res, rej));
  }

  const { scale, position } = typeof options === "string" ? gltfDataset[options] : options;
  const newPending = new Promise<THREE.Group>((res, rej) =>
    loader.load(
      gltfPath,
      (childGltf) => {
        const model = childGltf.scene;
        model.scale.set(scale, scale, scale);
        model.position.set(...position);
        res(model);
      },
      () => {},
      rej
    )
  );
  regist[gltfPath] = newPending;
  return newPending;
}
