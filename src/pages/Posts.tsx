import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

import BackHome from "../components/BackHome";
import Header from "../components/Header";
import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
import { GetPost, NewPost } from "../types/types";

const Posts = () => {
  // 投稿の取得位置
  const [offset, setOffset] = useState(0);
  // 取得した投稿一覧
  const [posts, setPosts] = useState<GetPost[]>([]);
  // 投稿フォームのテキスト状態
  const [formtext, setFormText] = useState({
    post: "",
  });

  // URLパラメータからスレッドIDを取得
  const { thread_id } = useParams();

  // スレッドタイトルを取得
  const location = useLocation();
  const title = location.state?.title;

  // APIから投稿一覧を取得する関数
  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offset}`,
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }, [thread_id, offset]);

  //投稿一覧の取得
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // 投稿がクリックされたときの処理（返信機能）
  const handlePostClick = (postObj: { post: string }) => {
    setFormText({ post: `>${postObj.post}\n` });
  };

  // 投稿をPOSTする関数
  const handleNewPost = async (postData: NewPost) => {
    try {
      const responce = await axios.post(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
        postData,
      );
      console.log("Response data:", responce.data);
      getPosts(); // 再読み込みして最新の投稿を表示
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <h2 className="text-center text-2xl font-bold p-2 m-5">{title}</h2>
      <div className="flex justify-center items-start m-5">
        <div className="border border-gray-200 bg-white w-1/2 overflow-auto">
          <PostsList
            posts={posts}
            offset={offset}
            setOffset={setOffset}
            handlePostClick={handlePostClick}
          />
        </div>
        <div className="border border-gray-200 bg-white ml-5">
          <PostForm
            formtext={formtext}
            setFormText={setFormText}
            handleNewPost={handleNewPost}
          />
        </div>
      </div>
      <BackHome />
    </>
  );
};

export default Posts;
