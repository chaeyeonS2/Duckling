import { BrowserRouter, Routes, Route } from "react-router-dom";
import AvatarDeco from "@/pages/avatar/AvatarDeco";
import Post from "@/pages/writing/Post";
import Home from "@/pages/home/Home";
import PostView from "@/pages/writing/PostView";
import Login from "@/pages/Login";
import Look from "@/pages/looking/Look";
import CommentPage from "@/pages/writing/CommentPage";
import Start from "@/pages/Start";
import XrealLogin from "@/pages/XrealLogin";
import Camera from "@/pages/Camera";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* start loading */}
        <Route path="/" element={<Start />} />
        {/* HOME */}
        <Route path="/home" element={<Home />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* <POST VIEW /> */}
        <Route path="/postview/:writerID/:postID" element={<PostView />} />
        {/* <아바타 꾸미기/> */}
        <Route path="/deco" element={<AvatarDeco />} />
        {/* <새글쓰기/> */}
        <Route path="/newPost" element={<Post />} />
        {/* <둘러보기/> */}
        <Route path="/look" element={<Look />} />
        {/* <댓글창/> */}
        <Route path="/comment" element={<CommentPage />} />
        {/* xmc용 로그인 */}
        <Route path="/xmc" element={<XrealLogin />} />
        {/* ar camera */}
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  );
}
