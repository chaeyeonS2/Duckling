import { GroupProps } from "@react-three/fiber";

export interface GroupWrpperProps extends GroupProps {
  groups: THREE.Group[];
}
function GroupWrpper({ groups, ...props }: GroupWrpperProps) {
  return (
    <group {...props}>
      {groups.map((group) => (
        <primitive key={group.id} object={group} />
      ))}
    </group>
  );
}

export default GroupWrpper;
