import "../../css/post.css";
import Footer from "../../footer";
import HeaderPost from "../../headers/headerPost";
import React, { useState, Suspense, useRef, useEffect } from "react";

const Post = propos => {
    return(
        <div className="layoutDeco">
            <div><HeaderPost/></div>
            <div className="post">

            </div>
            <div><Footer/></div>
        </div>
    )
}
export default Post