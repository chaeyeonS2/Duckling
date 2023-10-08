interface Post {
  postID: string;
  title: string;
  body: string;
  postImg: string[];
  writerID: string;
  userID: string;
  time: number;
  date: string;
  likes: number;
  commentCount: number;
}
interface User {
  userID: string;
  profileImg: string;
  userName: string;
  userAvatar: {
    eyes: string;
    mouth: string;
    top: string;
    bottom: string;
    accessory: string;
    shoes: string;
  };
}

interface Asset {
  assetID: number;
  assetGltf: string;
  assetImg: string;
}
