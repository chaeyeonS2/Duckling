import "@/css/layout.css";
import Slider from "react-slick";
import styles from "@/css/postView.module.css";

export interface ImageSliderProps {
  images: string[];
}
export default function ImageSlider({ images }: ImageSliderProps) {
  const settings = {
    dots: true,
    infinite: false, //양쪽 끝에서 멈추기
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings} className={styles.imgslider}>
        {images.map((image, index) => (
          <div className={styles.slidercontainer} key={index}>
            <img
              className={styles.postImg_big}
              src={image}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
