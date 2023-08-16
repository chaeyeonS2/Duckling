import "../../css/item.css";
import React, { useState, useEffect } from "react";
import Itembox from '../avatar/itembox';

const Item = props => {

    const type = props.type;
    var [isClick, setClick] = useState(false);

    var getData = (getClick) =>{
        //isClick = getGltfPath;
        setClick(getClick);
      }

    var getDataOn = (isClick) =>{
        //isClick = getGltfPath;
        props.getData(isClick);
      }




    const [typeItemState_face, setItemTypeState_face] = useState("eye");  //face 카테고리
    const [typeItemState_cloth, setItemTypeState_cloth] = useState("상의");  //cloth 카테고리
    var itemArray = [0, 1, 2, 3, 5, 6, 7]; //item 임의 개수
    const [itembox, setItembox] = useState(typeItemState_cloth);

    
    var imgArray = [ 
    process.env.PUBLIC_URL + "/png/hani_pants.png",
    process.env.PUBLIC_URL + "/png/hani_top.png", 
    process.env.PUBLIC_URL + "/png/herin_skirt.png", 
    process.env.PUBLIC_URL + "/png/herin_top.png", 
    process.env.PUBLIC_URL + "/png/hyein_pants.png", 
    process.env.PUBLIC_URL + "/png/hyein_top.png", 
    process.env.PUBLIC_URL + "/png/minji_pants.png", 
    process.env.PUBLIC_URL + "/png/minji_top.png"
];



    
    const [content, setContent] = useState(type);
    const handleChangeContent = () => {
        

        // 상태 변수를 변경하여 내용을 바꿉니다.
        if (type === 'face') {
          setContent(
            <div className="faceDeco Deco">
                <div className="faceBtnGroup typeItemBtnGroup">
                    <div className={typeItemState_face === "eye" ? "selectBtn" : "nonSelectbtn"} onClick={() => {setItemTypeState_face("eye")}}>눈</div>
                    <div className={typeItemState_face === "mouth" ? "selectBtn" : "nonSelectbtn"} onClick={() => {setItemTypeState_face("mouth")}}>입</div>
                </div>
                <div className="itemBoxDiv"> 
                {/* {itembox} */}
                
                    { //아이템 썸네일 박스
                    itemArray.map((n)=>{
                        return (<Itembox 
                                    type = {typeItemState_face}
                                    imgSrc = {imgArray[n]}
                                    index = {n}
                                />)
                    })} 
                </div>
            </div>
        );
        } 
        else {        //if 'cloth'
          setContent(
            <div className="clothDeco Deco">
                <div className="clothBtnGroup typeItemBtnGroup">
                    <div className={typeItemState_cloth === "상의" ? "selectBtn" : "nonSelectbtn"} onClick={() => {setItemTypeState_cloth("상의")}}>상의</div>
                    <div className={typeItemState_cloth === "하의" ? "selectBtn" : "nonSelectbtn"} onClick={() => {setItemTypeState_cloth("하의")}}>하의</div>
                    <div className={typeItemState_cloth === "신발" ? "selectBtn" : "nonSelectbtn"} onClick={() => {setItemTypeState_cloth("신발")}}>신발</div>
                    <div className={typeItemState_cloth === "기타" ? "selectBtn" : "nonSelectbtn"} onClick={() => {setItemTypeState_cloth("기타")}}>기타</div>
                </div>
                <div className="itemBoxDiv"> 
                { //아이템 썸네일 박스
                    itemArray.map((n)=>{
                        return (<Itembox 
                                    type = {typeItemState_cloth}
                                    imgSrc = {imgArray[n]}
                                    index = {n}
                                />)
                    })}
                </div>
            </div>
          );
        }
    };

    // useEffect를 사용하여 컴포넌트가 로드되자마자 myFunction을 실행합니다.
    useEffect(() => {
        
        handleChangeContent();
        
        
        
        
    },[type, typeItemState_face, typeItemState_cloth]);

    // useEffect(()=>{

    //     handleItemContent();
    // },[ typeItemState_face, typeItemState_cloth]);
    return (
        <div>{content}</div>
    )
}
export default Item