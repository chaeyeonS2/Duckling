import axios from "axios";
import { useEffect, useRef, useState } from "react";
import loadModelToHome from "./loadModelToHome";

interface GetGltfModelsProps {
  page: string;
}
const GetGltfModels = ({ page }: GetGltfModelsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [defaultgltf, setDefaultGltf] = useState<User["userAvatar"]>();
  useEffect(() => {
    const uid = localStorage.getItem("id");
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`
        );
        await setDefaultGltf(response.data.userAvatar);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!defaultgltf) return;

    page === "home"
      ? loadModelToHome(groupRef, defaultgltf)
      : loadModelToHome(groupRef, defaultgltf); //GLTF 모델 불러오기
  }, [defaultgltf]);

  return (
    <group ref={groupRef} position={[0, -0.01, 0]} rotation={[0.08, 0, 0]} />
  );
};

export default GetGltfModels;
