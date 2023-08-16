// import Header from './headers/header';
import Footer from '../../footer';
import "../../css/layout.css";
import React, { useState, useRef } from "react";
import PostBox from './postBox';
import HeaderLook from "../../headers/headerLook";


const Look = () => {

    const layoutStyle = {
        position: 'absolute',
        paddingTop: '70px',
        /* width: 100%; */
        height: '80vh',
        paddingBottom: '88px',
        overflow: 'auto',
    }
    return (
        <div className="layout">
            {/* 고정 헤더 */}
            <HeaderLook/>
            <div className="content lookLayout" style={layoutStyle}>
                {/* 페이지 내용 */}
                <PostBox/>
                <PostBox/>
                <PostBox/>
            </div>
            {/* 고정 푸터 */}
            <Footer btn = {0}/>
        </div>
    )
}

export default Look