import { useEffect, useRef, useState } from "react";

import { DynamicIcon } from "@/components/Icon";
import Avatar from "@/components/Avatar";
import Footer from "@/components/layout/Footer";
import PostMetadataBar from "@/components/PostMetadataBar";

import { useNavigate } from "react-router-dom";

import * as styles from "./page.css";
import { overlays } from "@/utils/overlays";
import BaseModal from "@/components/modal/BaseModal";
import axios from "axios";

const PAGE_SIZE = 5;
export default function LookPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastSize, setLastSize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<"최신" | "인기">("최신");
  const contentElemRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: "최신" | "인기") => () => {
    setCurrentTab(tab);
    setLastSize(1);
    contentElemRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    fetchPosts(1, tab == "최신" ? "time" : "likes");
  };

  const fetchPosts = async (size: number, sortBy: string) => {
    setLoading(true);
    const results = await Promise.allSettled(
      Array.from({ length: size }, (_, i) =>
        axios.get(`/api/posts/?sortBy=${sortBy}&limit=${PAGE_SIZE}&start=${i * PAGE_SIZE}`)
      )
    );
    setPosts(results.flatMap((result) => (result.status === "fulfilled" ? result.value.data : [])));
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(1, currentTab == "최신" ? "time" : "likes");
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      if (!contentElemRef.current || loading || lastSize * PAGE_SIZE > posts.length) return;
      const isEnd =
        contentElemRef.current.scrollTop + contentElemRef.current.offsetHeight * 2 >=
        contentElemRef.current.scrollHeight;

      if (isEnd) {
        fetchPosts(lastSize + 1, currentTab == "최신" ? "time" : "likes");
        setLastSize((p) => p + 1);
      }
    };
    contentElemRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      contentElemRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [loading, posts, currentTab, lastSize]);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.tab} onClick={handleTabChange("인기")} aria-selected={currentTab === "인기"}>
          <DynamicIcon id="popular" size="medium" />
          <p className={styles.tabText}>인기</p>
        </div>
        <div className={styles.tab} onClick={handleTabChange("최신")} aria-selected={currentTab === "최신"}>
          <DynamicIcon id="new" size="medium" />
          <p className={styles.tabText}>최신</p>
        </div>
      </header>
      <div className={styles.content} ref={contentElemRef}>
        {posts?.map((post) => (
          <PostCard post={post} key={post.postID} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const handleImageClick = (postImage: string) => {
    overlays.open(({ overlayId }) => (
      <BaseModal overlayId={overlayId} className={styles.imageZoomIn}>
        <img src={postImage} style={{ minHeight: "80vh", objectFit: "contain" }} />
      </BaseModal>
    ));
  };

  const handlePostClick = (postID: string) => () => {
    navigate(`/postview/${postID}`);
  };

  return (
    <div className={styles.postBox} key={post.postID}>
      <div className={styles.postProfile}>
        <Avatar userId={post.writerID} />
        <div className={styles.date}>{post.date}</div>
      </div>

      <div className={styles.postImgContainer} onClick={() => handleImageClick(post.postImg[0])}>
        <img className={styles.postImg} src={post.postImg[0]} />
      </div>
      <div className={styles.metadataContainer}>
        <PostMetadataBar
          liked={post.likes.includes(localStorage.getItem("id") || "")}
          defLikes={post.likes.length}
          commentCount={post.commentCount}
          postID={post.postID}
        />
      </div>

      <p className={styles.postContent} onClick={handlePostClick(post.postID)}>
        {post.body}
      </p>
    </div>
  );
}
