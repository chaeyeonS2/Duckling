import { style } from "@vanilla-extract/css";

export const layoutDeco = style({
  paddingTop: "30px",
  minHeight: "90vh",
  position: "relative",
  width: "100%",
});

export const avatarDeco = style({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  backgroundColor: "rgb(255, 255, 255)",
  backgroundImage: "url(/img/home/backgroundexport const png)",
});

export const chooseBtnGroup = style({
  border: "1px solid black",
  position: "absolute",
  padding: "5px",
  bottom: "53%",
  marginLeft: "5%",
});

export const btnFace = style({
  width: "36px",
  height: "36px",
  backgroundColor: "rgb(0, 0, 0)",
  display: "flex",
  marginBottom: "5px",
});

export const btnCloth = style({
  width: "36px",
  height: "36px",
  display: "flex",
  backgroundColor: "rgb(0, 0, 0)",
});

export const saveAvatar = style({
  width: "auto",
  height: "auto",
  position: "absolute",
  padding: "15px",
  bottom: "44%",
  right: "0",
});
