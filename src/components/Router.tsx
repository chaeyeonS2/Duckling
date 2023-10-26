import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimationPage from "@/pages/animation/page";
import CommentPage from "@/pages/comment/page";
import DecoPage from "@/pages/deco/page";
import PostViewPage from "@/pages/postview/page";
import XrealLoginPage from "@/pages/xmc/page";
import NewPostPage from "@/pages/newPost/page";
import CameraPage from "@/pages/camera/page";
import LoginPage from "@/pages/login/page";
import SharePage from "@/pages/share/page";
import LookPage from "@/pages/look/page";
import HomePage from "@/pages/home/page";
import Start from "@/pages/Start";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* start loading */}
        <Route path="/" element={<Start />} />
        {/* animation */}
        <Route path="/animation" element={<AnimationPage />} />
        {/* ar camera */}
        <Route path="/camera" element={<CameraPage />} />
        {/* <댓글창/> */}
        <Route path="/comment" element={<CommentPage />} />
        {/* <공유하기 /> */}
        <Route path="/share" element={<SharePage />} />
        {/* <아바타 꾸미기/> */}
        <Route path="/deco" element={<DecoPage />} />
        {/* HOME */}
        <Route path="/home" element={<HomePage />} />
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
        {/* <둘러보기/> */}
        <Route path="/look" element={<LookPage />} />
        {/* <새글쓰기/> */}
        <Route path="/newPost" element={<NewPostPage />} />
        {/* <POST VIEW /> */}
        <Route path="/postview/:writerID/:postID" element={<PostViewPage />} />
        {/* xmc용 로그인 */}
        <Route path="/xmc" element={<XrealLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
