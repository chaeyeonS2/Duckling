import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function PutDecoGltfToHome(
  gltfPath,
  setScale,
  positionX,
  positionY,
  positionZ,
  groupRef
) {
  if (gltfPath) {
    // gltfPath가 null이나 undefined가 아닌 경우에만 실행
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(gltfPath, (childGltf) => {
      const model = childGltf.scene;
      model.scale.set(setScale, setScale, setScale);
      model.position.set(positionX, positionY, positionZ);
      groupRef.current.add(model);

      console.log(gltfPath);
    });
  }
}

export default PutDecoGltfToHome;
