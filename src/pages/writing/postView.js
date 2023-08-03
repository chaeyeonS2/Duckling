import Footer from '../../footer';
import "../../css/layout.css";
import "../../css/postView.css"
import HeaderPostView from "../../headers/headerPostView";
import React, { useState, useRef } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';
// import 'react-spring-bottom-sheet/dist/style.css'; // 스타일 파일을 불러옵니다.
import "../../css/customBottomSheet.css";

const PostView = () => {
    const textarea = useRef(null);

    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [show, setShow] = useState(false); // show 상태와 setShow 함수를 선언합니다.

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
            <div className="bottomBar">
                <div className='candy'>
                    <div><img src={process.env.PUBLIC_URL + "/img/writing/cookie.png"}/></div>
                    <div className='num'>215</div>
                </div>
                <div className='comment' onClick={() => setShow(true)}>
                    <div><img src={process.env.PUBLIC_URL + "/img/writing/comment.png"}/></div>
                    <div className='num'>423</div>
                </div>
            </div>
            <BottomSheet
                    open={show} // 바닥 시트 열림 상태
                    onDismiss={() => setShow(false)} // 닫기 버튼 클릭 시 호출되는 함수
                >
                    <div className="commentBox">
                    댓글용 바닥 시트
                    </div>
            </BottomSheet>
            {/* 고정 푸터 */}
            <Footer/>
        </div>
    )
}

export default PostView