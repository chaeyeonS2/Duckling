import "../../css/post.css";
import "../../css/layout.css";
import Footer from "../../footer";
import HeaderPost from "../../headers/headerPost";
import React, { useState, Suspense, useRef, useEffect } from "react";
import Modal from '../../alert/modal';
import Uploading from "../../alert/uploading";
import IsImage from "../../alert/isImage";

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

    // 글의 줄 수에 따라 input 필드 높이 조절
    const textarea = useRef(null);
        const handleResizeHeight = () => {
        textarea.current.style.height = 'auto'; //height 초기화
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
    };

    //camera -> 이미지 삽입
    const [previewImage, setPreviewImage] = useState(null);

    const inputFileRef = useRef(null);
    const handleCameraBtnClick = () => {
        inputFileRef.current.click();
    }
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (e) => {
            const imageDataURL = e.target.result;
            setPreviewImage(imageDataURL);
        };
    
        reader.readAsDataURL(file);
    };

    //이미지 존재 여부 검사
    const [isImage, checkIsImage] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    return (
        
        <div className="layout">
        {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
            <IsImage/>
        </Modal>     */}
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
                        
                        <article className="writing">
                            <textarea className="writingInput"
                                rows={1}
                                ref={textarea}
                                name="content"                                
                                value={content}
                                placeholder="자유롭게 덕질 일상을 기록해요 ( ⸝•ᴗ•⸝)"
                                onInput={handleResizeHeight}
                                onChange={(e) => setContent(e.target.value)}
                                />

                            <div className="img-upload-box">
                                {previewImage && (
                                    <div className="img-upload-preview" >
                                        <div><img src={process.env.PUBLIC_URL + "/img/writing/close.png"}></img></div>
                                        <img src={previewImage} alt="미리보기" style={{ maxWidth: '300px' }} />
                                    </div>
                                )}
                                {previewImage && (
                                    <div className="img-upload-preview" >
                                        <div><img src={process.env.PUBLIC_URL + "/img/writing/close.png"}></img></div>
                                        <img src={previewImage} alt="미리보기" style={{ maxWidth: '300px' }} />
                                    </div>
                                )}
                                {previewImage && (
                                    <div className="img-upload-preview" >
                                        <div><img src={process.env.PUBLIC_URL + "/img/writing/close.png"}></img></div>
                                        <img src={previewImage} alt="미리보기" style={{ maxWidth: '300px' }} />
                                    </div>
                                )}
                                {previewImage && (
                                    <div className="img-upload-preview" >
                                        <div><img src={process.env.PUBLIC_URL + "/img/writing/close.png"}></img></div>
                                        <img src={previewImage} alt="미리보기" style={{ maxWidth: '300px' }} />
                                    </div>
                                )}
                            </div>
                            
                            
                        </article>
                        
                    </form>

                </div>
                
            </div>
            <div className="toolBar">
                <div className="camera" onClick={handleCameraBtnClick}>
                    <img src={process.env.PUBLIC_URL + "/img/writing/camera.png"}/>
                </div>
                <input
                    ref={inputFileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
            </div>
            {/* 고정 푸터 */}
            <Footer/>    
        </div>
        
    )
}
export default Post