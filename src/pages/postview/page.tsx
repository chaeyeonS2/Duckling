import HeaderPostView from "@/components/layout/headers/HeaderPostView";
import ImageSlider from "./_components/ImageSlider";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/Icon";

import { useNavigate, useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import * as styles from "./page.css";

export default function PostViewPage() {
  const { writerID, postID } = useParams();
  const { data: postData } = useSWRImmutable<APIPostResponse>(`/api/posts/writer/${writerID}/${postID}`);

  const navigate = useNavigate();
  const commentClick = () => {
    navigate("/comment", { state: { postID } });
  };

  return (
    <div className={styles.layout}>
      <HeaderPostView />
      <div className={styles.container}>
        <div className={styles.postHeader}>
          <div>
            <p className={styles.title}>{postData?.title}</p>
            <p className={styles.timestemp}>{postData?.date}</p>
          </div>
          <Icon id="vertical-dots" size="medium" />
        </div>
        <ImageSlider images={postData?.postImg ?? []} />
        <p className={styles.content}>{postData?.body}</p>
        <div className={styles.metadataContainer}>
          <div className={styles.metadata}>
            <Icon id="cookie" size="medium" />
            <span>{postData?.likes}</span>
          </div>
          <div onClick={commentClick} className={styles.metadata}>
            <Icon id="comment" size="medium" />
            <span>{postData?.commentCount}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
