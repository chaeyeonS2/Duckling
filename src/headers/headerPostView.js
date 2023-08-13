import styles from "../css/header/headerPostView.module.css";
import { Link } from "react-router-dom";

const HeaderPostView = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerBtnGroup}>
                <div className={styles.leftBtnGroup}>
                    <button className={styles.btn_close}><img src={process.env.PUBLIC_URL + "/img/writing/close.png"} img alt="my image"/></button>
                    
                </div>
                <div className={styles.rightBtnGroup}>
                    <button className={styles.btn_share}><img src={process.env.PUBLIC_URL + "/img/share.png"} /></button>
                    <button className={styles.btn_goAvatar}><img src={process.env.PUBLIC_URL + "/img/writing/new-post.png"}/></button>
                    <button className={styles.btn_goAvatar}><img src={process.env.PUBLIC_URL + "/img/writing/trash-can.png"}/></button>
                    
                </div>
                
            </div>
        </header>
    )
}

export default HeaderPostView