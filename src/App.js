import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import "./css/style.css";
import {OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Layout from './layout';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import AvatarDeco from './pages/avatar/avatarDeco';
import Post from "./pages/writing/post";
import Home from "./pages/home";
import PostView from "./pages/writing/postView";
import Login from "./pages/login";
import IsImage from "./alert/isImage";
import Uploading from "./alert/uploading";
import Delete from "./alert/delete";
import PostShare from "./alert/postShare";
import Look from "./pages/looking/look";
import CommentPage from "./pages/writing/commentPage";
import CommentView from "./pages/writing/commetView";

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
    {/* HOME */}
    <Route path="/" element={<Home />} />
    {/* <POST VIEW /> */}
    <Route path="/postview" element={<PostView />} />
    {/* <아바타 꾸미기/> */}
    <Route path="/deco" element={<AvatarDeco />} />
    {/* <새글쓰기/> */}
    <Route path="/newPost" element={<Post />} />
    {/* <둘러보기/> */}
    <Route path="/look" element={<Look />} />
    {/* <댓글창/> */}
    <Route path="/comment" element={<CommentPage/>} />


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

