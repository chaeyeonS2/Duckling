import { style } from "@vanilla-extract/css";

export const header = style({
  backgroundColor: "white",
  display: "flex",
});

export const tab = style({
  flex: 1,
  padding: "14px 0",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  paddingLeft: "15%",
  borderBottom: "5px solid #b5b5b5",
  color: "#B5B5B5",
  selectors: {
    "&[aria-selected=true]": {
      borderBottom: "5px solid black",
      color: "black",
    },
  },
});

export const tabText = style({
  fontSize: "22px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "100%",
  marginLeft: "5px",
});

export const layout = style({
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const content = style({
  padding: "22px 20px",
  overflowY: "auto",
  overflowX: "hidden",
});

export const postBox = style({
  marginBottom: "24px",
  width: "90vw",
  height: "auto",
  boxShadow: "2px 2px",
});

export const postProfile = style({
  width: "100%",
  height: "30px",
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

export const postContent = style({
  width: "100%",
  height: "fit-content",
  padding: "5px 10px",
  color: "#fff",
  backgroundColor: "black",

  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",

  display: "-webkit-box",
  textOverflow: "ellipsis",
  wordWrap: "break-word",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
});

export const postImgContainer = style({
  width: "90vw",
  height: "80vw",
  marginTop: "11px",
  border: "1px solid #000",
});

export const postImg = style({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

export const metadataContainer = style({
  backgroundColor: "white",
  color: "black",
});

export const profileImg = style({
  float: "left",
  width: "30px",
  height: "30px",
  borderRadius: "100%",
});
