import "../../css/item.css";
import React, { useState, useEffect } from "react";
import Itembox from "../avatar/itembox";
import dataArrays from "./ItemArray";
import ItemArray from "./ItemArray";
import axios from "axios";

const Item = (props) => {
  const type = props.type;
  var [isClick, setClick] = useState(false);

  var getData = (getClick) => {
    //isClick = getGltfPath;
    setClick(getClick);
  };

  var getDataOn = (isClick) => {
    //isClick = getGltfPath;
    props.getData(isClick);
  };

  const [assetArray, setAssetArray] = useState([]);

  const [typeItemState_face, setItemTypeState_face] = useState("eyes"); //face 카테고리
  const [typeItemState_cloth, setItemTypeState_cloth] = useState("top"); //cloth 카테고리
  var itemArray = [0, 1, 2, 3, 5, 6, 7]; //item 임의 개수
  const [itembox, setItembox] = useState(typeItemState_cloth);

  //     var imgArray = [
  //     process.env.PUBLIC_URL + "/png/hani_pants.png",
  //     process.env.PUBLIC_URL + "/png/hani_top.png",
  //     process.env.PUBLIC_URL + "/png/herin_skirt.png",
  //     process.env.PUBLIC_URL + "/png/herin_top.png",
  //     process.env.PUBLIC_URL + "/png/hyein_pants.png",
  //     process.env.PUBLIC_URL + "/png/hyein_top.png",
  //     process.env.PUBLIC_URL + "/png/minji_pants.png",
  //     process.env.PUBLIC_URL + "/png/minji_top.png"
  // ];

  const [selectDeco, setSelectDeco] = useState(false);
  const handleClick = (idx, _type) => {
    const newArr = Array(assetArray.length).fill(false);
    newArr[idx] = true;

    setSelectDeco(newArr);
  };

  const [content, setContent] = useState(type);
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
                    type={typeItemState_face}
                    imgSrc={item.assetImg}
                    index={item.assetID}
                    handleClick={handleClick}
                    selectDeco={selectDeco}
                    gltfPath={item.assetGltf}
                  />
                );
              })}
            {/* { //아이템 썸네일 박스
                    dataArrays[typeItemState_face].map((imgSrc, index)=>{
                        return (<Itembox 
                                    type = {typeItemState_face}
                                    imgSrc = {imgSrc}
                                    index = {index}
                                    handleClick = {handleClick}
                                    selectDeco = {selectDeco}
                                />)
                    })}  */}
          </div>
        </div>,
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
        </div>,
      );
    }
  };

  useEffect(() => {
    const getAvataInfo = async () => {
      try {
        if (type === "face") {
          const response = await axios.get(
            `https://us-central1-netural-app.cloudfunctions.net/api/assets/face/${typeItemState_face}`,
          );
          setAssetArray(response.data);

          // const eyeArrayData = response.data;
        } else {
          //type === "cloth"
          const response = await axios.get(
            `https://us-central1-netural-app.cloudfunctions.net/api/assets/body/${typeItemState_cloth}`,
          );
          //response -> top, bottom, shoes, accessory에 관한 내용들
          setAssetArray(response.data);
        }
        // const eyeArrayData = response.data.map(item => item.assetImg);
        // setEyeArray(eyeArrayData);
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
  // useEffect(() => {
  //     const getAvataInfo = async () => {
  //         await axios
  //         .get(`https://us-central1-netural-app.cloudfunctions.net/api/assets/face/eyes`)
  //         .then(response => {
  //             await setEyeArray(response.data.map(item => item.assetImg));
  //             console.log(eyeArray);

  //         })
  //         .catch(e => {
  //             console.error(e);
  //         })
  //     }
  //     getAvataInfo();
  //     setTimeout(() => {
  //         handleChangeContent();
  //     }, 1); // 일정 시간 후에 실행

  // },[type, typeItemState_face, typeItemState_cloth, selectDeco]);

  // useEffect(()=>{

  //     handleItemContent();
  // },[ typeItemState_face, typeItemState_cloth]);
  return <div>{content}</div>;
};
export default Item;
