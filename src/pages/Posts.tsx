import BackHome from '../components/BackHome';
import Header from '../components/Header';
import PostsList from '../components/PostsList';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation} from 'react-router-dom';
import PostForm from '../components/PostForm';
import { GetPost, NewPost } from '../types/types';

function Posts() {
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState<GetPost[]>([]);

  const { thread_id } = useParams();

  const location = useLocation();
  const title = location.state?.title

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offset}`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }, [thread_id, offset]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleNewPost = async (postData: NewPost) => {
    try {
      const responce = await axios.post(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, postData);
      console.log('Response data:', responce.data);
      getPosts();  // 再読み込みして最新の投稿を表示
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
          <PostsList posts={posts} offset={offset} setOffset={setOffset} />
        </div>
        <div className="border border-gray-200 bg-white ml-5">
          <PostForm handleNewPost={handleNewPost}/>
        </div>
      </div>
      <BackHome />
    </>
  );
}

export default Posts;
