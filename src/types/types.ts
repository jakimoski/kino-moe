export type TMovie = {
  id: number;
  title: string;
  type?: string;
  posterImage: string;
  bannerImage?: string | null;
  videoSrc: string;
  trailer?: string;
  genres: string[];
  duration?: number;
  releaseDate?: string;
  storyline?: string;
  description: string;
  actors: string[];
  directors: string[];
  awards?: string[];
  writers: string[];
  producers?: string[];
  cinematography?: string[];
  costumeDesign?: string[];
  editing?: string[];
  views?: number;
  comments?: any[];
  createdAt?: Date;
  WatchLists?: TWatchLists[];
};

export type TWatchLists = {
  id: string;
  userId: number;
  movieId?: number | null;
  Movie?: TMovie;
};

export type TComment = {
  id: number;
  content: string;
  userId: number;
  createdAt: Date;
  movieId?: number | null;
  type: string;
  movieTimeStamp?: string | null;
  replyTo?: number;
  postId: number;
  user: TUser;
  replay?: Replay[];
  movie?: TMovie;
};

export type TPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: Date;
  likes: number;
  dislikes: number;
  comments: TComment[];
  user: TUser;
};

export type TUser = {
  id: number;
  email: string;
  userName: string;
  password: string;
  image?: string;
  type: string;
  bio?: string;
  cultures?: string[];
  interests?: string[];
  preferences?: string[];
  recommendations?: string[];
  showMeAround: boolean;
  accountType?: string;
  createdAt: Date;
  subscription_expires_at?: Date;
  subscription_started_at?: Date;
  posts: TPost[];
  WatchLists: TWatchLists[];
  account?: string;
  comments: TComment[];
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  comments: TComment[];
  user: any;
};

export type Replay = {
  id: number;
  userId: number;
  createdAt: Date;
  body: string;
  postId: number;
  type: string;
  likes: number;
  dislikes: number;
  user?: TUser;
};

export type PostType = {
  id: number;
  userId: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  comments: CommentType[];
  user: UserType;
};

export type UserType = {
  id: number;
  userName: string | null;
  email: string;
  image: string | null;
};

export type CommentType = {
  id: number;
  userId: number;
  createdAt: Date;
  content: string;
  postId: number;
  likes: number;
  body: string;
  dislikes: number;
  user: UserType;
  Reply?: ReplyType[];
};

export type ReplyType = {
  id: number;
  userId: number;
  cretedAt: Date;
  body: string;
  commentId: number;
  likes: number;
  dislikes: number;
  user: UserType;
};

export type MovieType = {
  id: number;
  title: string;
  type: string;
  posterImage: string;
  bannerImage: string | null;
  videoSrc: string;
  trailer: string | null;
  genres: string[];
  duration: number | null;
  releaseDate: string;
  storyline: string;
  description: string;
  actors: string[];
  directors: string[];
  awards: string[];
  writers: string[];
  producers: string[];
  cinematography: string[];
  costumeDesign: string[];
  editing: string[];
  views: number;
  createdAt: Date;
};
