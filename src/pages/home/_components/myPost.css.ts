import { style } from "@vanilla-extract/css";

export const profileImg = style({
  float: "left",
  width: "50px",
  height: "50px",
  borderRadius: "100%",
  backgroundColor: "#d9d9d9",
  backgroundSize: "cover",
  marginLeft: "16px",
});

export const userName = style({
  float: "left",
  display: "flex",
  alignItems: "center",
  width: "auto",
  height: "50px",
  marginLeft: "20px",
  fontSize: "22px",
});

export const btnAddNew = style({
  float: "right",
  width: "50px",
  height: "50px",
  marginRight: "16px",
});

export const btnAddNewImage = style({
  width: "40px",
  height: "40px",
  margin: "5px",
});

export const content = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
});

export const postImg = style({
  minWidth: "33vw",
  minHeight: "33vw",
  backgroundColor: "#f0f0f0",
  objectFit: "contain",
  flex: 1,
});

export const item_img = style({
  width: "100%",
  height: "100%",
  objectFit: "cover"
})