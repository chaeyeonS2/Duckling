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
});
