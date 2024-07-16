export interface CommentType {
  id: number;
  issue: string;
  designer: {
    avatar: string;
    username: string;
    thumbnails: {
      avatar: string;
      avatar_2x: string;
      avatar_webp: string;
      avatar_webp_2x: string;
    };
  };
  date_created: string;
  message: string;
}

export interface DateDetailedType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}
