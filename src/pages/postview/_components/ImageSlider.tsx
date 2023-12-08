import Slider from "react-slick";
import * as styles from "./imageSlider.css";

export interface ImageSliderProps extends React.ComponentProps<typeof Slider> {
  images: string[];
}
export default function ImageSlider({ images, ...props }: ImageSliderProps) {
  return (
    <Slider speed={500} slidesToShow={1} slidesToScroll={1} dots arrows={false} infinite={false} {...props}>
      {images.map((image, index) => (
        <div className={styles.slidercontainer} key={index}>
          <img className={styles.postImgBig} src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </Slider>
  );
}
