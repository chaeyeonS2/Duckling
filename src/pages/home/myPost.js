import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';
import "../../css/customBottomSheet.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const userID = localStorage.getItem("id");
var photoURL = '';
var userName = '';
//const userName = "hublemon"; 
const MyPost = () => {
  const [postImgArray, setPostArray] = useState([]);

    const navigate = useNavigate();


    const newpostClick = () => {
        navigate("/newPost");
    }

  //bottom sheet css 적용을 위한 코드
  useEffect(() => {
    userName = localStorage.getItem("userName");
    photoURL = localStorage.getItem("profileImg");

    const getPostInfo = async () => {
      try {
        const response = await axios.get(`https://us-central1-netural-app.cloudfunctions.net/api/posts/writer/${userName}`);
        
        console.log(userName);
        setPostArray( response.data.map(item => item.postImg[0]));
        console.log(postImgArray);

        
      } catch (error) {
        console.error(error);
      }
    };

    getPostInfo(); // 컴포넌트가 마운트될 때 getPost 함수 호출

  // setTimeout을 사용하여 portal이 생성된 후에 작업 실행
  const timeoutId = setTimeout(() => {
    const parentDiv = document.getElementById('parentDiv-home');
    if (parentDiv) {
      const childDivs = parentDiv.querySelectorAll('div');
      
      childDivs.forEach((childDiv) => {
        childDiv.classList.add('homeSheet');
      });
      return () => {
        childDivs.forEach((childDiv) => {
          childDiv.classList.remove('homeSheet');
        });
      };
    }
    const element = window.getComputedStyle(document.querySelector("--rsbs-overlay-h"));
    //console.log(element);
    element.style.setProperty("--rsbs-overlay-h", "100px"); // 원하는 값을 설정해주세요
  }, 1); // 일정 시간 후에 실행

  

  
  return () => {
    
    clearTimeout(timeoutId); // 컴포넌트가 언마운트될 때 clearTimeout으로 타이머 해제
    
  };




}, []);


// getPost();

// useEffect(() => {


// getPost();
// }
// ,[]);
//   // getPost 함수 정의
//   const getPost = async () => {
//     try {
//       const response = await axios.get(`https://us-central1-netural-app.cloudfunctions.net/api/posts/writer/${userName}`);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  

  var postArray = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]; //item 임의 개수
    //썸네일
    var imgArray = [ 
      process.env.PUBLIC_URL + "/img/home/myPost/mypost1.png",
      process.env.PUBLIC_URL + "/img/home/myPost/mypost3.png",
      process.env.PUBLIC_URL + "/img/home/myPost/mypost1_1.png",
      process.env.PUBLIC_URL + "/img/home/myPost/mypost1_2.png",
      process.env.PUBLIC_URL + "/img/home/myPost/mypost1_3.png",
      process.env.PUBLIC_URL + "/img/home/myPost/mypost1_4.png",
      process.env.PUBLIC_URL + "/img/home/myPost/mypost1_5.png",
      process.env.PUBLIC_URL + "/img/home/myPost/mypost1_6.png",
      process.env.PUBLIC_URL + "/img/home/myPost/mypost1_7.png",
];
return(
    <BottomSheet className="homeSheet" id="parentDiv-home" 
    open
    skipInitialTransition
    snapPoints={({ maxHeight }) => [
      maxHeight*0+80, //최소
      maxHeight /2, //최대 
      
    ]}
    
    blocking = {false}  //배경 블록 현상 해결
    header ={
      <div className="bottom_header homeSheet">
        <div className="profileImg homeSheet" style={{backgroundImage:`url(${photoURL})`}}>
        </div>
        <div className="userName homeSheet">
          {userName}
        </div>
        
        <div className="btnAddNew homeSheet" onClick={newpostClick}>
          <img src={process.env.PUBLIC_URL + "/img/writing/add.png"}/>
        </div>
      </div>
    }
  >
    <div className="bottom_content homeSheet">
        
        { //아이템 썸네일 박스
          postImgArray.map((imgSrc, index)=>(
            <div className="postImg">
              {/* TO-DO 클릭하면 해당 포스트로 이동하는 코드 작성 */}
              <img className="item_img" src= { imgSrc } />
            </div>

        )

          )}  

        
    </div>
  </BottomSheet>
)

}

export default MyPost