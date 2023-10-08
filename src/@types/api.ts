// short type - [GET/DELETE는 response, POST/PATCH/PUT는 request]
// long type - [response, request]
type Methods = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

type LengthOfPath<T extends string> = Split<`${T} `, "/">["length"];
type CreateMapItem<K extends string, M extends Methods, R = unknown, D = unknown> = Record<
  `${K}-${LengthOfPath<K>}`,
  {
    [_ in M]: unknown extends D ? (M extends "GET" | "DELETE" ? [R, unknown] : [unknown, R]) : [R, D];
  }
>;
type APIMaps = CreateMapItem<"/api/users", "GET", APIUsersGetResponse> &
  CreateMapItem<"/api/users", "POST", APIUserResponse, APIUsersPostRequest> &
  CreateMapItem<`/api/users/${string}`, "GET", APIUserResponse> &
  CreateMapItem<`/api/users/${string}`, "PATCH", APIUsersPatchRequest> &
  CreateMapItem<`/api/users/${string}`, "DELETE"> &
  CreateMapItem<`/api/users/avatar/${string}`, "GET", APIUsersAvatarReponse> &
  CreateMapItem<`/api/assets/${string}/${string}`, "GET", APIAssetsResponse> &
  CreateMapItem<"/api/posts", "GET", APIPostsResponse> &
  CreateMapItem<"/api/posts", "POST", APIPostResponse, APIPostsPostRequest> &
  CreateMapItem<`/api/posts/${string}`, "GET", APIPostResponse> &
  CreateMapItem<`/api/posts/${string}`, "DELETE"> &
  CreateMapItem<`/api/posts/writer/${string}`, "GET", APIPostsResponse> &
  CreateMapItem<`/api/posts/writer/${string}/${string}`, "GET", APIPostResponse> &
  CreateMapItem<`/api/posts/likes/${string}`, "PATCH"> &
  CreateMapItem<"/api/comments", "POST", APICommentsReponse[number], APICommentPostRequest> &
  CreateMapItem<`/api/comments/root/${string}`, "GET", APICommentsReponse>;

type APIMap = UnionToIntersection<
  {
    [K in keyof APIMaps]: {
      [_ in Split<K, "/"> extends [...infer S extends string[], `${infer N extends string}-${string}`?]
        ? `/${Join<S, "/">}/${N}`
        : never]: APIMaps[K];
    };
  }[keyof APIMaps]
>;

type APIUsersGetResponse = Array<APIUserResponse>;
type APIUsersPostRequest = {
  uid: string;
  profileImg: string;
  userName: string;
};
type APIUsersPatchRequest = Partial<Omit<APIUserResponse, "uid">>;
type APIUserResponse = Omit<User, "userID">;
type APIUsersAvatarReponse = APIUserResponse;

type APIAssetsResponse = Array<{
  assetID: number;
  assetGltf: string;
  assetImg: string;
}>;

type APIPostsResponse = Post[];
type APIPostsPostRequest = Pick<Post, "title" | "body" | "postImg" | "writerID" | "userID">;
type APIPostResponse = Post;
type APIPostsWriterReponse = Post[];
type APIPostWriterReponse = Post;

type APICommentPostRequest = {
  text: string;
  userID: string;
  rootID: string;
  writerID: string;
};
type APICommentsReponse = Array<{
  commentID: string;
  text: string;
  rootID: string;
  writerID: string;
  time: number;
  date: string;
}>;
