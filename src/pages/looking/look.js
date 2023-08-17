// import Header from './headers/header';
import Footer from '../../footer';
import "../../css/layout.css";
import React, { useState, useRef } from "react";
import PostBox from './postBox';
import HeaderLook from "../../headers/headerLook";


const Look = () => {
    //뭘 해야하지......... 받아올 포스트 개수만큼?
    //일단 10개 해서 또 10개 요청하는 식으로?

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