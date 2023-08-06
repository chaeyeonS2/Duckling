import Footer from '../../footer';
import "../../css/layout.css";
import "../../css/postView.css"
import HeaderPostView from "../../headers/headerPostView";
import React, { useState, useRef } from "react";
import CommentView from "./commetView";

const PostView = () => {
    const textarea = useRef(null);

    return (
        <div className="layout">
            {/* 고정 헤더 */}
            <HeaderPostView/>
            <div className="content">
            <div className="marignBox">    
                    <form className="post" >
                        <div className="title">
                            <p className='text_title text'>받아온 제목</p>
                        </div>
                        
                        <div className="writing">
                            <p className="text_content text">
                                받아온 글
                            </p>    
                        </div>
                        
                    </form>

                </div>
                
            </div>
            <CommentView/>

            {/* 고정 푸터 */}
            <Footer/>
        </div>
    )
}

export default PostView