import Footer from "@/components/layout/Footer";
import { useState, useRef, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import * as styles from "./page.css";
import AlertModal from "@/components/modal/AlertModal";
import { overlays } from "@/utils/overlays";
import { DynamicIcon } from "@/components/Icon";
import BaseModal from "@/components/modal/BaseModal";
import showAsyncModal from "@/utils/showAsyncModal";

export default function NewPostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (!textarea.current) return;

    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach(async (file: File) => {
      try {
        const imageDataURL = await readFileAsDataURL(file);
        setPreviewImages((prevImages) => [...prevImages, imageDataURL]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });
  };

  const readFileAsDataURL = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(String(event.target?.result));
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleCameraBtnClick = () => {
    inputFileRef.current?.click();
  };

  const uploadClick = async () => {
    const reason: JSX.Element[] = [];
    if (!previewImages.length) reason.push(<li>사진을 첨부해야 업로드 할 수 있어요.</li>);
    if (!title) reason.push(<li>제목을 작성해야 업로드할 수 있어요.</li>);
    if (!content) reason.push(<li>본문을 작성해야 업로드할 수 있어요.</li>);
    if (reason.length != 0) {
      overlays.open(({ overlayId }) => (
        <AlertModal
          overlayId={overlayId}
          logoImgSrc={<DynamicIcon id="warning" size="medium" />}
          title="게시물 내용이 부족해요!"
          description={
            <>
              <ul>
                {reason.map((reason, i) => (
                  <Fragment key={i}>{reason}</Fragment>
                ))}
              </ul>
              <p style={{ fontWeight: 500, marginTop: "8px" }}>덕질 일상을 다채롭게 기록해보아요!</p>
            </>
          }
        />
      ));
      return;
    }

    const userID = localStorage.getItem("id");
    const userName = localStorage.getItem("userName");
    if (!userName) throw new Error("userName does not exist!");
    if (!userID) throw new Error("userID does not exist!");

    const { result } = await showAsyncModal(
      axios.post("/api/posts", {
        title: title,
        body: content,
        postImg: previewImages,
        writerName: userName,
        writerID: userID,
      }),
      {
        progress: ({ overlayId }) => (
          <BaseModal
            overlayId={overlayId}
            logoImgSrc={<img src="/img/upload-loading.gif" alt="" />}
            title="게시글이 올라가고 있어요~!"
          />
        ),
        success: ({ overlayId }) => (
          <AlertModal
            overlayId={overlayId}
            onClose={() => {
              navigate(`/postView/${result!.data.postID}`, { replace: true });
            }}
            logoImgSrc={<DynamicIcon id="check" size="medium" />}
            title="게시글이 업로드 되었습니다"
          />
        ),
      }
    );
  };

  //지금은 그냥 뒤로가기, 나중에 '정말 취소하시겠어요?' 모달 추가 시 사용 예정
  //   const closeClick = () => {
  //     openModal(<Delete />)
  //   };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.headerButton}>
          <DynamicIcon id="cancel" size="medium" />
        </button>
        <button onClick={uploadClick} className={styles.headerButton}>
          <DynamicIcon id="check" size="medium" />
        </button>
      </header>
      <form className={styles.formContainer}>
        <input
          className={styles.titleInput}
          type="text"
          name="title"
          value={title}
          placeholder="제목을 입력하세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <hr />
          <textarea
            className={styles.writingInput}
            rows={1}
            ref={textarea}
            name="content"
            value={content}
            placeholder="자유롭게 덕질 일상을 기록해요 ( ⸝•ᴗ•⸝)"
            onInput={handleResizeHeight}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className={styles.imgUploadBox}>
            {previewImages.map((image, index) => (
              <div className={styles.imgUploadPreview} key={index}>
                <div className={styles.closeIconContainer} onClick={() => handleRemoveImage(index)}>
                  <DynamicIcon id="cancel" size="medium" />
                </div>
                <img className={styles.previewImg} src={image} alt={`미리보기 ${index}`} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.toolBar} onClick={handleCameraBtnClick}>
          <DynamicIcon id="camera" size="medium" />
        </div>
      </form>
      <Footer />

      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        multiple
        onChange={handleImageUpload}
      />
    </div>
  );
}
