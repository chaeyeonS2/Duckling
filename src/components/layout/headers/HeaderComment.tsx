import { DynamicIcon } from "@/components/Icon";
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
          <DynamicIcon id="candy" size="small" />
          <div className={styles.num}></div>
        </div>
        <div className={styles.leftBtnDiv}>
          <DynamicIcon id="comment" size="small" />
          <div className={styles.num}></div>
        </div>
      </div>
      <div className={styles.rightBtnGroup}>
        <button className={styles.btnClose} onClick={backClick}>
          <DynamicIcon id="cancel" size="small" />
        </button>
      </div>
    </header>
  );
}
