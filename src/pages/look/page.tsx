import Footer from "@/components/layout/Footer";
import PostMetadataBar from "@/components/PostMetadataBar";
import HeaderLook from "@/components/layout/headers/HeaderLook";

import useSWRInfinite from "swr/infinite";
import useSWRImmutable from "swr/immutable";
import { useNavigate } from "react-router-dom";

import * as styles from "./page.css";
import { useEffect, useRef } from "react";

const PAGE_SIZE = 5;
export default function LookPage() {
  const navigate = useNavigate();
  const { data, size, setSize, isValidating, isLoading } = useSWRInfinite<APIPostsResponse>(
    (index) => `/api/posts/?limit=${PAGE_SIZE}&start=${index * PAGE_SIZE}`
  );

  const handlePostClick = (userName: string, postID: string) => () => {
    navigate(`/postview/${userName}/${postID}`);
  };

  const posts = data ? Array.from(data).flat() : [];
  const isLoadingMore = isLoading || (size > 0 && data && !data[size - 1]);
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;
  const contentElemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!contentElemRef.current) return;
      const isEnd =
        contentElemRef.current.scrollTop + contentElemRef.current.offsetHeight == contentElemRef.current.scrollHeight;
      if (isEnd) {
        setSize((prev) => prev + 1);
      }
    };
    contentElemRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      contentElemRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <HeaderLook />
      <div className={styles.content} ref={contentElemRef}>
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
