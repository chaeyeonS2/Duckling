import "../../css/item.css";
import React, { useState, useEffect } from "react";
import * as AvatarDeco from "./AvatarDeco";

const Itembox = (props) => {
  var itemtype = props.type;
  var imgSrc = props.imgSrc;
  var index = props.index;
  var selectDeco = props.selectDeco;

  const putGltf = () => {
    //AvatarDeco.js로 보내는 코드
    AvatarDeco.isClick(index, itemtype, props.gltfPath);
  };
  const [content, setContent] = useState(itemtype);
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
  }, [itemtype]);

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
      onClick={() => props.handleClick(index, itemtype)}
    >
      {content}
    </div>
  );
};
export default Itembox;
