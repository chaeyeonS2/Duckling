import "../../css/item.css";
import React, { useState, useEffect } from "react";
import Itembox from '../avatar/itembox';

const Item = props => {
    const type = props.type;
    
    const [typeItemState_face, setItemTypeState_face] = useState("eye");  //face 카테고리
    const [typeItemState_cloth, setItemTypeState_cloth] = useState("상의");  //cloth 카테고리
    var itemArray = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]; //item 임의 개수

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
                <div> 
                    { //아이템 썸네일 박스
                    itemArray.map(function(){
                        return (<Itembox 
                                    type = {typeItemState_face}
                                />)
                    })};  
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
                    <div className={typeItemState_cloth === "한벌의상" ? "selectBtn" : "nonSelectbtn"} onClick={() => {setItemTypeState_cloth("한벌의상")}}>한벌 의상</div>
                </div>
                <div> 
                    { //아이템 썸네일 박스
                    itemArray.map(function(){
                        return (<Itembox 
                                    type = {typeItemState_cloth}
                                />)
                    })};  
                </div>
            </div>
          );
        }
    };

    // useEffect를 사용하여 컴포넌트가 로드되자마자 myFunction을 실행합니다.
    useEffect(() => {
        handleChangeContent();
    });

    return (
        <div>{content}</div>
    )
}
export default Item