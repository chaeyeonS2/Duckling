import React, { useState, useRef } from "react";
import "../css/alert/alertLayout.css";
import "../css/alert/postShare.css";

const PostShare = () => {
    return(
        <div className="background">
            <div className="layout">
            <div className="imageBox">
                <img style={{width:"33px", height:"33px"}} src={process.env.PUBLIC_URL + "/img/home.png"}/>
            </div>
            <div className="textBox">
                
                <p className="text1">주소가 복사되었습니다. :-D</p>
                <p className="text3">원하는 곳에 붙여넣기 해주세요!</p>
            </div>
            <div className="btnBox">
                <button className="btn_ok">확인</button>
            </div>
        </div>
        </div>
        
    )
}

export default PostShare