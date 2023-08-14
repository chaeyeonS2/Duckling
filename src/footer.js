import React from 'react';
import "./css/footer.css";
import { useNavigate } from "react-router-dom";


const Footer = () => {
    const navigate = useNavigate();

    const homeClick = () => {
        navigate("/");
    }

    
    const lookClick = () => {
      navigate("/look");
  }

    return (
        <footer className="footer">
            <div id="footerBtnGroup">
                <button id="btn_home" onClick={homeClick}><img src={process.env.PUBLIC_URL + "/img/home.png"}/></button>
                <button id="btn_avatar" onClick={lookClick}><img src={process.env.PUBLIC_URL + "/img/person.png"}/></button>
                <button id="btn_camera"><img src={process.env.PUBLIC_URL + "/img/camera.png"}/></button>
            </div>
        </footer>
    )
}

export default Footer