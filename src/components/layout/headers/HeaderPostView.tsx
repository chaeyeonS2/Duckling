import { overlays } from "@/utils/overlays";
import * as styles from "./headerPostView.css";
import { Link, useNavigate } from "react-router-dom";
import AlertModal from "@/components/modal/AlertModal";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { DynamicIcon } from "@/components/Icon";
import axios from "axios";
import showAsyncModal from "@/utils/showAsyncModal";

export default function HeaderPostView({ postData }: { postData?: Post }) {
  const navigate = useNavigate();

  const deleteClick = async () => {
    const isConfirmed = await new Promise((res) =>
      overlays.open(({ overlayId }) => (
        <ConfirmModal
          overlayId={overlayId}
          title={
            <>
              해당 글은 영구적으로 삭제 됩니다.
              <br />
              정말 삭제 하실건가요? (˙ᴖ˙ก̀)
            </>
          }
          onYes={() => res(true)}
          onNo={() => res(false)}
        />
      ))
    );
    if (!isConfirmed) return;

    const isReConfirmed = await new Promise((res) =>
      overlays.open(({ overlayId }) => (
        <ConfirmModal
          overlayId={overlayId}
          title={
            <>
              해당 글은 영구적으로 삭제 됩니다.
              <br />
              정말 삭제 하실건가요? (˙ᴖ˙ก̀)
            </>
          }
          yesText="네,삭제할게요"
          onYes={() => res(true)}
          onNo={() => res(false)}
        />
      ))
    );
    if (!isReConfirmed) return;
    await showAsyncModal(axios.delete(`/api/posts/${postData?.postID}`), {
      progress: "게시글이 삭제중입니다...",
      success: (
        <AlertModal
          logoImgSrc={<DynamicIcon id="check" size="medium" />}
          title="게시글이 삭제되었습니다."
          onClose={() => {
            navigate("/look");
          }}
        />
      ),
      failure: "게시글이 삭제되지 못했습니다.",
    });
  };

  const shareClick = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        overlays.open(({ overlayId }) => (
          <AlertModal
            overlayId={overlayId}
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
    <header className={styles.header}>
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
          <Link to="/newpost">
            <DynamicIcon id="newpost" size="medium" />
          </Link>
        </button>
        {postData?.writerID == localStorage.getItem("id") && (
          <button className={styles.headerButton} onClick={deleteClick}>
            <DynamicIcon id="trash-can" size="medium" />
          </button>
        )}
      </div>
    </header>
  );
}
