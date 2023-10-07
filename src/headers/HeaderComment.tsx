import styles from "../css/header/headerComment.module.css";
import { useNavigate } from "react-router-dom";

const HeaderComment = () => {
  const navigate = useNavigate();

  const backClick = () => {
    navigate(-1); //뒤로가기
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftBtnGroup}>
        <div className={styles.candy}>
          {/* <div><img src={"/img/writing/cookie.png"}/></div> */}
          <div className={styles.num}></div>
        </div>
        <div className={styles.comment}>
          {/* <div><img src={"/img/writing/comment.png"}/></div> */}
          <div className={styles.num}></div>
        </div>
      </div>
      <div className={styles.rightBtnGroup}>
        <button className={styles.btn_close} onClick={backClick}>
          <img src={"/img/writing/comment_close.png"} alt="my image" />
        </button>
      </div>
    </header>
  );
};

export default HeaderComment;
