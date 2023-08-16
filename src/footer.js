import React, { useState } from 'react';
import "./css/footer.css";
import { useNavigate } from "react-router-dom";


const Footer = props => {
    const navigate = useNavigate();
    const homeClick = () => {
        navigate("/home");
    }
    const lookClick = () => {
        navigate("/look");
    }

    //어떤 버튼이 활성화인지
    const active = props.btn;
    var homeImg = process.env.PUBLIC_URL + "/img/home.png";
    var avatarImg = process.env.PUBLIC_URL + "/img/person.png";
    var cameraImg = process.env.PUBLIC_URL + "/img/camera.png";
    
    const btnActive = () => {
        if(active === 0){
            homeImg = process.env.PUBLIC_URL + "/img/home_click.png";  //LookingActive
        }
        else if(active === 1){   //avatarActive
            avatarImg = process.env.PUBLIC_URL + "/img/person_click.png";
        }
        else{   //camera active
            cameraImg = process.env.PUBLIC_URL + "/img/camera_click.png";
        }
    }
    btnActive();

    return (
        <footer className="footer">
            <div id="footerBtnGroup">
                <button id="btn_home" onClick={lookClick}><img src={homeImg}/></button>
                <button id="btn_avatar" onClick={homeClick}><img src={avatarImg}/></button>
                <button id="btn_camera"><img src={cameraImg}/></button>
            </div>
        </footer>
    )
}

export default Footer