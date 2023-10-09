import Footer from "@/components/layout/Footer";
import HeaderPost from "@/components/layout/headers/HeaderPost";
import { useState, useRef } from "react";
import Modal from "@/components/alert/Modal";
import Uploading from "@/components/alert/Uploading";
import IsImage from "@/components/alert/IsImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import * as styles from "./post.css";

const userID = localStorage.getItem("id");
const userName = localStorage.getItem("userName");

export default function Post() {
  const navigate = useNavigate();

  const handleUpload = async () => {
    console.log(previewImages);

    // TODO: userID과 userName이 null일 때 어떻게 해야 하는가
    if (!userName) throw new Error("userName does not exist!");
    if (!userID) throw new Error("userID does not exist!");

    try {
      openModal(<Uploading />);
      const res = await axios.post("/api/posts", {
        title: title,
        body: content,
        postImg: previewImages,
        writerID: userName,
        userID: userID,
      });
      const data = res.data;

      console.log("Document uploaded:", data.postID, data.writerID);
      navigate(`/postView/${data.writerID}/${data.postID}`);
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      closeModal();
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

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>();

  const openModal = (content: JSX.Element) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalContent(undefined);
    setModalIsOpen(false);
  };

  const uploadClick = () => {
    //올라간 이미지가 없으면 업로드 불가 모달 띄우고 있으면 업로드 시작
    if (previewImages.length === 0) {
      openModal(<IsImage onClose={closeModal} />);
    } else {
      handleUpload();
    }
  };

  //지금은 그냥 뒤로가기, 나중에 '정말 취소하시겠어요?' 모달 추가 시 사용 예정
  //   const closeClick = () => {
  //     openModal(<Delete />)
  //   };

  return (
    <div className="layout">
      {/* 고정 헤더 */}
      <HeaderPost
        uploadClick={uploadClick}
        // closeClick = {closeClick}
      />
      {/* 모달 */}
      <Modal isOpen={modalIsOpen}>{modalContent}</Modal>
      <div className="content">
        {/* margin을 위한 div */}
        <div className={styles.marignBox}>
          <form>
            <div className={styles.title}>
              <input
                className={styles.titleInput}
                type="text"
                name="title"
                value={title}
                placeholder="제목을 입력하세요"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <article className={styles.writing}>
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
                      <img className={styles.previewImg} src="/img/writing/close.png"></img>
                    </div>
                    <img className={styles.previewImg} src={image} alt={`미리보기 ${index}`} />
                  </div>
                ))}
              </div>
            </article>
          </form>
        </div>
      </div>
      <div className={styles.toolBar}>
        <div className={styles.camera} onClick={handleCameraBtnClick}>
          <img className={styles.cameraIcon} src="/img/writing/camera.png" />
        </div>
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          multiple
          onChange={handleImageUpload}
        />
      </div>
      {/* 고정 푸터 */}
      <Footer btn={1} />
    </div>
  );
}
