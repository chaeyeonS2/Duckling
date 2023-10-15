import Header from "./headers/Header";
import Footer from "./Footer";

// TODO: 모든 page layout를 이걸로 통일하기
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
