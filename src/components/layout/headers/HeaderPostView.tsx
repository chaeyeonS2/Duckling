import Delete from "@/components/alert/Delete";
import PostShare from "@/components/alert/PostShare";
import { overlays } from "@/overlays";
import * as styles from "./headerPostView.css";
import { useNavigate } from "react-router-dom";

export default function HeaderPostView() {
  const navigate = useNavigate();

  const deleteClick = () => {
    overlays.open(({ overlayId }) => <Delete onClose={() => overlays.close(overlayId)} />);
  };

  const shareClick = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        overlays.open(({ overlayId }) => <PostShare onClose={() => overlays.close(overlayId)} />);
      })
      .catch((err) => {
        console.error("URL 복사 실패:", err);
      });
  };

  const closeClick = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <div>
        <button className={styles.headerButton} onClick={closeClick}>
          <img src="/img/writing/close.png" alt="my image" />
        </button>
      </div>
      <div>
        <button className={styles.headerButton} onClick={shareClick}>
          <img src="/img/share.png" />
        </button>
        <button className={styles.headerButton}>
          <img src="/img/writing/new-post.png" />
        </button>
        <button className={styles.headerButton} onClick={deleteClick}>
          <img src="/img/writing/trash-can.png" />
        </button>
      </div>
    </header>
  );
}
