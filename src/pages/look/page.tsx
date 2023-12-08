import Footer from "@/components/layout/Footer";
import PostMetadataBar from "@/components/PostMetadataBar";
import HeaderLook from "@/components/layout/headers/HeaderLook";

import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useNavigate } from "react-router-dom";

import * as styles from "./page.css";

export default function LookPage() {
  const navigate = useNavigate();
  const { data: posts } = useSWR<APIPostsResponse>("/api/posts");

  const handlePostClick = (userName: string, postID: string) => () => {
    navigate(`/postview/${userName}/${postID}`);
  };

  return (
    <div className={styles.layout}>
      <HeaderLook />
      <div className={styles.content}>
        {posts?.map((post, index) => (
          <div className={styles.postBox} key={index} onClick={handlePostClick(post.writerID, post.postID)}>
            <div className={styles.postProfile}>
              <Avatar userId={post.userID} />
              <div className={styles.userName}>{post.writerID}</div>
              <div className={styles.date}>{post.date}</div>
            </div>

            <div className={styles.postImgContainer}>
              <img className={styles.postImg} src={post.postImg[0]} />
            </div>
            <div className={styles.metadataContainer}>{post && <PostMetadataBar postData={post} />}</div>

            <p className={styles.postContent}>{post.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

function Avatar({ userId }: { userId: string }) {
  const { data: user } = useSWRImmutable<APIUserResponse>(`/api/users/${userId}`);
  return <img className={styles.profileImg} src={user?.profileImg} />;
}
