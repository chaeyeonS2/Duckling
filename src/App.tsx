import SWRWrapper from "@/components/SWRWrapper";
import "./firebase/config";
import Router from "./components/Router";

import "./firebase/config";
import "@/css/global.css";

export default function Routes() {
  return (
    <SWRWrapper>
      <Router />
    </SWRWrapper>
  );
}
