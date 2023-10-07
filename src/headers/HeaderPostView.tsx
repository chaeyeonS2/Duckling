import styles from "../css/header/headerPostView.module.css";
import { useNavigate } from "react-router-dom";

export interface HeaderPostViewProps {
  deleteClick: () => void;
  shareClick: () => void;
}
const HeaderPostView = ({ deleteClick, shareClick }: HeaderPostViewProps) => {
  const handleCopy = () => {
    const currentURL = window.location.href;

    // 클립보드에 URL 복사 시도
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        shareClick();
      })
      .catch((err) => {
        console.error("URL 복사 실패:", err);
      });
  };
  const navigate = useNavigate();

  const closeClick = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerBtnGroup}>
        <div className={styles.leftBtnGroup}>
          <button className={styles.btn_close} onClick={closeClick}>
            <img src={"/img/writing/close.png"} alt="my image" />
          </button>
        </div>
        <div className={styles.rightBtnGroup}>
          <button className={styles.btn_share} onClick={handleCopy}>
            <img src={"/img/share.png"} />
          </button>
          <button className={styles.btn_goAvatar}>
            <img src={"/img/writing/new-post.png"} />
          </button>
          <button className={styles.btn_goAvatar} onClick={deleteClick}>
            <img src={"/img/writing/trash-can.png"} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderPostView;
