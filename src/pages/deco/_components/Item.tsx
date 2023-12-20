import { useState } from "react";

import * as styles from "./item.css";
import useSWRImmutable from "swr/immutable";
import { produce } from "immer";

export interface ItemProps {
  currentKind: keyof User["userAvatar"];
}
export default function Item({ currentKind }: ItemProps) {
  const [currentAsset, setCurrentAsset] = useState<string>();
  const { data: assets } = useSWRImmutable(`/api/assets/?kind=${currentKind}`);
  const { data: user, mutate } = useSWRImmutable(`/api/users/${localStorage.getItem("id")}`);

  const handleClick = (kind: keyof User["userAvatar"], item: Asset) => {
    setCurrentAsset(item.assetID);

    const newUser = produce(user, (draft) => {
      if (!draft) return;
      draft.userAvatar[kind] = item.assetGltf;
    });

    mutate(newUser, { revalidate: false });
  };
  return (
    <div className={styles.itemBoxDiv}>
      {assets?.map((item) => {
        return (
          <div
            key={item.assetID}
            className={styles.itemBox}
            aria-selected={currentAsset == item.assetID}
            onClick={() => handleClick(currentKind, item)}
          >
            <img className={styles.itemImg} src={item.assetImg} alt="" />
          </div>
        );
      })}
    </div>
  );
}
