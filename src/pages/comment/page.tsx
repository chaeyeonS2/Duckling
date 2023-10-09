import { useState, ChangeEvent, FormEvent } from "react";
import Footer from "@/components/layout/Footer";
import HeaderComment from "@/components/layout/headers/HeaderComment";
import axios from "axios";
import { useLocation } from "react-router-dom";

import * as styles from "./page.css";

// TODO: useLocalStorage 사용하기, 비동기화의 위험성 다분함
const userID = localStorage.getItem("id");
const userName = localStorage.getItem("userName");

export default function CommentPage() {
  const location = useLocation();
  const postID: string = location.state.postID;

  // userID: profileImg
  const [profileImg, setProfileImg] = useState<Record<string, string>>();
  const [data, setData] = useState<APICommentsReponse>();
  const [comment, setComment] = useState("");

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment === "") {
      return;
    }

    // TODO: userID과 userName이 null일 때 어떻게 해야 하는가
    if (!userName) throw new Error("userName does not exist!");
    if (!userID) throw new Error("userID does not exist!");

    // 여기에 댓글을 서버에 보내는 로직을 추가할 수 있습니다.
    await axios
      .post("/api/comments", {
        text: comment,
        userID: userID,
        rootID: postID,
        writerID: userName,
      })
      .then((response) => console.log("Document uploaded:", response.data))
      .catch((error) => console.error("Error uploading document:", error));

    console.log("댓글 제출:", comment);
    setComment(""); // 댓글 입력란 초기화

    const { data: comments } = await axios.get(`/api/comments/root/${postID}`);
    comments.sort((a, b) => a.time - b.time);

    Promise.all(
      comments.map((comment) =>
        axios.get(`/api/users/${comment.writerID}`).then(({ data }) =>
          setProfileImg((prev) => ({
            ...prev,
            [comment.writerID]: data.profileImg,
          }))
        )
      )
    );

    setData(comments);
  };

  return (
    <div className="layout">
      {/* // TODO: layout 컴포넌트 재사용하기 */}
      {/* 고정 헤더 */}
      <HeaderComment />
      <div className={styles.content}>
        {data && (
          <div className={styles.bottomSheetContent}>
            <div className={styles.commentGetLayout}>
              {/* 댓글 */}
              {data.map((comment) => (
                <div className={styles.commentBox}>
                  <div className={styles.commentTop}>
                    <div className={styles.profileImg} style={{ backgroundImage: `url(${profileImg})` }}></div>
                    <div className={styles.userName}>{comment.writerID}</div>
                  </div>
                  <div>{comment.text}</div>
                </div>
              ))}

              {/* 댓글 끝 */}
            </div>
          </div>
        )}
      </div>

      <div className={styles.writeComment}>
        <div>
          <form onSubmit={(e) => handleSubmit(e).catch(console.log)} className={styles.commentInput}>
            <textarea
              className={styles.commentInputTextarea}
              rows={3}
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <br />

            <button className={styles.commentButton} type="submit">
              <img src="/img/writing/comment-upload-true-btn.png" />
            </button>
          </form>
        </div>
      </div>
      {/* 고정 푸터 btn 전달값 유저에 따라 수정해야함*/}
      <Footer btn={1} />
    </div>
  );
}
