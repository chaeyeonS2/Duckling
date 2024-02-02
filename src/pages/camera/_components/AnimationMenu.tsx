import * as styles from "./animationMenu.css";
import useSWRImmutable from "swr/immutable";
import { useEffect, useState, forwardRef, MutableRefObject } from "react";
import View3D from "@egjs/react-view3d";
import { DynamicIcon } from "@/components/Icon";

interface AnimationMenuProps {
  animationGltf: (data: Asset) => void;
}

const AnimationMenu = forwardRef<View3D, AnimationMenuProps>((props, ref) => {
  const { data: icons } = useSWRImmutable(`/api/assets/?kind=ar`);
  const view3DRef = ref as MutableRefObject<View3D>;
  const [isAvailableAR, setIsAvailableAR] = useState<boolean>(false);

  const checkAvailableAR = async () => {
    if (view3DRef?.current) {
      const arAvailable = await view3DRef.current.ar.isAvailable();
      setIsAvailableAR(arAvailable);
    }
  };

  //   const animationNames = view3DRef.current?.animator.clips.map((clip) => {
  //     clip.name;
  //   });
  //   console.log(animationNames);

  useEffect(() => {
    checkAvailableAR();
  }, []);

  const enterAR = () => {
    view3DRef?.current?.ar.enter();
  };

  const animationClick = (gltfPath: Asset) => {
    props.animationGltf(gltfPath);
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.title}>아바타 모션</div>
      <div className={styles.iconContainer}>
        <div
          className={styles.camera}
          onClick={enterAR}
          //onClick={() => handleClick(currentKind, item)}  //클릭 시 ar 카메라 실행
        >
          <DynamicIcon
            id="avatarmotion-camera"
            size="large"
            style={{
              color: isAvailableAR ? "#BDFF6B" : "gray",
            }}
          />
        </div>
        <div className={styles.menu}>
          {icons?.map((item, index) => {
            return (
              <div key={index} className={styles.iconBox} onClick={() => animationClick(item)}>
                <img className={styles.iconImg} src={item.assetImg} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default AnimationMenu;
