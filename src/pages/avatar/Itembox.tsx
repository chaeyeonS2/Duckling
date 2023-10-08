import "@/css/item.css";
import { useState, useEffect } from "react";
import * as GltfGroupModels from "./GltfGroupModels";

export interface ItemboxProps {
  type: string;
  imgSrc: string;
  index: number;
  selectDeco: boolean[];
  gltfPath: string;
  handleClick: (index: number) => void;
}
export default function Itembox({
  type,
  imgSrc,
  index,
  selectDeco,
  gltfPath,
  handleClick,
}: ItemboxProps) {
  const putGltf = () => {
    //AvatarDeco.js로 보내는 코드
    GltfGroupModels.isClick(type, gltfPath);
  };
  const [content, setContent] = useState<JSX.Element>();
  const handleItemContent = () => {
    //서버 연동하면 사용
    setContent(
      <img
        className="item_img"
        src={imgSrc}
        onClick={() => putGltf()}
        alt=""
      ></img>
    );
  };
  useEffect(() => {
    handleItemContent();
  }, [type]);

  useEffect(() => {
    if (selectDeco[index]) {
      //해당 버튼이 클릭됐으면
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [selectDeco]);
  const [btnState, setBtnState] = useState(false);
  return (
    <div
      className={btnState ? "item_box_click" : "item_box"}
      onClick={() => handleClick(index)}
    >
      {content}
    </div>
  );
}
