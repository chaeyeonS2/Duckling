import React, { useState, useRef, useEffect } from "react";
import "../../css/lookiing/postBox.css";
import axios from "axios";

//전달되는 포스트 정보
// {
//     "postID": "postID",
//     "title": "title",
//     "body": "body"
//     "postImg": "postImg",
//     "writerID": "hublemon",
//     "time": "time",
//     "date": "YYYY.MM.DD",
//     "likes": "likes"
// }
const PostBox = (props) => {
  const data = props.post;
  const uid = data.userID;
  const [profileImg, setProfileImg] = useState(""); // 상태 추가
  const getUserProfileImg = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-netural-app.cloudfunctions.net/api/users/${uid}`,
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
          <img src={process.env.PUBLIC_URL + "/img/looking/cookie.png"} />
        </div>
        <text>{data.likes}</text>
        <div>
          <img src={process.env.PUBLIC_URL + "/img/looking/comment.png"} />
        </div>
        <text>{data.commentCount}</text>
      </div>

      <div className="one-post-content">
        <p>{data.body}</p>
      </div>
    </div>
  );
};
export default PostBox;
