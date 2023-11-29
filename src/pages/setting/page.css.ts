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

export const inputContainer = style({
  marginTop: "12px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

export const input = style({
  flex: 1,
  height: "48px",
  border: "1px solid black",
  borderRadius: 0,
  padding: "16px",
});

export const inputButton = style({
  flex: 1,
  height: "48px",
  padding: "6px 14px",
  border: "1px solid #000",
  textAlign: "center",
  whiteSpace: "nowrap",
  background: "#fff",
  boxShadow: "2px 2px",
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
