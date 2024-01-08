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
type APIMaps = unknown &
  // users
  CreateMapItem<"/api/users", "POST", User, Omit<User, "userAvatar">> &
  CreateMapItem<`/api/users/${string}`, "GET", User> &
  CreateMapItem<
    `/api/users/${string}`,
    "PATCH",
    Partial<Pick<User, "userName" | "profileImg"> & { userAvatar: Partial<Avatar> }>
  > &
  CreateMapItem<`/api/users/${string}`, "DELETE", NormalMessageResponse<"유저 정보가 삭제되었습니다.">> &
  CreateMapItem<`/api/users/avatar/${string}`, "GET", Avatar> &
  // posts
  CreateMapItem<"/api/posts", "POST", Post, Pick<Post, "title" | "body" | "postImg" | "writerID" | "writerName">> &
  CreateMapItem<`/api/posts/?sortBy=${string}&limit=${string}&start=${string}`, "GET", Post[]> &
  CreateMapItem<`/api/posts/${string}`, "GET", Post> &
  CreateMapItem<`/api/posts/${string}`, "DELETE", NormalMessageResponse<"게시글이 삭제되었습니다.">> &
  CreateMapItem<`/api/posts/writer/${string}`, "GET", Post[]> &
  CreateMapItem<`/api/posts/likes/${string}/${string}`, "PATCH", { likes: string[] }> &
  // comment
  CreateMapItem<
    "/api/comments",
    "POST",
    PostComment,
    Pick<PostComment, "text" | "rootID" | "writerID"> & { userID: string }
  > &
  CreateMapItem<`/api/comments/${string}`, "GET", PostComment[]> &
  CreateMapItem<`/api/comments/${string}`, "DELETE", NormalMessageResponse<"답글이 삭제되었습니다.">> &
  // twitter
  CreateMapItem<
    `/api/twitter/${string}`,
    "POST",
    NormalMessageResponse<"Your image tweet is posted successfully">,
    Record<"postImg_url", string>
  > &
  // asset
  CreateMapItem<`/api/assets/${string}`, "GET", Asset> &
  CreateMapItem<`/api/assets/?kind=${string}`, "GET", Asset[]> &
  CreateMapItem<`/api/assets/ar`, "GET", Asset[]> &
  CreateMapItem<`/api/assets/ar/${string}`, "GET", Asset>;

type APIMap = UnionToIntersection<
  {
    [K in keyof APIMaps]: {
      [_ in Split<K, "/"> extends [...infer S extends string[], `${infer N extends string}-${string}`?]
        ? `/${Join<S, "/">}/${N}`
        : never]: APIMaps[K];
    };
  }[keyof APIMaps]
>;

type NormalMessageResponse<T extends string> = { messsage: T };
