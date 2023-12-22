import { globalStyle } from "@vanilla-extract/css";

globalStyle(".content", {
  position: "absolute",
  paddingTop: "40px",
  height: "90vh",
  paddingBottom: "88px",
});

globalStyle("html, body, #root", {
  overflow: "hidden",
  width: "100%",
  height: "100%",
});

globalStyle("*", {
  all: "revert",
  fontFamily: "Pretendard",
  boxSizing: "border-box",
});

globalStyle("*::-webkit-scrollbar", { width: "14px" });
globalStyle("*::-webkit-scrollbar-thumb", {
  backgroundColor: "#2828284D",
  backgroundClip: "padding-box",
  border: "4px solid rgba(0, 0, 0, 0)",
  borderTopWidth: "14px",
  borderBottomWidth: "14px",
});
