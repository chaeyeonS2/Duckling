import "../../css/post.css";
import "../../css/layout.css";
import Footer from "../../footer";
import HeaderPost from "../../headers/headerPost";
import React, { useState, Suspense, useRef, useEffect } from "react";

const Post = propos => {
    // 상태(State) 정의: 제목과 내용을 각각의 상태로 관리합니다.
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 글쓰기 폼 제출 핸들러
    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: 입력된 정보를 어떻게 처리할지 구현합니다.
        console.log('제목:', title);
        console.log('내용:', content);
        // (예시) 서버에 데이터를 전송하거나, 다른 필요한 동작을 수행할 수 있습니다.
    };

    return (
        <div className="layout">
            {/* 고정 헤더 */}
            <HeaderPost/>
            <div className="content">
                {/* margin을 위한 div */}
                <div className="marignBox">    
                    <form className="post" onSubmit={handleSubmit}>
                        <div className="title">
                            <input className="titleInput"
                                type = "text"
                                name="title"
                                value={title}
                                placeholder="제목을 입력하세요"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="writing">
                            <textarea className="writingInput"
                                name="content"                                
                                value={content}
                                placeholder="자유롭게 덕질 일상을 기록해요 ( ⸝•ᴗ•⸝)"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </form>
                    <div>

                    </div>

                </div>
                
            </div>
            <div className="toolBar">
                <div className="camera"><img src={process.env.PUBLIC_URL + "/img/writing/camera.png"}/></div>
            </div>
            {/* 고정 푸터 */}
            <Footer/>           
            
        </div>
    )
}
export default Post