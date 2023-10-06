import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import "./css/style.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Layout from "./Layout";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import AvatarDeco from "./pages/avatar/AvatarDeco";
import Post from "./pages/writing/post";
import Home from "./pages/home/Home";
import PostView from "./pages/writing/postView";
import Login from "./pages/Login";
import IsImage from "./alert/IsImage";
import Uploading from "./alert/Uploading";
import Delete from "./alert/Delete";
import PostShare from "./alert/PostShare";
import Look from "./pages/looking/Look";
import CommentPage from "./pages/writing/commentPage";
// import CommentView from "./pages/writing/commetView";
import Start from "./pages/Start";
import Tmp from "./pages/Tmp";
import XrealLogin from "./pages/XrealLogin";
import Camera from "./pages/Camera";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    // <BrowserRouter>
    //     <PostView/>

    // </BrowserRouter>

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
        {/* <test/> */}
        <Route path="/test" element={<Tmp />} />
        {/* xmc용 로그인 */}
        <Route path="/xmc" element={<XrealLogin />} />
        {/* ar camera */}
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </BrowserRouter>

    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path="/header">
    //       <Header />
    //     </Route>
    //     <Route exact path="/pages/avatarDeco">
    //       <avatarDeco />
    //     </Route>
    //   </Routes>

    // </BrowserRouter>
  );
}

export default App;
