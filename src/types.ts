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

export interface IssueShortType {
  key: string;
  date_created: string;
  status: "Done" | "In Progress" | "New";
}

export interface DesignerType {
  avatar: string;
  username: string;
  email: string;
  thumbnails: {
    avatar: string;
    avatar_2x: string;
    avatar_webp: string;
    avatar_webp_2x: string;
  };
  issues: IssueShortType[];
}

export type IssueDetailedType = {
  id: number;
  status: "Done" | "In Progress" | "New";
  designer: string;
  project: string;
  date_created: string;
  summary: string;
  received_from_client: number;
  send_to_project_manager: number;
  send_to_account_manager: number;
  send_to_designer: number;
  date_updated: string;
  date_started_by_designer: string;
  date_finished_by_designer: string;
  date_finished: string;
};

export type IssueDetailedExtendedType = IssueDetailedType & { time_spent: number };

export interface ParsedIssueArrayType {
  name: string;
  tasks: IssueDetailedExtendedType[];
  count: number;
  times: number[];
  median: number;
}
