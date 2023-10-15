import Footer from "@/components/layout/Footer";

import PostBox from "./_components/PostBox";
import HeaderLook from "@/components/layout/headers/HeaderLook";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const layoutStyle: React.CSSProperties = {
  position: "absolute",
  paddingTop: "70px",
  /* width: 100%; */
  height: "80vh",
  paddingBottom: "88px",
  overflow: "auto",
};

export default function LookPage() {
  const navigate = useNavigate();
  const { data: posts } = useSWR<APIPostsResponse>("/api/posts");

  const handlePostClick = (userName: string, postID: string) => {
    navigate(`/postview/${userName}/${postID}`);
  };

  return (
    <div className="layout">
      <HeaderLook />
      <div className="content" style={layoutStyle}>
        {posts &&
          posts.map((post, index) => (
            <div key={index} onClick={() => handlePostClick(post.writerID, post.postID)}>
              <PostBox key={index} post={post} />
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
