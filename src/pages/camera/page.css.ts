import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  width: "100vw",
  height: "100dvh",
  backgroundColor: "#F1C8D3",
  display: "flex",
  flexDirection: "column",
});

export const canvas = style({
  width: "100vw",
  height: "100vh",
});

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
  border: "none",
  color: "#BDFF6B",
  selectors: {
    "&:disabled": {
      color: "gray",
    },
  },
});

export const menu = style({
  display: "flex",
  overflowX: "auto",
  height: "100%",
  width: "100%",
});

export const iconCheckbox = style({});

export const iconBox = style({
  display: "flex",
  alignItems: "center",
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: "rgb(0, 0, 0, 0.2)",
  objectFit: "contain",
  flex: "0 0 auto",
  marginRight: "10px",
  transition: "all 0.15s ease-in-out",
  border: "0px solid #bdff6b00",
  padding: "0 8px",
  selectors: {
    [`${iconCheckbox}:checked + &`]: {
      border: "2px solid #bdff6b",
      boxShadow: "3px 3px",
    },
  },
});
