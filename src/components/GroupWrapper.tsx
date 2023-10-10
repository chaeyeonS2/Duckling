import { useRef, useEffect } from "react";

export interface GroupWrpperProps {
  groups: THREE.Group[];
}
function GroupWrpper({ groups }: GroupWrpperProps) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    groupRef.current?.add(...groups);
  }, [groups]);

  return <group ref={groupRef} />;
}

export default GroupWrpper;
