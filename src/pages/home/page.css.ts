import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  width: "100vw",
  height: "100vh",
  backgroundImage: "url(/img/background.png)",
  display: "flex",
  flexDirection: "column",
});
