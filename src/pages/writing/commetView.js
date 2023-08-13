import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';
// import 'react-spring-bottom-sheet/dist/style.css'; // 스타일 파일을 불러옵니다.
import "../../css/customBottomSheet_postView.css";

const CommentView = () => {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [show, setShow] = useState(false); // show 상태와 setShow 함수를 선언합니다.

    const print = () => {  
        console.log("touch"); 
    } 
    const sheetRef = useRef() 
    
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // 여기에 댓글을 서버에 보내는 로직을 추가할 수 있습니다.
      console.log('댓글 제출:', comment);
      setComment(''); // 댓글 입력란 초기화
    };

    

    const modalRef = useRef(null);
 
    // useLayoutEffect(() => {
    
    //     const parentDiv = document.getElementById('parentDiv-post');
    //     if (parentDiv) {
    //       const childDivs = parentDiv.querySelectorAll('div');
          
    //       childDivs.forEach((childDiv) => {
    //         childDiv.classList.add('postSheet');
    //       });
           
    //       return () => {
    //         childDivs.forEach((childDiv) => {
    //           childDiv.classList.remove('postSheet');
    //         });
    //       };
    //     }
    //   }, []);
    const [portalCreated, setPortalCreated] = useState(false);

    useEffect(() => {
        // BottomSheet가 항상 열려있는 상태에서 실행될 코드
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
      }, []);
    


    return(
        <BottomSheet className="postSheet" id="parentDiv-post"
            open // 바닥 시트 열림 상태
            //onDismiss={() => setShow(false)} // 닫기 버튼 클릭 시 호출되는 함수
            //snapPoints={({ maxHeight }) => {snapPoints}}
            scrollLocking = {false}
            snapPoints={({ maxHeight }) => [
                maxHeight/19, //최소
                maxHeight /2, //최대
                ]}
                ref={sheetRef}
                header={
                <div className="bottomBar">
                    <div className='candy'>
                        <div><img src={process.env.PUBLIC_URL + "/img/writing/cookie.png"}/></div>
                        <div className='num'>215</div>
                    </div>
                    <div className='comment' onClick={() => 
                        sheetRef.current.snapTo(({ snapPoints }) => Math.max(...snapPoints), {
                            // Each property is optional, here showing their default values
                            source: 'snap-to-top',
                            velocity: 1,
                            })}>
                        <div><img src={process.env.PUBLIC_URL + "/img/writing/comment.png"}/></div>
                        <div className='num'>423</div>
                    </div>

                    <button onClick={() => sheetRef.current.snapTo(0, { source: 'snap-to-bottom' })}>close</button>
                

                </div>
                }
            > 
            <div className="BottomSheet-content">
               <div className="comment-get-layout">
                <div className="commentBox">
                        <div className='commentTop'>
                            <div className="profileImg">
                                {/* 서버에서 받아온 이미지 넣기 */}
                            </div> 
                            <div className="userName">
                                팜하니
                            </div>
                        </div>
                        <div className='commentContent'>
                        너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무

                        </div>
                    </div>
                <div className="commentBox">
                        <div className='commentTop'>
                            <div className="profileImg">
                                {/* 서버에서 받아온 이미지 넣기 */}
                            </div>
                            <div className="userName">
                                팜하니
                            </div>
                        </div>
                        <div className='commentContent'>
                        너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무

                        </div>
                    </div>
                    <div className="commentBox">
                        <div className='commentTop'>
                            <div className="profileImg">
                                {/* 서버에서 받아온 이미지 넣기 */}
                            </div> 
                            <div className="userName">
                                팜하니
                            </div>
                        </div>
                        <div className='commentContent'>
                        너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무

                        </div>
                    </div>
                    <div className="commentBox">
                        <div className='commentTop'>
                            <div className="profileImg">
                                {/* 서버에서 받아온 이미지 넣기 */}
                            </div>
                            <div className="userName">
                                팜하니
                            </div>
                        </div>
                        <div className='commentContent'>
                        너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무 재미있어요. super shy~~~너무
                        </div>
                    </div>
            
                </div> 
            
                <div className="writeComment">
                    <div >
                        <form onSubmit={handleSubmit} className="commentInput">
                            <textarea
                            rows="3"
                            placeholder="댓글을 입력하세요..."
                            value={comment}
                            onChange={handleCommentChange}
                            ></textarea>
                            <br />

                            <button className="Btn_comment" type="submit">
                            <img src={process.env.PUBLIC_URL + "/img/writing/comment-upload-true-btn.png"}/>
                            </button>
                        </form>

                </div>

                </div>
            
            
 
            </div>
        </BottomSheet>

    )
}

export default CommentView