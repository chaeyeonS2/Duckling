import styles from "../css/header/header.module.css";
import { Link } from "react-router-dom";


const HeaderDeco = () => {
    //const history = useHistory();    
    // const goAvatarDeco = () => {
    //     <Link to = "/avatarDeco"> avatarDeco </Link>
    // }
    

    return (
        <header className={styles.header}>
                <div className={styles.rightBtnGroup}>
                <button id={styles.btn_close}><img src={process.env.PUBLIC_URL + "/img/close.png"}/></button>
            </div>
        </header>
    )
}

export default HeaderDeco