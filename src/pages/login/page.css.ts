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

export const buttons = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
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

export const buttonIcon = style({
  color: "white",
  marginRight: "8px",
});

export const xmcLoginButton = style({
  border: "none",
  background: "none",
  borderRadius: "8px",
  fontWeight: 500,
  fontSize: 13,
  cursor: "pointer",
  color: "black",
  padding: "8px 12px",
  backgroundColor: "#bdff6b4d",
  transition: "all 0.3s ease-in-out",
  selectors: {
    "&:hover": {
      boxShadow: "0px 3px 10px lightgray",
    },
  },
});

export const xmcLoginInput = style({
  width: "100%",
  height: "32px",
  fontSize: "12px",
  paddingLeft: "8px",
  marginBottom: "20px",
  borderRadius: "8px",
  outline: "none",
});

export const xmcLoginSubmitButton = style({
  border: "none",
  background: "none",
  borderRadius: "8px",
  fontWeight: 500,
  fontSize: 13,
  cursor: "pointer",
  padding: "8px 12px",
  transition: "all 0.3s ease-in-out",
  backgroundColor: "#99d98c",
  color: "#1f1f1f",
  width: "50%",
  selectors: {
    "&:not(:disabled):hover": {
      boxShadow: "0px 3px 10px lightgray",
    },
    "&:disabled": {
      backgroundColor: "lightgray",
      color: "darkgray",
      cursor: "not-allowed",
    },
  },
});
