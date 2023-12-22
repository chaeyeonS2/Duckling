import { overlays } from "@/utils/overlays";
import * as styles from "./headerPostView.css";
import { useNavigate } from "react-router-dom";
import AlertModal from "@/components/modal/AlertModal";
import ConfirmModal from "@/components/modal/ConfirmModal";
import Icon from "@/components/Icon";
import axios from "axios";

export default function HeaderPostView() {
  const navigate = useNavigate();

  const deleteClick = () => {
    overlays.open(({ overlayId }) => (
      <ConfirmModal
        title={
          <>
            해당 글은 영구적으로 삭제 됩니다.
            <br />
            정말 삭제 하실건가요? (˙ᴖ˙ก̀)
          </>
        }
        onYes={() => {
          axios.delete(`/api/posts/${localStorage.getItem("id")}`).then(() => {
            overlays.open(({ overlayId }) => (
              <AlertModal
                title="게시글이 삭제되었습니다."
                onClose={() => {
                  overlays.close(overlayId);
                  navigate("/share");
                }}
              />
            ));
          });
        }}
        onNo={() => overlays.close(overlayId)}
        yesText="네,삭제할게요"
      />
    ));
  };

  const shareClick = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        overlays.open(({ overlayId }) => (
          <AlertModal
            onClose={() => overlays.close(overlayId)}
            logoImgSrc={<Icon id="link" size="medium" />}
            title={
              <>
                주소가 복사되었습니다. :-D
                <br />
                원하는 곳에 붙여넣기 해주세요!
              </>
            }
          />
        ));
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
