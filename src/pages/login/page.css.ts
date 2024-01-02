import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: "0 30px",
});

export const logoImage = style({ width: "100%", height: "auto", padding: "0 5px" });

export const buttonIcon = style({
  color: "white",
  marginRight: "8px",
});
export const button = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "fit-content",
  padding: "15px 14px",
  border: "1px solid #000",
  textAlign: "center",
  whiteSpace: "nowrap",
  background: "black",
  color: "white",
  fontWeight: 600,
  fontSize: 17,
  selectors: {
    "&[aria-selected=true]": {
      background: "#bdff6b",
      boxShadow: "2px 2px",
    },
  },
});
