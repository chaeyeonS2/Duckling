// #region users api
// * [GET] /users
type APIUsersGetResponse = Array<APIUserResponse>;

// * [POST] /users
type APIUsersPostRequest = {
  uid: string;
  profileImg: string;
  userName: string;
};

// * [PATCH] /users/:uid
type APIUsersPatchRequest = Partial<Omit<APIUserResponse, "uid">>;

// * [GET] /user/:uid
type APIUserResponse = Omit<User, "userID">;
// * [GET] /users/avatar/:uid
type APIUsersAvatarReponse = APIUserResponse;
// #endregion

// #region assets api
// * [GET] /assets/:area/:kind
type APIAssetsResponse = Array<{
  assetID: number;
  assetGltf: string;
  assetImg: string;
}>;
// #endregion

// #region posts api
// * [GET] /posts
type APIPostsResponse = Post[];

// * [POST] /posts
type APIPostsPostRequest = Pick<
  Post,
  "title" | "body" | "postImg" | "writerID" | "userID"
>;

// * [GET] /posts/:postID
type APIPostReponse = Post;

// * [GET] /posts/writer/:writerID
type APIPostsWriterReponse = Post[];

// * [GET] /posts/writer/:writerID/:postID
type APIPostWriterReponse = Post;
// #endregion

// #region comments api
// * [GET] /comments/root/:rootID
type APICommentsReponse = Array<{
  commentID: string;
  text: string;
  rootID: string;
  writerID: string;
  time: number;
  date: string;
}>;

// * [POST] /comments
type APICommentPostRequest = {
  text: string;
  userID: string;
  rootID: string;
  writerID: string;
};
// #endregion
