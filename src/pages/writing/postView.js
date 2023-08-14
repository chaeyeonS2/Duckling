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
                                받아온 글
                            </p>    
                        </div>
                        
                    </form>

                </div>
                
            </div>
            <CommentView/>

            {/* 고정 푸터 */}
            <Footer/>
        </div>
    )
}
 
export default PostView