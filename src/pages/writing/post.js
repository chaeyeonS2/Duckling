import "../../css/post.css";
import "../../css/layout.css";
import Footer from "../../footer";
import HeaderPost from "../../headers/headerPost";
import React, { useState, Suspense, useRef, useEffect } from "react";
import Modal from '../../alert/modal';
import Uploading from "../../alert/uploading";
import IsImage from "../../alert/isImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as PostView from "./postView";

const userID = localStorage.getItem("id");
const userName = localStorage.getItem("userName");

const Post = propos => {
    const navigate = useNavigate();

    const goPost = (writerid, postid) => {
        //props.closeModal();
        PostView.getInfo(writerid, postid);
        navigate("/postView");
    }

    const handleUpload = async () => {
        console.log(previewImages);
        try{

        
       
        openModal(<Uploading />);
        const response = await axios.post(
          "https://us-central1-netural-app.cloudfunctions.net/api/posts",
          {
            "title": title,
            "body": content,
            "postImg": previewImages,
            "writerID": userName,
            "userID" : userID
            }
        );
        closeModal(<Uploading />);    
        console.log("Document uploaded:", response.data.postID, response.data.writerID);

        PostView.getInfo(response.data.postID, response.data.writerID);

                navigate(`/postView/${response.data.writerID}/${response.data.postID}`);

    }
        catch (error) {
        console.error("Error uploading document:", error);
        closeModal(<Uploading />);
      }
}
      
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

    const [previewImages, setPreviewImages] = useState([]); //이미지 주소들 저장하는 배열
    
const handleImageUpload = (event) => {
    const files = event.target.files;

    const processImages = async () => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let imageDataURL = await readFileAsDataURL(file);
            setPreviewImages(prevImages => [...prevImages, imageDataURL]);
            
            console.log(file);
        }
        };

        processImages();
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (event) => {
                reject(event.error);
            };
            reader.readAsDataURL(file);
        });
    };
    const handleRemoveImage = (index) => {
        const newPreviewImages = [...previewImages];
        newPreviewImages.splice(index, 1);
        setPreviewImages(newPreviewImages);
    };

    const inputFileRef = useRef(null);
    const handleCameraBtnClick = () => {
        inputFileRef.current.click();
    }

    //modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
  
    const openModal = (content) => {
      setModalContent(content);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalContent(null);
      setModalIsOpen(false);
    };
  
    const formRef = useRef(null);

    const uploadClick = () => {
        if(previewImages.length === 0){
            //올라간 이미지가 없으면 업로드 불가 모달 띄우기
            openModal(<IsImage onClose={closeModal}/>);
            console.log("uploadClick");
        }
        //올라간 이미지가 있으면 업로드 시작
        else{
            //폼 제출
            const emptyEvent = new Event('submit');
            handleSubmit(emptyEvent);
            //서버에 업로드
            handleUpload();
            
            console.log("imgae ok")
        }
      };
    
      //지금은 그냥 뒤로가기, 나중에 '정말 취소하시겠어요?' 모달 추가 시 사용 예정
    //   const closeClick = () => {
    //     openModal(<Delete />)
    //   };

    return (
        
        <div className="layout">
            {/* 고정 헤더 */}
            <HeaderPost
                uploadClick = {uploadClick}
                //closeClick = {closeClick}
            />
            {/* 모달 */}
            <Modal isOpen={modalIsOpen} >
                {modalContent}
            </Modal>
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
                            {previewImages.map((image, index) => (
                                <div className="img-upload-preview" key={index} style={{ width: '28vw' }}>
                                    <div className="removeIMG" onClick={()=>handleRemoveImage(index)}><img src={process.env.PUBLIC_URL + "/img/writing/close.png"}></img></div>
                                    <img src={image} alt={`미리보기 ${index}`} />
                                </div>
                            ))}
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
                    multiple onChange={handleImageUpload}
                />
            </div>
            {/* 고정 푸터 */}
            <Footer btn = {1}/>    
        </div>
        
    )
}
export default Post