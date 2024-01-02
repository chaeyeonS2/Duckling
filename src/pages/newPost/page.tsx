import Footer from "@/components/layout/Footer";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import * as styles from "./page.css";
import AlertModal from "@/components/modal/AlertModal";
import { overlays } from "@/utils/overlays";
import { DynamicIcon } from "@/components/Icon";
import BaseModal from "@/components/modal/BaseModal";

export default function NewPostPage() {
  const navigate = useNavigate();

  const handleUpload = async () => {
    console.log(previewImages);

    const userID = localStorage.getItem("id");
    const userName = localStorage.getItem("userName");
    if (!userName) throw new Error("userName does not exist!");
    if (!userID) throw new Error("userID does not exist!");

    const overlayId = overlays.open(() => (
      <BaseModal logoImgSrc={<img src="/img/upload_loading.gif" alt="" />} title="게시글이 올라가고 있어요~!" />
    ));
    try {
      const { data } = await axios.post("/api/posts", {
        title: title,
        body: content,
        postImg: previewImages,
        writerName: userName,
        writerID: userID,
      });

      console.log("Document uploaded:", data.postID, data.writerID);

      overlays.open(({ overlayId }) => (
        <AlertModal
          onClose={() => {
            overlays.close(overlayId);
            navigate(`/postView/${data.postID}`);
          }}
          logoImgSrc={<DynamicIcon id="check" size="medium" />}
          title="게시글이 업로드 되었습니다"
        />
      ));
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      overlays.close(overlayId);
    }
  };

  // 상태(State) 정의: 제목과 내용을 각각의 상태로 관리합니다.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 글의 줄 수에 따라 input 필드 높이 조절
  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (!textarea.current) return;

    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const [previewImages, setPreviewImages] = useState<string[]>([]); //이미지 주소들 저장하는 배열

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    for (const file of event.target.files ?? []) {
      const imageDataURL = await readFileAsDataURL(file);
      setPreviewImages((prevImages) => [...prevImages, imageDataURL]);
    }
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

  const uploadClick = () => {
    if (previewImages.length !== 0) {
      handleUpload();
      return;
    }

    overlays.open(({ overlayId }) => (
      <AlertModal
        onClose={() => overlays.close(overlayId)}
        logoImgSrc={<DynamicIcon id="image" size="medium" />}
        title="사진을 첨부해야 업로드 할 수 있어요"
        description="덕질 일상을 다채롭게 기록해보아요"
      />
    ));
  };

  //지금은 그냥 뒤로가기, 나중에 '정말 취소하시겠어요?' 모달 추가 시 사용 예정
  //   const closeClick = () => {
  //     openModal(<Delete />)
  //   };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.headerButton}>
          <DynamicIcon className={styles.previewImg} id="cancel" size="medium" />
        </button>
        <button onClick={uploadClick} className={styles.headerButton}>
          <DynamicIcon className={styles.previewImg} id="check" size="medium" />
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
                  <DynamicIcon className={styles.previewImg} id="cancel" size="medium" />
                </div>
                <img className={styles.previewImg} src={image} alt={`미리보기 ${index}`} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.toolBar}>
          <div onClick={handleCameraBtnClick}>
            <DynamicIcon id="camera" size="medium" />
          </div>
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
