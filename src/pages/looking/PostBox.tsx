import { useState, useEffect } from "react";
import "../../css/lookiing/postBox.css";
import axios from "axios";

export interface PostBoxProps {
  post: Post;
}
function PostBox({ post: data }: PostBoxProps) {
  const uid = data.userID;
  const [profileImg, setProfileImg] = useState(""); // 상태 추가
  const getUserProfileImg = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`
      );
      setProfileImg(response.data.profileImg); // 상태 업데이트
    } catch (e) {
      console.error(e);
    }
  };
  //유저 정보 받아오기

  useEffect(() => {
    getUserProfileImg();
  }, [uid]);

  return (
    <div className="one-post-box">
      <div className="one-post-info">
        <div className="one-post-profile">
          <div
            className="profileImg"
            style={{ backgroundImage: `url(${profileImg})` }}
          ></div>
          <div className="userName">{data.writerID}</div>
          <div className="date">{data.date}</div>
        </div>
      </div>

      <div className="one-post-img-layout">
        <div className="one-post-img-back">
          <div className="back"></div>
          <div className="one-post-img">
            <img className="" src={data.postImg[0]} />
          </div>
        </div>
      </div>
      <div className="one-post-info2">
        <div>
          <img src={"/img/looking/cookie.png"} />
        </div>
        <text>{data.likes}</text>
        <div>
          <img src={"/img/looking/comment.png"} />
        </div>
        <text>{data.commentCount}</text>
      </div>

      <div className="one-post-content">
        <p>{data.body}</p>
      </div>
    </div>
  );
}
export default PostBox;
