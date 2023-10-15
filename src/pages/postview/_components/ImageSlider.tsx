import Slider from "react-slick";
import * as styles from "./imageSlider.css";

export interface ImageSliderProps {
  images: string[];
}
export default function ImageSlider({ images }: ImageSliderProps) {
  return (
    <div>
      <Slider speed={500} slidesToShow={1} slidesToScroll={1} dots arrows={false} infinite={false}>
        {images.map((image, index) => (
          <div className={styles.slidercontainer} key={index}>
            <img className={styles.postImgBig} src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
