import { useState } from 'react';
import '../css/header.css';
import { Link } from "react-router-dom";


const HeaderPost = () => {

    return (
        <header className="header">
            <div id="headerBtnGroup">
                <div className='leftBtnGroup'>
                    <button className="btn_close"><img src={process.env.PUBLIC_URL + "/img/writing/close.png"}/></button>
                </div>
                <div className='rightBtnGroup'>
                    <button className="btn_check">
                        <img src={process.env.PUBLIC_URL + "/img/writing/check.png"} /></button>                    
                </div>
                
            </div>
        </header>
    )
}

export default HeaderPost