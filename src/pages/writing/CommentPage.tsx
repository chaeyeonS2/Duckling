import "../../css/layout.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Footer from "../../Footer";
import HeaderComment from "../../headers/HeaderComment";
import styles from "../../css/writing/commentPage.module.css";
import axios from "axios";
import "../../css/customBottomSheet_postView.css";

const userID = localStorage.getItem("id");
var getUid = "";
const userName = localStorage.getItem("userName");
var pid = "";
export function getCommentInfo(postid: string) {
  pid = postid;
}

interface CommentData {
  commentID: string;
  text: string;
  rootID: string;
  writerID: string;
  time: string;
  date: string;
}

export default function CommentPage() {
  const [comment, setComment] = useState("");
  const [upload, setUpload] = useState("");

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment === "") {
      return;
    }
    // 여기에 댓글을 서버에 보내는 로직을 추가할 수 있습니다.
    const handleUpload = async () => {
      try {
        const response = await axios.post(
          "https://us-central1-netural-app.cloudfunctions.net/api/comments",
          {
            text: comment,
            userID: userID,
            rootID: pid,
            writerID: userName,
          }
        );
        console.log("Document uploaded:", response.data);
        if (response.data) {
          //window.location.reload();
          setUpload("aa");
        }
      } catch (error) {
        console.error("Error uploading document:", error);
      }
    };
    handleUpload();
    console.log("댓글 제출:", comment);
    setComment(""); // 댓글 입력란 초기화
    getComment();
  };
  const [profileImg, setProfileImg] = useState(""); // 상태 추가
  const getUserProfileImg = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-netural-app.cloudfunctions.net/api/users/${getUid}`
      );
      setProfileImg(response.data.profileImg); // 상태 업데이트
    } catch (e) {
      console.error(e);
    }
  };
  //유저 정보 받아오기

  useEffect(() => {
    getUserProfileImg();
  }, [getUid]);

  const [data, setData] = useState<CommentData[]>();

  //댓글 받아오기
  const getComment = async () => {
    try {
      // TODO: 알 수 없는 api 사용 로직 해결
      const response = await axios.get(
        `https://us-central1-netural-app.cloudfunctions.net/api/comments/root/${pid}`
      );
      const commentData: CommentData = response.data;
      console.log("success");
      // @ts-ignore
      getUid = commentData.userID;
      // @ts-ignore
      setData(commentData.slice().sort((a, b) => a.time - b.time));
    } catch (e) {
      console.error(e);
    }
  };
  //유저 정보 받아오기

  useEffect(() => {
    getComment();
  }, [upload]);
  // [리뷰] 블라블라블라.....

  return (
    <div className="layout">
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
          <form onSubmit={handleSubmit} className={styles.commentInput}>
            <textarea
              rows={3}
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <br />

            <button className="Btn_comment" type="submit">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/img/writing/comment-upload-true-btn.png"
                }
              />
            </button>
          </form>
        </div>
      </div>
      {/* 고정 푸터 btn 전달값 유저에 따라 수정해야함*/}
      <Footer btn={1} />
    </div>
  );
}

// //전달되는 포스트 정보
// {
//     "commentID": "commentID",
//     "text": "text",
//     "rootID": "rootID",
//     "writerID": "writerID",
//     "time": "time",
//     "date": "date"
// }
