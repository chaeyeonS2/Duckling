import "../../css/avatarDeco.css";
import React, { useState, Suspense, useRef, useEffect } from "react";
  
const Item = () => {
    const [typeItemState, setItemTypeState] = useState("eye");  //아이템 카테고리
    var itemArray = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]; //item 임의 개수

    return (
        <div className="faceDeco">
                    <div className="faceBtnGroup">
                        <div className={typeItemState === "eye" ? "selectBtn" : "face_btn"} onClick={() => {setItemTypeState("eye")}}>눈</div>
                        <div className={typeItemState === "mouth" ? "selectBtn" : "face_btn"} onClick={() => {setItemTypeState("mouth")}}>입</div>
                    </div>
                    <div>
                        {
                        itemArray.map(function(){
                            return (<div className="item_box">
                                <img className="item_img" src={process.env.PUBLIC_URL + "/img/jean.png"} img alt="my image"/>
                            </div>)
                        })};  
                    </div>
                    
                </div>
    )
}

export default Item