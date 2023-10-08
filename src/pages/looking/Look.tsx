import Footer from "../../components/layout/Footer";
import "../../css/layout.css";
import PostBox from "./PostBox";
import HeaderLook from "../../components/layout/headers/HeaderLook";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

export default function Look() {
  const navigate = useNavigate();
  const { data: posts } = useSWR<APIPostsResponse>(["/api/posts"]);

  const layoutStyle: React.CSSProperties = {
    position: "absolute",
    paddingTop: "70px",
    /* width: 100%; */
    height: "80vh",
    paddingBottom: "88px",
    overflow: "auto",
  };
  const handlePostClick = (userName: string, postID: string) => {
    navigate(`/postview/${userName}/${postID}`);
  };
  return (
    <div className="layout">
      {/* 고정 헤더 */}
      <HeaderLook />
      <div className="content lookLayout" style={layoutStyle}>
        {/* 페이지 내용 */}
        {posts &&
          posts.map((post, index) => (
            <div
              key={index}
              onClick={() => handlePostClick(post.writerID, post.postID)}
            >
              <PostBox key={index} post={post} />
            </div>
          ))}
      </div>
      {/* 고정 푸터 */}
      <Footer btn={0} />
    </div>
  );
}
