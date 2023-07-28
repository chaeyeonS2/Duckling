import Footer from "./footer";
import Header from "./headers/header";
import "./css/layout.css";
import React, { useState, useRef } from "react";

const Layout = () => {
    return (
        <div className="layout">
            {/* 고정 헤더 */}
            <Header/>
            <div className="content"><div className="aaa"></div>
                {/* 페이지 내용 */}
            </div>
            {/* 고정 푸터 */}
            <Footer/>
        </div>
    )
}

export default Layout