import { useNavigate } from "react-router-dom";
import * as styles from "./header.css";

// const shareToTwitter = () => {
//     const sharedLink =
//       "text=" + encodeURIComponent(title + " \n ") + encodeURIComponent(url);
//     openWidnow(`https://twitter.com/intent/tweet?${sharedLink}`);
//   };

export default function Header() {
  const navigate = useNavigate();

  const decoClick = () => {
    navigate("/deco");
  };

  return (
    <header className={styles.header}>
      <div>
        {/* <div className={styles.leftBtnGroup}>
                    <button className={styles.btn_close}><img src={"/img/close.png"} img alt="my image"/></button>
                    
                </div> */}
        <div className={styles.rightBtnGroup}>
          <button className={styles.headerBtn}>
            <img src={"/img/share.png"} />
          </button>
          <button className={styles.headerBtn} onClick={decoClick}>
            <img src={"/img/home/deco.png"} />
          </button>
          <button className={styles.headerBtn}>
            <img src={"/img/home/settings.png"} />
          </button>
        </div>
      </div>
    </header>
  );
}
