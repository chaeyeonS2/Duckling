import { overlays } from "@/utils/overlays";
import * as styles from "./headerPostView.css";
import { useNavigate } from "react-router-dom";
import AlertModal from "@/components/modal/AlertModal";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { DynamicIcon } from "@/components/Icon";
import axios from "axios";

export default function HeaderPostView({ postData }: { postData?: Post }) {
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
          overlays.close(overlayId);
          axios.delete(`/api/posts/${postData?.postID}`).then(() => {
            overlays.open(({ overlayId }) => (
              <AlertModal
                title="게시글이 삭제되었습니다."
                onClose={() => {
                  overlays.close(overlayId);
                  navigate("/look");
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
            logoImgSrc={<DynamicIcon id="link" size="medium" />}
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
    <header className={styles.header} aria-disabled={postData?.writerID != localStorage.getItem("id")}>
      <div>
        <button className={styles.headerButton} name="exit" onClick={closeClick}>
          <DynamicIcon id="cancel" size="medium" />
        </button>
      </div>
      <div>
        <button className={styles.headerButton} onClick={shareClick}>
          <DynamicIcon id="share" size="medium" />
        </button>
        <button className={styles.headerButton}>
          <DynamicIcon id="newpost" size="medium" />
        </button>
        <button className={styles.headerButton} onClick={deleteClick}>
          <DynamicIcon id="trash-can" size="medium" />
        </button>
      </div>
    </header>
  );
}
