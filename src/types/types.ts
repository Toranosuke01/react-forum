import { MouseEventHandler } from "react";

export type GetPost = {
  id: string;
  post: string;
};

export type NewPost = {
  post: string;
};

export type Thread = {
  id: number;
  title: string;
};

export type PostFormProps = {
  handleNewPost: (postData: NewPost) => void;
  formtext: { post: string };
  setFormText: React.Dispatch<React.SetStateAction<{ post: string }>>;
};

export type PostsListProps = {
  posts: GetPost[];
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  handlePostClick: (postObj: { post: string }) => void;
};
