import Footer from "../../Footer";
import "../../css/layout.css";
import styles from "../../css/postView.module.css";
import HeaderPostView from "../../headers/HeaderPostView";
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Delete from "../../alert/Delete";
import PostShare from "../../alert/PostShare";
import Modal from "../../alert/Modal";
import axios from "axios";
import ImageSlider from "./ImageSlider";

interface PostData {
  title: string;
  body: string;
  likes: string;
  commentCount: string;
  postImg: string[];
}
export default function PostView() {
  const { writerID, postID } = useParams(); // URL 매개변수 가져오기

  const navigate = useNavigate();
  const commentClick = () => {
    navigate("/comment", { state: { postID } });
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

  const deleteClick = () => {
    openModal(<Delete onClose={closeModal} />);
  };

  const shareClick = () => {
    openModal(<PostShare onClose={closeModal} />);
  };
  const [postData, setData] = useState<PostData>();

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`/api/posts/writer/${writerID}/${postID}`)
        .then((response) => {
          setData(response.data);
        })

        .catch((e) => {
          console.error(e);
        });
    };

    if (postID && writerID) {
      getPost();
    }
  }, [postID, writerID]);

  return (
    <div>
      {/* 고정 헤더 */}
      <HeaderPostView deleteClick={deleteClick} shareClick={shareClick} />
      {/* 모달 */}
      <Modal isOpen={modalIsOpen}>{modalContent}</Modal>
      {postData && (
        <div className={styles.content}>
          <div className={styles.marignBox}>
            <form className={styles.post}>
              <div className={styles.title}>
                <p className={styles.text}>{postData.title}</p>
              </div>

              <div className={styles.writinggetBox}>
                <ImageSlider images={postData.postImg} />

                <p className={styles.text_content}>{postData.body}</p>
              </div>
            </form>
          </div>
        </div>
      )}
      {postData && (
        <div className={styles.bottomBar}>
          <div className={styles.leftBtnGroup}>
            <div className={styles.candy}>
              <div>
                <img src={"/img/writing/cookie.png"} />
              </div>
              <div className={styles.num}>{postData.likes}</div>
            </div>
            <div className={styles.comment} onClick={commentClick}>
              <div>
                <img src={"/img/writing/comment.png"} />
              </div>
              <div className={styles.num}>{postData.commentCount}</div>
            </div>
          </div>
        </div>
      )}

      {/* 고정 푸터 user 값에 따라 수정해야함*/}
      <Footer btn={0} />
    </div>
  );
}
