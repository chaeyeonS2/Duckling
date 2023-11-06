import { style } from "@vanilla-extract/css";

export const zapparPlacementUi = style({
  position: "absolute",
  bottom: "30px",
  width: "200px",
  left: "calc(50% - 100px)",
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  textAlign: "center",
  fontFamily: "sans-serif",
  padding: "10px",
  borderRadius: "5px",
});
