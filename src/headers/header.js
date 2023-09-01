import styles from "../css/header/header.module.css";
import { useNavigate } from "react-router-dom";

// const shareToTwitter = () => {
//     const sharedLink =
//       "text=" + encodeURIComponent(title + " \n ") + encodeURIComponent(url);
//     openWidnow(`https://twitter.com/intent/tweet?${sharedLink}`);
//   };

const Header = () => {
  const navigate = useNavigate();

  const decoClick = () => {
    navigate("/deco");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerBtnGroup}>
        {/* <div className={styles.leftBtnGroup}>
                    <button className={styles.btn_close}><img src={process.env.PUBLIC_URL + "/img/close.png"} img alt="my image"/></button>
                    
                </div> */}
        <div className={styles.rightBtnGroup}>
          <button className={styles.btn_share}>
            <img src={process.env.PUBLIC_URL + "/img/share.png"} />
          </button>
          <button className={styles.btn_goAvatar} onClick={decoClick}>
            <img src={process.env.PUBLIC_URL + "/img/home/deco.png"} />
          </button>
          <button className={styles.btn_goAvatar}>
            <img src={process.env.PUBLIC_URL + "/img/home/settings.png"} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
