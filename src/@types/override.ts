declare module "three/examples/jsm/loaders/GLTFLoader.js" {
  /**
   * TODO: 귀찮아서 모든 메서드를 명시하진 않음.
   * @see: https://threejs.org/docs#examples/en/loaders/GLTFLoader
   * @see: https://github.com/mrdoob/three.js/blob/dev/examples/jsm/loaders/GLTFLoader.js
   */
  export class GLTFLoader extends THREE.Loader<{
    animations: Array<THREE.AnimationClip>;
    scene: THREE.Group;
    scenes: Array<THREE.Group>;
    cameras: Array<THREE.Camera>;
    asset: Object;
  }> {}
}
