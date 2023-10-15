import Footer from "@/components/layout/Footer";

import HeaderPostView from "@/components/layout/headers/HeaderPostView";
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Delete from "@/components/alert/Delete";
import PostShare from "@/components/alert/PostShare";
import Modal from "@/components/alert/Modal";
import axios from "axios";
import ImageSlider from "./_components/ImageSlider";

import * as styles from "./page.css";

export default function PostViewPage() {
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
  const [postData, setData] = useState<Post>();

  useEffect(() => {
    const getPost = async () => {
      // TODO: writerID와 postID이 null일 때 어떻게 해야 하는가
      if (!writerID) throw new Error("writerID does not exist!");
      if (!postID) throw new Error("postID does not exist!");

      await axios
        .get(`/api/posts/writer/${writerID}/${postID}`)
        .then((response) => setData(response.data))
        .catch((e) => console.error(e));
    };

    getPost();
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
            <form>
              <div className={styles.title}>
                <p>{postData.title}</p>
              </div>

              <div className={styles.writinggetBox}>
                <ImageSlider images={postData.postImg} />

                <p className={styles.textContent}>{postData.body}</p>
              </div>
            </form>
          </div>
        </div>
      )}
      {postData && (
        <div>
          <div className={styles.leftBtn}>
            <div className={styles.leftBtn}>
              <div className={styles.leftBtn}>
                <img src="/img/writing/cookie.png" />
              </div>
              <div className={styles.num}>{postData.likes}</div>
            </div>
            <div className={styles.leftBtn} onClick={commentClick}>
              <div className={styles.leftBtn}>
                <img src="/img/writing/comment.png" />
              </div>
              <div className={styles.num}>{postData.commentCount}</div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
