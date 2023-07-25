import './css/headerDeco.css';
import { Link } from "react-router-dom";


const HeaderDeco = () => {
    //const history = useHistory();    
    const goAvatarDeco = () => {
        <Link to = "/avatarDeco"> avatarDeco </Link>
    }
    

    return (
        <header className="header">
                <div className='rightBtnGroup'>
                <button id="btn_close"><img src={process.env.PUBLIC_URL + "/img/close.png"} img alt="my image"/></button>
            </div>
        </header>
    )
}

export default HeaderDeco