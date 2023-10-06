<<<<<<< HEAD
import useFetch from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import useLocalStorageState from "use-local-storage-state";

import "@/css/customBottomSheet.css";

export default function MyPost() {
  const [photoURL] = useLocalStorageState("profileImg");
  const [userName] = useLocalStorageState("userName");
  const postInfoArray = useFetch(
    `https://us-central1-netural-app.cloudfunctions.net/api/posts/writer/${userName}`,
    [""]
  );

  const navigate = useNavigate();
  const handleNewPostClick = () => {
    navigate("/newPost");
  };
  const handlePostClick = (postID) => {
    navigate(`/postview/${userName}/${postID}`);
  };

  return (
    <BottomSheet
      className="homeSheet"
      id="parentDiv-home"
      open
      blocking={false}
      skipInitialTransition
      snapPoints={({ maxHeight }) => [80, maxHeight / 2]}
      header={
        <div className="bottom_header">
          <div
            className="profileImg"
            style={{ backgroundImage: `url(${photoURL})` }}
          />
          <div className="userName">{userName}</div>
          <div className="btnAddNew" onClick={handleNewPostClick}>
            <img
              src={process.env.PUBLIC_URL + "/img/writing/add.png"}
              alt="+"
            />
          </div>
        </div>
      }
    >
      <div className="bottom_content">
        {postInfoArray.map((info) => (
          <div
            key={info.postId}
            className="postImg"
            onClick={() => handlePostClick(info.postId)}
          >
            <img className="item_img" src={info.postImg} alt="postImg" />
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
=======
import React, { useState, useEffect } from "react";
//import { BottomSheet } from "react-spring-bottom-sheet";
import "../../css/customBottomSheet.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

var photoURL = "";
var userName = "";
const MyPost = () => {
  // const [postInfoArray, setPostArray] = useState([""]);

  // const navigate = useNavigate();

  // const newpostClick = () => {
  //   navigate("/newPost");
  // };

  // //bottom sheet css 적용을 위한 코드
  // useEffect(() => {
  //   userName = localStorage.getItem("userName");
  //   photoURL = localStorage.getItem("profileImg");

  //   const getPostInfo = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://us-central1-netural-app.cloudfunctions.net/api/posts/writer/${userName}`
  //       );

  //       if (response.data !== null) {
  //         const newPostInfoArray = response.data.map((item) => ({
  //           postImg: item.postImg[0],
  //           postId: item.postID,
  //         }));
  //         setPostArray(newPostInfoArray);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getPostInfo(); // 컴포넌트가 마운트될 때 getPost 함수 호출
  // }, []);

  // const handlePostClick = (userName, postID) => {
  //   navigate(`/postview/${userName}/${postID}`);
  // };

  // return (
  //   <BottomSheet
  //     id="parentDiv-home"
  //     open
  //     skipInitialTransition
  //     snapPoints={({ maxHeight }) => [
  //       maxHeight * 0 + 80, //최소
  //       maxHeight / 2, //최대
  //     ]}
  //     blocking={false} //배경 블록 현상 해결
  //     header={
  //       <div className="bottom_header homeSheet">
  //         <div
  //           className="profileImg homeSheet"
  //           style={{ backgroundImage: `url(${photoURL})` }}
  //         />
  //         <div className="userName homeSheet">{userName}</div>
  //         <div className="btnAddNew homeSheet" onClick={newpostClick}>
  //           <img src={process.env.PUBLIC_URL + "/img/writing/add.png"} alt="" />
  //         </div>
  //       </div>
  //     }
  //   >
  //     <div className="bottom_content homeSheet">
  //       {postInfoArray.map((info, index) => (
  //         <div
  //           className="postImg"
  //           onClick={() => handlePostClick(userName, info.postId)}
  //         >
  //           <img className="item_img" src={info.postImg} alt="" />
  //         </div>
  //       ))}
  //     </div>
  //   </BottomSheet>
  // );
};

export default MyPost;
>>>>>>> 5798e01a669e721d3130f323b449a522954baeda
