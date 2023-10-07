import "../../css/item.css";
import { useState, useEffect } from "react";
import Itembox from "./Itembox";
import axios from "axios";

export interface ItemProps {
  type: string;
}
const Item = ({ type }: ItemProps) => {
  const [assetArray, setAssetArray] = useState<Asset[]>([]);

  const [typeItemState_face, setItemTypeState_face] = useState("eyes"); //face 카테고리
  const [typeItemState_cloth, setItemTypeState_cloth] = useState("top"); //cloth 카테고리

  const [selectDeco, setSelectDeco] = useState<boolean[]>([false]);
  const handleClick = (idx: number) => {
    const newArr = Array(assetArray.length).fill(false);
    newArr[idx] = true;

    setSelectDeco(newArr);
  };

  const [content, setContent] = useState<JSX.Element>();
  const handleChangeContent = () => {
    // 상태 변수를 변경하여 내용을 바꿉니다.
    if (type === "face") {
      setContent(
        <div className="faceDeco Deco">
          <div className="faceBtnGroup typeItemBtnGroup">
            <div
              className={
                typeItemState_face === "eyes" ? "selectBtn" : "nonSelectbtn"
              }
              onClick={() => {
                setItemTypeState_face("eyes");
              }}
            >
              눈
            </div>
            <div
              className={
                typeItemState_face === "mouth" ? "selectBtn" : "nonSelectbtn"
              }
              onClick={() => {
                setItemTypeState_face("mouth");
              }}
            >
              입
            </div>
          </div>
          <div className="itemBoxDiv">
            {assetArray && //아이템 썸네일 박스
              assetArray.map((item, index) => {
                return (
                  <Itembox
                    key={index}
                    type={typeItemState_face}
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
      );
    } else {
      //if 'cloth'
      setContent(
        <div className="clothDeco Deco">
          <div className="clothBtnGroup typeItemBtnGroup">
            <div
              className={
                typeItemState_cloth === "top" ? "selectBtn" : "nonSelectbtn"
              }
              onClick={() => {
                setItemTypeState_cloth("top");
              }}
            >
              상의
            </div>
            <div
              className={
                typeItemState_cloth === "bottom" ? "selectBtn" : "nonSelectbtn"
              }
              onClick={() => {
                setItemTypeState_cloth("bottom");
              }}
            >
              하의
            </div>
            <div
              className={
                typeItemState_cloth === "shoes" ? "selectBtn" : "nonSelectbtn"
              }
              onClick={() => {
                setItemTypeState_cloth("shoes");
              }}
            >
              신발
            </div>
            <div
              className={
                typeItemState_cloth === "accessory"
                  ? "selectBtn"
                  : "nonSelectbtn"
              }
              onClick={() => {
                setItemTypeState_cloth("accessory");
              }}
            >
              기타
            </div>
          </div>
          <div className="itemBoxDiv">
            {assetArray && //아이템 썸네일 박스
              assetArray.map((item, index) => {
                return (
                  <Itembox
                    key={index}
                    type={typeItemState_cloth}
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
      );
    }
  };

  useEffect(() => {
    const getAvataInfo = async () => {
      try {
        if (type === "face") {
          const response = await axios.get(
            `https://us-central1-netural-app.cloudfunctions.net/api/assets/face/${typeItemState_face}`
          );
          setAssetArray(response.data);
        } else {
          //type === "cloth"
          const response = await axios.get(
            `https://us-central1-netural-app.cloudfunctions.net/api/assets/body/${typeItemState_cloth}`
          );
          setAssetArray(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAvataInfo();
  }, [type, typeItemState_face, typeItemState_cloth, selectDeco]); // 의존성 배열

  // eyeArray 변경을 감시하고 변경될 때 handleChangeContent() 호출
  useEffect(() => {
    if (assetArray.length > 0) {
      console.log(assetArray);
      handleChangeContent();
    }
  }, [assetArray]);
  return <div>{content}</div>;
};
export default Item;
