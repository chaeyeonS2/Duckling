import Footer from '../../footer';
import "../../css/layout.css";
import styles from "../../css/postView.module.css"
import HeaderPostView from "../../headers/headerPostView";
import React, { useState, useRef, useEffect } from "react";
import CommentView from "./commetView";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { register } from 'swiper/element/bundle';

import { useNavigate } from 'react-router-dom';
import Delete from "../../alert/delete";
import PostShare from "../../alert/postShare";
import Modal from '../../alert/modal';
import axios from 'axios';

function ImageSlider({ images }) {
    const settings = {
      dots: true,
      infinite: false,  //양쪽 끝에서 멈추기
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
        <div >
          <Slider {...settings} className={styles.imgslider}>
            {images.map((image, index) => (
              <div className={styles.slidercontainer} key={index}>
                <img className={styles.postImg_big} src={image} alt={`Slide ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      );
    }

const PostView = () => {
  const navigate = useNavigate();
  const commentClick = () =>{
    navigate("/comment");
  }

    var images = [];
    // = [
    //     process.env.PUBLIC_URL + "/img/writing/example.jpeg",
    //     process.env.PUBLIC_URL + "/img/writing/cat2.png",
    //     // <img className='postImg' src={process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/>,
    //     // <img className='postImg' src={process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/>,
    //     // // ... 추가 이미지 경로들
    //   ];

    const textarea = useRef(null);

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

    const deleteClick=()=>{
      openModal(<Delete onClose={closeModal}/>);
    }

    const shareClick=()=>{
      openModal(<PostShare onClose={closeModal}/>);
    }
    const [postData, setData] = useState(null);
    const [likeData, setLikeData] = useState(null);

    const like = -1;
    const writerID = 'cherry';
    const postID = '10213243-5465-4687-98a9-bacbdcedfe0f';


    useEffect(() => {
      const getPost = async () => {
        try {
          const response = await axios.get("https://us-central1-netural-app.cloudfunctions.net/api/posts/writer/cherry/10213243-5465-4687-98a9-bacbdcedfe0f");
          setData(response.data);
          images = postData.postImg;
          like = postData.likes;
        } catch(e) {
          console.error(e);
        }
      }
      getPost();
    }, []);

    return (
        <div >
            {/* 고정 헤더 */}
            <HeaderPostView
              deleteClick={deleteClick}
              shareClick={shareClick}
            />
            {/* 모달 */}
            <Modal isOpen={modalIsOpen} >
                {modalContent}
            </Modal>
            {postData && 
              <div className={styles.content}>
              <div className={styles.marignBox}>    
                      <form className={styles.post} >
                          <div className={styles.title}>
                              <p className={styles.text}>{postData.title}</p>
                          </div>
                          
                          <div className={styles.writinggetBox}>
                          
                              <ImageSlider images={postData.postImg} /> 
                              {/* <img className='postImg' src=process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/> */}
                              
                              <p className={styles.text_content}>
                                {postData.body}
                              </p>    
                          </div>
                          
                      </form>

                  </div>
                  
              </div>
            }
            
            <div className={styles.bottomBar}>
            <div className={styles.leftBtnGroup}>
                <div className={styles.candy}>
                    <div><img src={process.env.PUBLIC_URL + "/img/writing/cookie.png"}/></div>
                    <div className={styles.num}>{like}</div>
                </div>
                <div className={styles.comment} onClick={commentClick}>
                    <div ><img src={process.env.PUBLIC_URL + "/img/writing/comment.png"}/></div>
                    <div className={styles.num}>423</div>
                </div>
            </div>
          </div>
            {/* <CommentView/> */}

            {/* 고정 푸터 user 값에 따라 수정해야함*/}
            <Footer btn = {0}/>
        </div>
    )
}
 
export default PostView