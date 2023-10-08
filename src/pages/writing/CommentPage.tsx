import "../../css/layout.css";
import { useState, ChangeEvent, FormEvent } from "react";
import Footer from "../../Footer";
import HeaderComment from "../../headers/HeaderComment";
import styles from "../../css/writing/commentPage.module.css";
import axios from "axios";
import "../../css/customBottomSheet_postView.css";
import { useLocation } from "react-router-dom";

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

    const { data: comments } = await axios.get<APICommentsReponse>(
      `/api/comments/root/${postID}`
    );
    comments.sort((a, b) => a.time - b.time);

    Promise.all(
      comments.map((comment) =>
        axios
          .get<APIUserResponse>(`/api/users/${comment.writerID}`)
          .then(({ data }) =>
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
          <div className="BottomSheet-content">
            <div className="comment-get-layout" style={{ height: "80%" }}>
              {/* 댓글 */}
              {data.map((comment) => (
                <div className="commentBox">
                  <div className="commentTop">
                    <div
                      className={styles.profileImg}
                      style={{ backgroundImage: `url(${profileImg})` }}
                    ></div>
                    <div className="userName">{comment.writerID}</div>
                  </div>
                  <div className="commentContent">{comment.text}</div>
                </div>
              ))}

              {/* 댓글 끝 */}
            </div>
          </div>
        )}
      </div>

      <div className={styles.writeComment}>
        <div>
          <form
            onSubmit={(e) => handleSubmit(e).catch(console.log)}
            className={styles.commentInput}
          >
            <textarea
              rows={3}
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <br />

            <button className="Btn_comment" type="submit">
              <img src={"/img/writing/comment-upload-true-btn.png"} />
            </button>
          </form>
        </div>
      </div>
      {/* 고정 푸터 btn 전달값 유저에 따라 수정해야함*/}
      <Footer btn={1} />
    </div>
  );
}
