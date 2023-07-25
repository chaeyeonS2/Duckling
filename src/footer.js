import "./css/footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div id="footerBtnGroup">
                <button id="btn_home"><img src={process.env.PUBLIC_URL + "/img/home.png"}/></button>
                <button id="btn_avatar"><img src={process.env.PUBLIC_URL + "/img/person.png"}/></button>
                <button id="btn_camera"><img src={process.env.PUBLIC_URL + "/img/camera.png"}/></button>
            </div>
        </footer>
    )
}

export default Footer