import { useState } from "react";
import axios from "axios";

import * as styles from "./item.css";

export interface ItemProps {
  type: string;
  onItemClick?: (kind: string, item: APIAssetsResponse[number]) => void;
}
export default function Item({ type, onItemClick }: ItemProps) {
  const [kind, setKind] = useState("top");
  const [assets, setAssets] = useState<APIAssetsResponse>([]);
  const fetchTo = async (kind: string) => {
    const { data } = await axios.get(`/api/assets/${type == "face" ? "face" : "body"}/${kind}`);
    setKind(kind);
    setAssets(data);
  };

  const [selectDeco, setSelectDeco] = useState<boolean[]>([false]);
  const handleClick = (idx: number) => {
    const newArr = Array(assets.length).fill(false);
    newArr[idx] = true;

    setSelectDeco(newArr);
  };

  if (!assets) return null;
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
          {items.map(([key, text]) => (
            <div className={kind === key ? styles.selectBtn : styles.nonSelectbtn} onClick={() => fetchTo(key)}>
              {text}
            </div>
          ))}
        </div>
        <div className={styles.itemBoxDiv}>
          {assets?.map((item, index) => {
            return (
              <div
                key={item.assetID}
                className={selectDeco[index] ? styles.itemBoxClick : styles.itemBox}
                onClick={() => handleClick(index)}
              >
                <img
                  className={styles.itemImg}
                  src={item.assetImg}
                  onClick={() => onItemClick?.(kind, item)}
                  alt=""
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
