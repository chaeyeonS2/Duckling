// import React, { useState, useEffect } from "react";
// import { BottomSheet } from "react-spring-bottom-sheet";
// import "@/css/customBottomSheet.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// TODO: 이거 왜 모두 주석처리 됐나요

// var photoURL = "";
// var userName = "";
export default function MyPost() {
  return <></>;
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
  //         `/api/posts/writer/${userName}`
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
  //           <img src={"/img/writing/add.png"} alt="" />
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
}
