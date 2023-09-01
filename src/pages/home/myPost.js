import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "../../css/customBottomSheet.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userID = localStorage.getItem("id");
var photoURL = "";
var userName = "";
//const userName = "hublemon";
const MyPost = () => {
  const [postInfoArray, setPostArray] = useState([""]);

  const navigate = useNavigate();

  const newpostClick = () => {
    navigate("/newPost");
  };

  //bottom sheet css 적용을 위한 코드
  useEffect(() => {
    userName = localStorage.getItem("userName");
    photoURL = localStorage.getItem("profileImg");

    const getPostInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-netural-app.cloudfunctions.net/api/posts/writer/${userName}`,
        );

        console.log(userName);
        if (response.data !== null) {
          const newPostInfoArray = response.data.map((item) => ({
            postImg: item.postImg[0],
            postId: item.postID,
          }));
          setPostArray(newPostInfoArray);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPostInfo(); // 컴포넌트가 마운트될 때 getPost 함수 호출

    // setTimeout을 사용하여 portal이 생성된 후에 작업 실행
    const timeoutId = setTimeout(() => {
      const parentDiv = document.getElementById("parentDiv-home");
      if (parentDiv) {
        const childDivs = parentDiv.querySelectorAll("div");

        childDivs.forEach((childDiv) => {
          childDiv.classList.add("homeSheet");
        });
        return () => {
          childDivs.forEach((childDiv) => {
            childDiv.classList.remove("homeSheet");
          });
        };
      }
      const element = window.getComputedStyle(
        document.querySelector("--rsbs-overlay-h"),
      );
      //console.log(element);
      element.style.setProperty("--rsbs-overlay-h", "100px"); // 원하는 값을 설정해주세요
    }, 1); // 일정 시간 후에 실행

    return () => {
      clearTimeout(timeoutId); // 컴포넌트가 언마운트될 때 clearTimeout으로 타이머 해제
    };
    getPostInfo(); // 컴포넌트가 마운트될 때 getPost 함수 호출
  }, []);

  const handlePostClick = (userName, postID) => {
    navigate(`/postview/${userName}/${postID}`);
  };

  return (
    <BottomSheet
      className="homeSheet"
      id="parentDiv-home"
      open
      skipInitialTransition
      snapPoints={({ maxHeight }) => [
        maxHeight * 0 + 80, //최소
        maxHeight / 2, //최대
      ]}
      blocking={false} //배경 블록 현상 해결
      header={
        <div className="bottom_header homeSheet">
          <div
            className="profileImg homeSheet"
            style={{ backgroundImage: `url(${photoURL})` }}
          ></div>
          <div className="userName homeSheet">{userName}</div>

          <div className="btnAddNew homeSheet" onClick={newpostClick}>
            <img src={process.env.PUBLIC_URL + "/img/writing/add.png"} />
          </div>
        </div>
      }
    >
      <div className="bottom_content homeSheet">
        {
          //아이템 썸네일 박스
          postInfoArray.map((info, index) => (
            <div
              className="postImg"
              onClick={() => handlePostClick(userName, info.postId)}
            >
              <img className="item_img" src={info.postImg} />
            </div>
          ))
        }
      </div>
    </BottomSheet>
  );
};

export default MyPost;
