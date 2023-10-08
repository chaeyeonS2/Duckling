import Header from "./headers/Header";
import Footer from "./Footer";
import "@/css/layout.css";

export default function Layout() {
  return (
    <div className="layout">
      {/* 고정 헤더 */}
      <Header />
      <div className="content">{/* 페이지 내용 */}</div>
      {/* 고정 푸터 */}
      <Footer />
    </div>
  );
}
