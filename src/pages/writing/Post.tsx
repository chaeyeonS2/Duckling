import "../../css/post.css";
import "../../css/layout.css";
import Footer from "../../Footer";
import HeaderPost from "../../headers/HeaderPost";
import { useState, useRef } from "react";
import Modal from "../../alert/Modal";
import Uploading from "../../alert/Uploading";
import IsImage from "../../alert/IsImage";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const userID = localStorage.getItem("id");
const userName = localStorage.getItem("userName");

export default function Post() {
  const navigate = useNavigate();

  const handleUpload = async () => {
    console.log(previewImages);

    // TODO: photoURL과 userName이 null일 때 어떻게 해야 하는가
    if (!userName) throw new Error("userName does not exist!");
    if (!userID) throw new Error("userID does not exist!");

    try {
      openModal(<Uploading />);
      const { data } = (await axios.post<
        unknown,
        AxiosResponse<unknown, APIPostsPostRequest>,
        APIPostsPostRequest
      >("/api/posts", {
        title: title,
        body: content,
        postImg: previewImages,
        writerID: userName,
        userID: userID,
      })) as any;
      // TODO: 예기치 못한 응답 객체 사용
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

  // 글쓰기 폼 제출 핸들러
  const handleSubmit = () => {
    // TODO: 입력된 정보를 어떻게 처리할지 구현합니다.
    console.log("제목:", title);
    console.log("내용:", content);
    // (예시) 서버에 데이터를 전송하거나, 다른 필요한 동작을 수행할 수 있습니다.
  };

  // 글의 줄 수에 따라 input 필드 높이 조절
  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (!textarea.current) return;

    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const [previewImages, setPreviewImages] = useState<string[]>([]); //이미지 주소들 저장하는 배열

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files!;

    const processImages = async () => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let imageDataURL = await readFileAsDataURL(file);
        setPreviewImages((prevImages) => [...prevImages, imageDataURL]);

        console.log(file);
      }
    };

    processImages();
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
    if (previewImages.length === 0) {
      //올라간 이미지가 없으면 업로드 불가 모달 띄우기
      openModal(<IsImage onClose={closeModal} />);
      console.log("uploadClick");
    }
    //올라간 이미지가 있으면 업로드 시작
    else {
      //폼 제출
      handleSubmit();
      //서버에 업로드
      handleUpload();

      console.log("imgae ok");
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
        //closeClick = {closeClick}
      />
      {/* 모달 */}
      <Modal isOpen={modalIsOpen}>{modalContent}</Modal>
      <div className="content">
        {/* margin을 위한 div */}
        <div className="marignBox">
          <form
            className="post"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="title">
              <input
                className="titleInput"
                type="text"
                name="title"
                value={title}
                placeholder="제목을 입력하세요"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <article className="writing">
              <textarea
                className="writingInput"
                rows={1}
                ref={textarea}
                name="content"
                value={content}
                placeholder="자유롭게 덕질 일상을 기록해요 ( ⸝•ᴗ•⸝)"
                onInput={handleResizeHeight}
                onChange={(e) => setContent(e.target.value)}
              />

              <div className="img-upload-box">
                {previewImages.map((image, index) => (
                  <div
                    className="img-upload-preview"
                    key={index}
                    style={{ width: "28vw" }}
                  >
                    <div
                      className="removeIMG"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <img src={"/img/writing/close.png"}></img>
                    </div>
                    <img src={image} alt={`미리보기 ${index}`} />
                  </div>
                ))}
              </div>
            </article>
          </form>
        </div>
      </div>
      <div className="toolBar">
        <div className="camera" onClick={handleCameraBtnClick}>
          <img src={"/img/writing/camera.png"} />
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
