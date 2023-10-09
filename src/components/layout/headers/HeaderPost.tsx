import { useNavigate } from "react-router-dom";
import * as styles from "./header.css";

export interface HeaderPostProps {
  uploadClick: () => void;
}
export default function HeaderPost({ uploadClick }: HeaderPostProps) {
  const navigate = useNavigate();

  const checkClick = () => {
    uploadClick();
  };

  const closeClick = () => {
    //props.closeModal();
    navigate(-1);
  };
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.leftBtnGroup}>
          <button className={styles.headerBtn} onClick={closeClick}>
            <img src="/img/close.png" alt="my image" />
          </button>
        </div>
        <div className={styles.rightBtnGroup}>
          <button className={styles.headerBtn} onClick={checkClick}>
            <img src="/img/writing/check.png" />
          </button>
        </div>
      </div>
    </header>
  );
}
