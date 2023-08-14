import Footer from '../../footer';
import "../../css/layout.css";
import styles from "../../css/postView.module.css"
import HeaderPostView from "../../headers/headerPostView";
import React, { useState, useRef } from "react";
import CommentView from "./commetView";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { register } from 'swiper/element/bundle';
import EmblaCarousel from './Carousel';
import ReactDOM from 'react-dom/client'
import { useNavigate } from 'react-router-dom';


// const StyledSlider = styled(Slider)`
//     .slick-dots
//     {
//         bottom: 10px;
//     }
// }`;

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
    const images = [
        process.env.PUBLIC_URL + "/img/writing/example.jpeg",
        process.env.PUBLIC_URL + "/img/writing/cat2.png",
        // <img className='postImg' src={process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/>,
        // <img className='postImg' src={process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/>,
        // // ... 추가 이미지 경로들
      ];

    const textarea = useRef(null);

    return (
        <div >
            {/* 고정 헤더 */}
            <HeaderPostView/>
            <div className={styles.content}>
            <div className={styles.marignBox}>    
                    <form className={styles.post} >
                        <div className={styles.title}>
                            <p className={styles.text}>받아온 제목</p>
                        </div>
                        
                        <div className={styles.writinggetBox}>
                        
                            <ImageSlider images={images} /> 
                            {/* <img className='postImg' src=process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/> */}
                            
                            <p className={styles.text_content}>
                            I'm super shy, super shy
But wait a minute while I make you mine make you mine
떨리는 지금도 you're on my mind all the time
I wanna tell you but I'm super shy, super shy
I'm super shy, super shy
But wait a minute while I make you mine make you mine
떨리는 지금도 you're on my mind all the time
I wanna tell you but I'm super shy, super shy
And I wanna go out with you, where you wanna go? (Huh?)
Find a lil' spot, just sit and talk
Looking pretty, follow me, 우리 둘이 나란히
보이지? 내 눈이 갑자기 빛나지 when you say I'm your dream
You don't even know my name, do you?
You don't even know my name, do you?
누구보다도
I'm super shy, super shy
But wait a minute while I make you mine make you mine
떨리는 지금도 you're on my mind all the time
I wanna tell you but I'm super shy, super shy
I'm super shy, super shy
But wait a minute while I make you mine, make you mine
떨리는 지금도 you're on my mind all the time
I wanna tell you but I'm super shy, super shy
나 원래 말도 잘하고 그런데 왜 이런지?
I don't like that
Something odd about you, yeah, you're special and you know it
You're the top, babe
I'm super shy, super shy
But wait a minute while I make you mine make you mine
떨리는 지금도 you're on my mind all the time
I wanna tell you but I'm super shy, super shy
I'm super shy, super shy
But wait a minute while I make you mine make you mine
떨리는 지금도 you're on my mind all the time
I wanna tell you but I'm super shy, super shy
You don't even know my name, do you?
You don't even know my name, do you?
누구보다도
You don't even know my name (super shy, super shy)
Do you? (Make you mine, make you mine)
You don't even know my name (you're on my mind all the time, I wanna tell you)
Do you? (But I'm super shy, I'm super shy)
                            </p>    
                        </div>
                        
                    </form>

                </div>
                
            </div>
            <div className={styles.bottomBar}>
            <div className={styles.leftBtnGroup}>
                <div className={styles.candy}>
                    <div><img src={process.env.PUBLIC_URL + "/img/writing/cookie.png"}/></div>
                    <div className={styles.num}>215</div>
                </div>
                <div className={styles.comment} onClick={commentClick}>
                    <div ><img src={process.env.PUBLIC_URL + "/img/writing/comment.png"}/></div>
                    <div className={styles.num}>423</div>
                </div>
            </div>
          </div>
            {/* <CommentView/> */}

            {/* 고정 푸터 */}
            <Footer/>
        </div>
    )
}
 
export default PostView