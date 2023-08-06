import React, { useState, useRef } from "react";
import "../css/alert/alertLayout.css";
import "../css/alert/uploading.css";

const Uploading = () => {
    const barCount = 10;
    return(
        <div className="layout upload">
            <div className="loadingBar">
                
            </div>
            <div className="textBox_upload">
                게시글이 올라가고 있어요-!
            </div>
        </div>
    )
}

export default Uploading