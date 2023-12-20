import Footer from "@/components/layout/Footer";
import PostMetadataBar from "@/components/PostMetadataBar";

import useSWRInfinite from "swr/infinite";
import useSWRImmutable from "swr/immutable";
import { useNavigate } from "react-router-dom";

import * as styles from "./page.css";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

const PAGE_SIZE = 5;
export default function LookPage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<"최신" | "인기">("최신");
  const handleTabChange = (tab: "최신" | "인기") => () => {
    setCurrentTab(tab);
    setSize(1);
  };
  const { data, setSize } = useSWRInfinite(
    (index) => `/api/posts/${currentTab == "최신" ? "" : "likes/"}?limit=${PAGE_SIZE}&start=${index * PAGE_SIZE}`
  );

  const handlePostClick = (userName: string, postID: string) => () => {
    navigate(`/postview/${userName}/${postID}`);
  };

  const posts = data ? Array.from(data).flat() : [];
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
      <header className={styles.header}>
        <div className={styles.tab} onClick={handleTabChange("인기")} aria-selected={currentTab === "인기"}>
          <Icon id="finger-heart" size="medium" />
          <p className={styles.tabText}>인기</p>
        </div>
        <div className={styles.tab} onClick={handleTabChange("최신")} aria-selected={currentTab === "최신"}>
          <Icon id="finger-rock" size="medium" />
          <p className={styles.tabText}>최신</p>
        </div>
      </header>
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
  const { data: user } = useSWRImmutable(`/api/users/${userId}`);
  return <img className={styles.profileImg} src={user?.profileImg} />;
}
