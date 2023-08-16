import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';
import "../../css/customBottomSheet.css";
import { useNavigate } from "react-router-dom";


const MyPost = () => {
    const navigate = useNavigate();


    const newpostClick = () => {
        navigate("/newPost");
    }
  //bottom sheet css 적용을 위한 코드
useEffect(() => {

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
    console.log(element);
    element.style.setProperty("--rsbs-overlay-h", "100px"); // 원하는 값을 설정해주세요

  }, 1); // 일정 시간 후에 실행
  
  return () => {
    clearTimeout(timeoutId); // 컴포넌트가 언마운트될 때 clearTimeout으로 타이머 해제
  };
}, []);

  
  var postArray = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]; //item 임의 개수
    //썸네일
      var imgArray = [ 
    process.env.PUBLIC_URL + "/png/hani_pants.png",
    process.env.PUBLIC_URL + "/png/hani_top.png", 
    process.env.PUBLIC_URL + "/png/herin_skirt.png", 
    process.env.PUBLIC_URL + "/png/herin_top.png", 
    process.env.PUBLIC_URL + "/png/hyein_pants.png", 
    process.env.PUBLIC_URL + "/png/hyein_top.png", 
    process.env.PUBLIC_URL + "/png/minji_pants.png", 
    process.env.PUBLIC_URL + "/png/minji_top.png"
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
        <div className="profileImg homeSheet">
          {/* 서버에서 받아온 이미지 넣기 */}
        </div>
        <div className="userName homeSheet">
          팜하니
        </div>
        
        <div className="btnAddNew homeSheet" onClick={newpostClick}>
          <img src={process.env.PUBLIC_URL + "/img/writing/add.png"}/>
        </div>
      </div>
    }
  >
    <div className="bottom_content homeSheet">
        
        { //아이템 썸네일 박스
          postArray.map((num)=>(
            <div className="postImg">
              <img className="item_img" src= { imgArray[num] } />
            </div>

        )

          )}  

        
    </div>
  </BottomSheet>
)

}

export default MyPost