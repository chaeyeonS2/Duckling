import { style } from "@vanilla-extract/css";

export const deco = style({
  width: "100%",
  height: "50%",
  bottom: "0px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  position: "absolute",
  overflow: "auto",
  paddingTop: "18px",
  textAlign: "center",
});

export const itemBox = style({
  display: "inline-block",
  width: "90%",
  height: "90%",
  border: "1px solid black",
  backgroundColor: "rgb(0, 0, 0, 0.7)",
  objectFit: "contain",
  marginRight: "5px",
  marginLeft: "5px",
});

export const itemBoxClick = style({
  display: "inline-block",
  width: "90%",
  height: "90%",
  backgroundColor: "rgb(0, 0, 0, 0.7)",
  objectFit: "contain",
  marginRight: "5px",
  marginLeft: "5px",
  border: "2px solid #bdff6b",
  boxShadow: "3px 3px",
});

export const itemBoxDiv = style({
  display: "grid",
  gridGap: "10px",
  gridTemplateColumns: "repeat(3, minmax(auto, 1fr))",
  alignItems: "center",
  justifyContent: "space-around",
  padding: "10px",
  paddingBottom: "40px",
  justifyItems: "center",
});

export const itemImg = style({ maxWidth: "100%", maxHeight: "100%" });

export const buttonGroup = style({
  width: "100%",
  height: "30px",
  paddingBottom: "5px",
});

export const nonSelectbtn = style({
  float: "left",
  marginLeft: "15px",
  width: "fit-content",
  paddingLeft: "10px",
  paddingRight: "10px",
  height: "100%",
  border: "1px solid #000",
  background: "#fff",
  textAlign: "center",
  lineHeight: "30px",
});

export const selectBtn = style({
  float: "left",
  marginLeft: "15px",
  width: "fit-content",
  paddingLeft: "10px",
  paddingRight: "10px",
  height: "100%",
  border: "1px solid #000",
  background: "#bdff6b",
  boxShadow: "2px 2px",
  textAlign: "center",
  lineHeight: "30px",
});

export const faceBtnGroup = style({
  width: "100%",
  height: "30px",
  paddingBottom: "5px",
});
