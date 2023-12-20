import HeaderPostView from "@/components/layout/headers/HeaderPostView";
import ImageSlider from "./_components/ImageSlider";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/Icon";

import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import * as styles from "./page.css";
import PostMetadataBar from "@/components/PostMetadataBar";

export default function PostViewPage() {
  const { writerID, postID } = useParams();
  const { data: postData } = useSWRImmutable(`/api/posts/writer/${writerID}/${postID}`);

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
        <div>
          <ImageSlider images={postData?.postImg ?? []} className={styles.imageSlider} />
          <p className={styles.content}>{postData?.body}</p>
        </div>
        <div className={styles.metadataContainer}>{postData && <PostMetadataBar postData={postData} />}</div>
      </div>
      <Footer />
    </div>
  );
}
