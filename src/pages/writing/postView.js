import Footer from '../../footer';
import "../../css/layout.css";
import "../../css/postView.css"
import HeaderPostView from "../../headers/headerPostView";
import React, { useState, useRef } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';
// import 'react-spring-bottom-sheet/dist/style.css'; // 스타일 파일을 불러옵니다.
import "../../css/customBottomSheet_postView.css";

const PostView = () => {
    const textarea = useRef(null);

    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [show, setShow] = useState(false); // show 상태와 setShow 함수를 선언합니다.

    const print = () => {
        console.log("touch");
    }
    const sheetRef = useRef()

    return (
        <div className="layout">
            {/* 고정 헤더 */}
            <HeaderPostView/>
            <div className="content">
            <div className="marignBox">    
                    <form className="post" >
                        <div className="title">
                            <p className='text_title text'>받아온 제목</p>
                        </div>
                        
                        <div className="writing">
                            <p className="text_content text">
                                받아온 글
                            </p>    
                        </div>
                        
                    </form>

                </div>
                
            </div>
            <BottomSheet
                    open // 바닥 시트 열림 상태
                    //onDismiss={() => setShow(false)} // 닫기 버튼 클릭 시 호출되는 함수
                    //snapPoints={({ maxHeight }) => {snapPoints}}
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

                    <div>
                        
                    </div>
            </BottomSheet>
            {/* 고정 푸터 */}
            <Footer/>
        </div>
    )
}

export default PostView