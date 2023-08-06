import React, { useState, useRef } from "react";
import "../css/alert/alertLayout.css";
import "../css/alert/isImage.css";

const IsImage = () => {
    return(
        <div className="background">
            <div className="alertlayout">
            <div className="imageBox">
                <img style={{width:"33px", height:"33px"}} src={process.env.PUBLIC_URL + "/img/home.png"}/>
            </div>
            <div className="textBox">
                
                <p className="text1 textcontent">사진을 첨부해야 업로드 할 수 있어요</p>
                <p className="text2 textcontent">덕질 일상을 다채롭게 기록해보아요</p>
            </div>
            <div className="btnBox">
                <button className="btn_ok">확인</button>
            </div>
        </div>
        </div>
        
    )
}

export default IsImage