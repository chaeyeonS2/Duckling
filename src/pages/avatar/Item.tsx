import "@/css/item.css";
import { useState } from "react";
import Itembox from "./Itembox";
import axios from "axios";

export interface ItemProps {
  type: string;
}
export default function Item({ type }: ItemProps) {
  const [kind, setKind] = useState("top");
  const [assets, setAssets] = useState<APIAssetsResponse>([]);
  const fetchTo = async (kind: string) => {
    const { data } = await axios.get<APIAssetsResponse>(
      `/api/assets/${type == "face" ? "face" : "body"}/${kind}`
    );
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

  return (
    <div>
      {type === "face" ? (
        <div className="faceDeco Deco">
          <div className="faceBtnGroup typeItemBtnGroup">
            <div
              className={kind === "eyes" ? "selectBtn" : "nonSelectbtn"}
              onClick={() => {
                fetchTo("eyes");
              }}
            >
              눈
            </div>
            <div
              className={kind === "mouth" ? "selectBtn" : "nonSelectbtn"}
              onClick={() => {
                fetchTo("mouth");
              }}
            >
              입
            </div>
          </div>
          <div className="itemBoxDiv">
            {assets && //아이템 썸네일 박스
              assets.map((item, index) => {
                return (
                  <Itembox
                    key={index}
                    type={kind}
                    imgSrc={item.assetImg}
                    index={item.assetID}
                    handleClick={handleClick}
                    selectDeco={selectDeco}
                    gltfPath={item.assetGltf}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <div className="clothDeco Deco">
          <div className="clothBtnGroup typeItemBtnGroup">
            <div
              className={kind === "top" ? "selectBtn" : "nonSelectbtn"}
              onClick={() => {
                fetchTo("top");
              }}
            >
              상의
            </div>
            <div
              className={kind === "bottom" ? "selectBtn" : "nonSelectbtn"}
              onClick={() => {
                setKind("bottom");
              }}
            >
              하의
            </div>
            <div
              className={kind === "shoes" ? "selectBtn" : "nonSelectbtn"}
              onClick={() => {
                setKind("shoes");
              }}
            >
              신발
            </div>
            <div
              className={kind === "accessory" ? "selectBtn" : "nonSelectbtn"}
              onClick={() => {
                setKind("accessory");
              }}
            >
              기타
            </div>
          </div>
          <div className="itemBoxDiv">
            {assets && //아이템 썸네일 박스
              assets.map((item, index) => {
                return (
                  <Itembox
                    key={index}
                    type={kind}
                    imgSrc={item.assetImg}
                    index={item.assetID}
                    handleClick={handleClick}
                    selectDeco={selectDeco}
                    gltfPath={item.assetGltf}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
