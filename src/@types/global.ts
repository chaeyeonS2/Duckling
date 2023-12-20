interface Post {
  postID: string;
  title: string;
  body: string;
  writerID: string;
  writerName: string;
  likes: string[];
  commentCount: number;
  postImg: string[];
  time: number;
  date: string;
}

interface User {
  uid: string;
  userName: string;
  profileImg: string;
  consumer_key: string;
  consumer_secret: string;
  userAvatar: {
    top: string;
    bottom: string;
    shoes: string;
    accessory: string;
    eyes: string;
    mouth: string;
  };
}

interface Comment {
  commentID: string;
  text: string;
  rootID: string;
  writerID: string;
  time: number;
  date: string;
}

interface Asset {
  assetID: string;
  assetGltf: string;
  assetImg: string;
}

interface GLTFAsset {
  animations: Array<THREE.AnimationClip>;
  scene: THREE.Group;
  scenes: Array<THREE.Group>;
  cameras: Array<THREE.Camera>;
  asset: Object;
}

declare module "three/examples/jsm/loaders/GLTFLoader.js" {
  /**
   * TODO: 귀찮아서 모든 메서드를 명시하진 않음.
   * @see: https://threejs.org/docs#examples/en/loaders/GLTFLoader
   * @see: https://github.com/mrdoob/three.js/blob/dev/examples/jsm/loaders/GLTFLoader.js
   */
  export class GLTFLoader extends THREE.Loader<GLTFAsset> {}
}
