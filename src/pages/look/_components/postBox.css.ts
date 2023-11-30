import { style } from "@vanilla-extract/css";

export const postBox = style({
  width: "90vw",
  height: "auto",
  margin: "5vw",
});

export const postImgBack = style({
  position: "relative",
});

export const postImgLayout = style({
  width: "100%",
  height: "87vw",
});

export const postProfile = style({
  width: "100%",
  height: "30px",
});

export const back = style({
  width: "87vw",
  height: "80vw",
  backgroundColor: "#000000",
  marginTop: "10px",
  position: "absolute",
  right: "0",
  border: "1px solid #000",
});

export const date = style({
  float: "right",
  display: "flex",
  alignItems: "center",
  width: "auto",
  height: "30px",
  marginRight: "10px",
  fontSize: "18px",
  color: "#b8b8b8",
});

export const postContentContainer = style({
  backgroundColor: "black",
  width: "100%",
  height: "100px",
});

export const postContent = style({
  width: "augo",
  height: "auto",
  color: "#fff",

  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",
  padding: "10px",
});

export const postImgContainer = style({
  width: "90vw",
  height: "80vw",
  backgroundColor: "#a91212",
  marginTop: "18px",
  position: "absolute",
  border: "1px solid #000",
});

export const postImg = style({
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  objectFit: "contain",
});

export const postInfo2 = style({
  width: "100%",
  height: "30px",
  display: "flex",
  color: "black",
});

export const postInfoText = style({
  color: "#000",
  textAlign: "center",
  fontFamily: "IBM Plex Mono",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "22px",
  letterSpacing: "-0.408px",
  marginLeft: "5px",
  marginRight: "10px",
});

export const profileImg = style({
  float: "left",
  width: "30px",
  height: "30px",
  borderRadius: "100%",
  backgroundSize: "cover",
});

export const userName = style({
  float: "left",
  display: "flex",
  alignItems: "center",
  width: "auto",
  height: "30px",
  fontSize: "18px",
  marginLeft: "10px",
});
