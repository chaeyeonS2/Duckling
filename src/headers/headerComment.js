import styles from "../css/header/headerComment.module.css";
import { useNavigate } from "react-router-dom";

const HeaderComment = () => {
    const navigate = useNavigate();

    const backClick = () => {
        navigate(-1);   //뒤로가기
    }
    
    return (
        <header className={styles.header}>
            <div className={styles.leftBtnGroup}>
                <div className={styles.candy}>
                    <div><img src={process.env.PUBLIC_URL + "/img/writing/cookie.png"}/></div>
                    <div className={styles.num}>215</div>
                </div>
                <div className={styles.comment}>
                    <div><img src={process.env.PUBLIC_URL + "/img/writing/comment.png"}/></div>
                    <div className={styles.num}>423</div>
                </div>
            </div>
            <div className={styles.rightBtnGroup}>
                <button className={styles.btn_close} onClick={backClick}><img src={process.env.PUBLIC_URL + "/img/writing/comment_close.png"} img alt="my image"/></button>
            </div>
        </header>
    )
}

export default HeaderComment