// import Header from './headers/header';
import Footer from '../../footer';
import "../../css/layout.css";
import React, { useState, useRef } from "react";
import PostBox from './postBox';
import "../../css/lookiing/look.css";

const Look = () => {
    return (
        <div className="layout">
            {/* 고정 헤더 */}
            {/* <Header/> */}
            <div className="content lookLayout">
                {/* 페이지 내용 */}
                <PostBox/>
                <PostBox/>
                <PostBox/>
            </div>
            {/* 고정 푸터 */}
            <Footer/>
        </div>
    )
}

export default Look