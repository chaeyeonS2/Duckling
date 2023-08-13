import styles from "../css/header/header.module.css";
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
        <header className={styles.header}>
            <div className={styles.headerBtnGroup}>
                {/* <div className={styles.leftBtnGroup}>
                    <button className={styles.btn_close}><img src={process.env.PUBLIC_URL + "/img/close.png"} img alt="my image"/></button>
                    
                </div> */}
                <div className={styles.rightBtnGroup}>
                    <button className={styles.btn_share}><img src={process.env.PUBLIC_URL + "/img/share.png"} /></button>
                    <button className={styles.btn_goAvatar} onClick={goAvatarDeco}><img src={process.env.PUBLIC_URL + "/img/home/deco.png"}/></button>
                    <button className={styles.btn_goAvatar} onClick={goAvatarDeco}><img src={process.env.PUBLIC_URL + "/img/home/settings.png"}/></button>
                    
                </div>
                
            </div>
        </header>
    )
}

export default Header