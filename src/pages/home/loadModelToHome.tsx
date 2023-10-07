//@ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// 부모와 자식 gltf 모델들을 로드하고 그룹에 추가하는 함수
const loadModelToHome = (
  groupRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>,
  defaultgltf: User["userAvatar"]
) => {
  const gltfLoader = new GLTFLoader();
  //avatar gltf 모델 추가
  gltfLoader.load("gltf/avatar/basic_avatar_[no_face].gltf", (parentGltf) => {
    if (!groupRef.current) return;

    const avatarModel = parentGltf.scene;
    avatarModel.scale.set(1.1, 1.1, 1.1); // 부모 모델 크기 조정
    avatarModel.position.set(0, -0.04, 0);
    // //텍스쳐 적용 -> 이번에 적용할 수도 있는 기능이라 남겨두었습니다!
    // avatarModel.traverse((child) => {
    //   if (child.isMesh) {
    //     child.material = child.material.clone();
    //     child.material.map = texture;
    //   }
    // });
    groupRef.current.add(avatarModel);
  });

  //나머지 deco 모델 추가
  putDecoGltfToHome(defaultgltf["eyes"], 1.1, 0, -0.04, 0, groupRef);
  putDecoGltfToHome(defaultgltf["mouth"], 1.1, 0, -0.04, 0, groupRef);
  putDecoGltfToHome(defaultgltf["top"], 1.1, 0, -0.04, 0, groupRef);
  putDecoGltfToHome(defaultgltf["bottom"], 1.1, 0, -0.04, 0, groupRef);
  putDecoGltfToHome(defaultgltf["shoes"], 1.1, 0, -0.04, 0, groupRef);
  putDecoGltfToHome(defaultgltf["accessory"], 1.1, 0, -0.04, 0, groupRef);
  putDecoGltfToHome("/gltf/avatar/keyring.glb", 0.02, 0, 0.155, 0.01, groupRef);
  putDecoGltfToHome(
    "/gltf/avatar/stage.glb",
    0.04,
    0,
    -0.055,
    0.0025,
    groupRef
  );
};

function putDecoGltfToHome(
  gltfPath: string,
  setScale: number,
  positionX: number,
  positionY: number,
  positionZ: number,
  groupRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>
) {
  if (!gltfPath) return;

  // gltfPath가 null이나 undefined가 아닌 경우에만 실행
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(gltfPath, (childGltf) => {
    if (!groupRef.current) return;

    const model = childGltf.scene;
    model.scale.set(setScale, setScale, setScale);
    model.position.set(positionX, positionY, positionZ);
    groupRef.current.add(model);

    console.log(gltfPath);
  });
}

export default loadModelToHome;
