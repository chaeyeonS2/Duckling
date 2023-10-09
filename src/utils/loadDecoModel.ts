import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadDecoModel(
  gltfPath: string,
  setScale: number,
  positionX: number,
  positionY: number,
  positionZ: number
) {
  return new Promise<GLTFAsset>((res, rej) => {
    if (!gltfPath) {
      // TODO: null이나 undefined일 가능성은 어디로부터 기인되는가?
      rej("Invalid gltfPath: " + gltfPath);
      return;
    }

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      gltfPath,
      (childGltf) => {
        const model = childGltf.scene;
        model.scale.set(setScale, setScale, setScale);
        model.position.set(positionX, positionY, positionZ);
        res(childGltf);
      },
      () => {},
      rej
    );
  });
}
