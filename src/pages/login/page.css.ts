import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  position: "relative",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
});

export const logoImage = style({
  width: "80vw",
  height: "10%",
  marginTop: "35vh",
  objectFit: "contain",
});

export const twitterImage = style({
  width: "300px",
  marginTop: "70vh",
  objectFit: "contain",
});

export const twitterSignInButton = style({
  position: "absolute",
});

export const xmcLink = style({
  position: "absolute",
  bottom: "100px",
  textDecoration: "none",
});
