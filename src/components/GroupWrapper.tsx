import { GroupProps } from "@react-three/fiber";
import { useRef } from "react";

export interface GroupWrpperProps extends GroupProps {
  groups: THREE.Group[];
}
function GroupWrpper({ groups, ...props }: GroupWrpperProps) {
  const groupRef = useRef<THREE.Group>(null);

  if (groupRef.current && groups.length > 0) {
    groupRef.current.clear();
    groupRef.current.add(...groups);
  }

  return <group ref={groupRef} {...props} />;
}

export default GroupWrpper;
