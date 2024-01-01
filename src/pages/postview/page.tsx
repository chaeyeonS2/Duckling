import HeaderPostView from "@/components/layout/headers/HeaderPostView";
import Footer from "@/components/layout/Footer";

import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import * as styles from "./page.css";
import PostMetadataBar from "@/components/PostMetadataBar";
import Slider from "react-slick";
import Avatar from "@/components/Avatar";

export default function PostViewPage() {
  const { postID } = useParams();
  const { data: postData } = useSWRImmutable(`/api/posts/${postID}`);

  return (
    <div className={styles.layout}>
      <HeaderPostView />
      <div className={styles.container}>
        <div className={styles.postHeader}>
          {postData && <Avatar userId={postData.writerID} />}
          <p className={styles.title}>{postData?.title}</p>
          <p className={styles.timestemp}>{postData?.date}</p>
        </div>
        <div>
          <Slider dots variableWidth arrows={false} infinite={false}>
            {postData?.postImg.map((image, index) => (
              <img className={styles.postImgBig} src={image} alt={`Slide ${index}`} key={index} />
            ))}
          </Slider>
          <p className={styles.content}>{postData?.body}</p>
        </div>
      </div>
      <div className={styles.metadataContainer}>{postData && <PostMetadataBar postData={postData} />}</div>
      <Footer />
    </div>
  );
}
