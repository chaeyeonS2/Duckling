import { useState } from "react";

import * as styles from "./item.css";
import useSWRImmutable from "swr/immutable";
import { produce } from "immer";

export interface ItemProps {
  type: string;
}
export default function Item({ type }: ItemProps) {
  const [currentKind, setCurrentKind] = useState("top");
  const [currentAsset, setCurrentAsset] = useState<string>();
  const { data: assets } = useSWRImmutable<APIAssetsResponse>(
    `/api/assets/${type == "face" ? "face" : "body"}/${currentKind}`
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

  const items =
    type === "face"
      ? [
          ["eyes", "눈"],
          ["mouth", "입"],
        ]
      : [
          ["top", "상의"],
          ["bottom", "하의"],
          ["shoes", "신발"],
          ["accessory", "기타"],
        ];
  return (
    <div>
      <div className={styles.deco}>
        <div className={styles.buttonGroup}>
          {items.map(([kind, text]) => (
            <div
              key={kind}
              className={currentKind === kind ? styles.selectBtn : styles.nonSelectbtn}
              onClick={() => setCurrentKind(kind)}
            >
              {text}
            </div>
          ))}
        </div>
        <div className={styles.itemBoxDiv}>
          {assets?.map((item) => {
            return (
              <div
                key={item.assetID}
                className={currentAsset == item.assetID ? styles.itemBoxClick : styles.itemBox}
                onClick={() => handleClick(currentKind, item)}
              >
                <img className={styles.itemImg} src={item.assetImg} alt=""></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
