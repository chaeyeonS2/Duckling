import * as styles from "./headerComment.css";
import { useNavigate } from "react-router-dom";

export default function HeaderComment() {
  const navigate = useNavigate();

  const backClick = () => {
    navigate(-1); //뒤로가기
  };

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.leftBtnDiv}>
          {/* <div><img src={"/img/writing/cookie.png"}/></div> */}
          <div className={styles.num}></div>
        </div>
        <div className={styles.leftBtnDiv}>
          {/* <div><img src={"/img/writing/comment.png"}/></div> */}
          <div className={styles.num}></div>
        </div>
      </div>
      <div className={styles.rightBtnGroup}>
        <button className={styles.btnClose} onClick={backClick}>
          <img src={"/img/writing/comment_close.png"} alt="my image" />
        </button>
      </div>
    </header>
  );
}
