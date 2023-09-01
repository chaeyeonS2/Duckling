import Header from "./headers/header";
import Footer from "./footer";
import "./css/layout.css";
import React, { useState, useRef } from "react";

const Layout = () => {
  return (
    <div className="layout">
      {/* 고정 헤더 */}
      <Header />
      <div className="content">{/* 페이지 내용 */}</div>
      {/* 고정 푸터 */}
      <Footer />
    </div>
  );
};

export default Layout;
