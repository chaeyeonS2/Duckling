import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const header = style({
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const container = style({
  height: "100%",
  width: "100%",
  padding: "32px 24px",
});

export const avatar = style({
  marginTop: "31px",
});

export const inputLabel = style({
  marginTop: "49px",

  fontWeight: 600,
  fontSize: "18px",
});

export const usernameContainer = style({
  marginTop: "12px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

export const inputContainer = style({
  flex: 1,
  border: "1px solid black",
  padding: "0 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const input = style({
  border: "none",
  height: "48px",
  borderRadius: 0,
  padding: 0,
  outline: "none",
});

export const inputIcon = style({
  color: "black",
  selectors: {
    "&[aria-hidden=true]": {
      display: "none",
    },
  },
});

export const inputButton = style({
  height: "48px",
  padding: "8px 24px",
  border: "1px solid #000",
  textAlign: "center",
  whiteSpace: "nowrap",
  background: "#fff",
  boxShadow: "2px 2px",
  selectors: {
    '&[data-state="invalid"]': {
      color: "#848484",
      boxShadow: "2px 2px #848484",
    },
    '&[data-state="confirm"]': {
      background: "#bdff6b",
    },
  },
});

export const footer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  margin: "0 32px",
  marginBottom: "45px",
});

export const logoutBtn = style({ all: "unset", fontWeight: 500, fontSize: "18px" });

export const signoutBtn = style({ all: "unset", fontSize: "16px", color: "#BEBEBE" });
