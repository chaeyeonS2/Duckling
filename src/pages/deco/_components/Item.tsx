import { useState } from "react";

import * as styles from "./item.css";
import useSWRImmutable from "swr/immutable";
import { produce } from "immer";

export interface ItemProps {
  currentKind: string;
  isFaceDeco: boolean;
}
export default function Item({ currentKind, isFaceDeco }: ItemProps) {
  const [currentAsset, setCurrentAsset] = useState<string>();
  const { data: assets } = useSWRImmutable<APIAssetsResponse>(
    `/api/assets/${isFaceDeco ? "face" : "body"}/${currentKind}`
  );
  const { data: user, mutate } = useSWRImmutable<APIUserResponse>(`/api/users/${localStorage.getItem("id")}`);

  const handleClick = (kind: string, item: APIAssetsResponse[number]) => {
    setCurrentAsset(item.assetID);

    const newUser = produce(user, (draft) => {
      // @ts-ignore TODO: 나중에 타입 정의
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
