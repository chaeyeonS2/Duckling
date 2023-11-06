import React, { useState } from "react";
import { ZapparCamera, InstantTracker, ZapparCanvas } from "@zappar/zappar-react-three-fiber";
import * as styles from "./page.css";

export default function ARCameraPage() {
  let [placementMode, setPlacementMode] = useState(true);

  return (
    <>
      <ZapparCanvas>
        <ZapparCamera matrixWorldAutoUpdate={true} rearCameraMirrorMode="css" />
        <InstantTracker matrixWorldAutoUpdate={true} placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
          <mesh></mesh>
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
      <div
        className={styles.zapparPlacementUi}
        onClick={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        onKeyDown={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        role="button"
        tabIndex={0}
      >
        Tap here to
        {placementMode ? " place " : " pick up "}
        the object
      </div>
    </>
  );
}
