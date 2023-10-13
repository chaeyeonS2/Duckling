import { GroupProps } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export interface GroupWrpperProps extends GroupProps {
  groups: THREE.Group[];
}
function GroupWrpper({ groups, ...props }: GroupWrpperProps) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    groupRef.current?.clear();
    if (groups.length > 0) groupRef.current?.add(...groups);
  }, [groups]);

  return <group ref={groupRef} {...props} />;
}

export default GroupWrpper;
