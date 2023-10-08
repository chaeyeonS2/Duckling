import SWRWrapper from "@/components/SWRWrapper";
import "./firebase/config";
import Router from "./components/Router";

import "./firebase/config";

export default function Routes() {
  return (
    <SWRWrapper>
      <Router />
    </SWRWrapper>
  );
}
