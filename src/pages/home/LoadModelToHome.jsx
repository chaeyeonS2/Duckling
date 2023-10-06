import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PutDecoGltfToHome from "./putDecoGltfToHome";

// 부모와 자식 gltf 모델들을 로드하고 그룹에 추가하는 함수
const LoadModelToHome = (groupRef, defaultgltf) => {
  const gltfLoader = new GLTFLoader();
  //avatar gltf 모델 추가
  gltfLoader.load("gltf/avatar/basic_avatar_[no_face].gltf", (parentGltf) => {
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
  PutDecoGltfToHome(defaultgltf["eyes"], 1.1, 0, -0.04, 0, groupRef);
  PutDecoGltfToHome(defaultgltf["mouth"], 1.1, 0, -0.04, 0, groupRef);
  PutDecoGltfToHome(defaultgltf["top"], 1.1, 0, -0.04, 0, groupRef);
  PutDecoGltfToHome(defaultgltf["bottom"], 1.1, 0, -0.04, 0, groupRef);
  PutDecoGltfToHome(defaultgltf["shoes"], 1.1, 0, -0.04, 0, groupRef);
  PutDecoGltfToHome(defaultgltf["accessory"], 1.1, 0, -0.04, 0, groupRef);
  PutDecoGltfToHome("/gltf/avatar/keyring.glb", 0.02, 0, 0.155, 0.01, groupRef);
  PutDecoGltfToHome(
    "/gltf/avatar/stage.glb",
    0.04,
    0,
    -0.055,
    0.0025,
    groupRef
  );
};

export default LoadModelToHome;
