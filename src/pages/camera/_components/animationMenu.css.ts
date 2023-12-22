import { style } from "@vanilla-extract/css";

export const menuContainer = style({
  width: "100vw",
  height: "140px",
  backgroundColor: "rgba(0, 0, 0, 0.70)",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
});

export const title = style({
  fontSize: "15px",
  color: "white",
  margin: "15px",
});

export const iconContainer = style({
  display: "flex",
  marginLeft: "15px",
  height: "100%",
});

export const menu = style({
  display: "flex",
  overflowX: "auto",
  whiteSpace: "nowrap",
  height: "100%",
});

export const camera = style({
  width: "70px",
  height: "70px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "35px",
  backgroundColor: "rgb(0, 0, 0, 0.1)",
  objectFit: "contain",
  flex: "0 0 auto",
  marginRight: "10px",
});

export const iconBox = style({
  display: "flex",
  alignItems: "center",
  width: "70px",
  height: "70px",
  borderRadius: "35px",
  backgroundColor: "rgb(0, 0, 0, 0.2)",
  objectFit: "contain",
  flex: "0 0 auto",
  marginRight: "10px",
  selectors: {
    "&[aria-selected=true]": {
      border: "2px solid #bdff6b",
      boxShadow: "3px 3px",
    },
  },
});

export const iconImg = style({ width: "auto", height: "70px", margin: "auto" });
