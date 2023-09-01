import styles from "../css/header/header.module.css";
import { useNavigate } from "react-router-dom";

const HeaderDeco = () => {
  const navigate = useNavigate();

  const closeClick = () => {
    window.location.href = "/home"; // "/home"으로 새로고침
  };

  return (
    <header className={styles.header} style={{ backgroundColor: "#f8b4d4" }}>
      <div className={styles.rightBtnGroup}>
        <button className={styles.btn_close} onClick={closeClick}>
          <img src={process.env.PUBLIC_URL + "/img/close.png"} />
        </button>
      </div>
    </header>
  );
};

export default HeaderDeco;
