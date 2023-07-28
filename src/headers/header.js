import '../css/header.css';
import { Link } from "react-router-dom";

// const shareToTwitter = () => {
//     const sharedLink =
//       "text=" + encodeURIComponent(title + " \n ") + encodeURIComponent(url);
//     openWidnow(`https://twitter.com/intent/tweet?${sharedLink}`);
//   };

const Header = () => {
    //const history = useHistory();    
    const goAvatarDeco = () => {
        <Link to = "/avatarDeco"> avatarDeco </Link>
    }
    
    return (
        <header className="header">
            <div id="headerBtnGroup">
                <div className='leftBtnGroup'>
                    <button id="btn_close"><img src={process.env.PUBLIC_URL + "/img/close.png"} img alt="my image"/></button>
                    
                </div>
                <div className='rightBtnGroup'>
                    <button id="btn_share"><img src={process.env.PUBLIC_URL + "/img/share.png"} /></button>
                    <button id="btn_goAvatar" onClick={goAvatarDeco}><img src={process.env.PUBLIC_URL + "/img/cart.png"}/></button>
                    
                </div>
                
            </div>
        </header>
    )
}

export default Header