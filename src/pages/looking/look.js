// import Header from './headers/header';
import Footer from "../../footer";
import "../../css/layout.css";
import React, { useState, useRef, useEffect } from "react";
import PostBox from "./postBox";
import HeaderLook from "../../headers/headerLook";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//전달되는 포스트 정보
// {\
//     "postID": "postID",
//     "title": "title",
//     "body": "body"
//     "postImg": "postImg",
//     "writerID": "hublemon",
// 		"userID" : "uid"
//     "time": "time",
//     "date": "YYYY.MM.DD",
//     "likes": 0,
// 		"commentCount" : 0
// }
const Look = () => {
  const [postData, setData] = useState(null);
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-netural-app.cloudfunctions.net/api/posts",
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPost();
  }, [getPost]); // getPost 함수를 의존성 배열에 추가

  // 데이터가 업데이트되면 호출되는 효과
  useEffect(() => {
    // 이 곳에서 setData 호출 이후 추가 작업을 수행
    // 예: 다른 상태나 변수에 기반하여 작업을 처리하거나 컴포넌트 상태에 따라 조건부 렌더링을 수행
  }, [postData]);

  const layoutStyle = {
    position: "absolute",
    paddingTop: "70px",
    /* width: 100%; */
    height: "80vh",
    paddingBottom: "88px",
    overflow: "auto",
  };
  const handlePostClick = (userName, postID) => {
    navigate(`/postview/${userName}/${postID}`);
  };
  return (
    <div className="layout">
      {/* 고정 헤더 */}
      <HeaderLook />
      <div className="content lookLayout" style={layoutStyle}>
        {/* 페이지 내용 */}
        {postData &&
          postData.map((post, index) => (
            <div onClick={() => handlePostClick(post.writerID, post.postID)}>
              <PostBox key={index} post={post} />
            </div>
          ))}
      </div>
      {/* 고정 푸터 */}
      <Footer btn={0} />
    </div>
  );
};

export default Look;
