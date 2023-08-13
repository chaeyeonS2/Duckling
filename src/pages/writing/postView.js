import Footer from '../../footer';
import "../../css/layout.css";
import "../../css/postView.css"
import HeaderPostView from "../../headers/headerPostView";
import React, { useState, useRef } from "react";
import CommentView from "./commetView";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
        <div >
          <Slider {...settings}>
            {images.map((image, index) => (
              <div className="slider-container" key={index}>
                <img className='postImg_big' src={image} alt={`Slide ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      );
    }

const PostView = () => {
    const images = [
         process.env.PUBLIC_URL + "/img/writing/example.jpeg",
        // process.env.PUBLIC_URL + "/img/writing/cat2.png",
        //process.env.PUBLIC_URL + "/img/writing/cat2.png",
        // <img className='postImg' src={process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/>,
        // <img className='postImg' src={process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/>,
        // // ... 추가 이미지 경로들
      ];

    const textarea = useRef(null);

    return (
        <div >
            {/* 고정 헤더 */}
            <HeaderPostView/>
            <div className="content">
            <div className="marignBox">    
                    <form className="post" >
                        <div className="title">
                            <p className='text_title text'>받아온 제목</p>
                        </div>
                        
                        <div className="writing-getBox">
                            <ImageSlider className='imgslider' images={images} /> 
                            {/* <img className='postImg' src={process.env.PUBLIC_URL + "/img/writing/example.jpeg"}/> */}
                            <p className="text_content text">
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