import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';
// import 'react-spring-bottom-sheet/dist/style.css'; // 스타일 파일을 불러옵니다.
import "../../css/customBottomSheet.css";



const Tmp = () => {

    useEffect(() => {
        
        // setTimeout을 사용하여 portal이 생성된 후에 작업 실행
        const timeoutId = setTimeout(() => {
          const parentDiv = document.getElementById('parentDiv-post');
          if (parentDiv) {
            const childDivs = parentDiv.querySelectorAll('div');
            
            childDivs.forEach((childDiv) => {
              childDiv.classList.add('postSheet');
            });
            
            return () => {
              childDivs.forEach((childDiv) => {
                childDiv.classList.remove('postSheet');
              });
            }; 
          }
        }, 100); // 일정 시간 후에 실행
        
        return () => {
          clearTimeout(timeoutId); // 컴포넌트가 언마운트될 때 clearTimeout으로 타이머 해제
        };
      }, []);
      
    return (
        <BottomSheet className="homeSheet" id="parentDiv-home" 
              open
              skipInitialTransition
              snapPoints={({ maxHeight }) => [
                maxHeight/11.5, //최소
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
                  
                  <div className="btnAddNew homeSheet">
                    <img src={process.env.PUBLIC_URL + "/img/writing/add.png"}/>
                  </div>
                </div>
              }
            >
              <div className="bottom_content homeSheet">
                  

                  
              </div>
            </BottomSheet>
    )
}
 
export default Tmp