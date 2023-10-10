import SWRWrapper from "@/components/SWRWrapper";
import Router from "./components/Router";

import "./lib/axios";
import "./lib/firebase";
import "@/css/global.css";

export default function Routes() {
  return (
    <SWRWrapper>
      <Router />
    </SWRWrapper>
  );
}
