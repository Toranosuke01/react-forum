import { useState, useEffect } from "react";
import axios from "axios";

type PostsListProps = {
  thread_id: string;
};

type Post = {
  id: string;
  post: string;
};

export const PostsList: React.FC<PostsListProps> = ({ thread_id }) => {

  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offset}`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    }
    getPosts();
  }, [offset, thread_id]);

  return (
    <>
      <div className="grid place-items-center m-5">
        {
          posts.length > 0 ? posts.map(post => (
            <div key={post.id} className="border border-gray-200 bg-white w-1/2 p-3 pl-4">{post.post}</div>
          )): <p>投稿はありません</p>
        }   
      </div>
      {
        posts.length > 0 && 
        <div className="text-center">
          <button className="border px-4 py-2 rounded text-black bg-white hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed" onClick={() => setOffset(prevOffset => Math.max(0, prevOffset - 10))} disabled={offset <= 0}>前の10件</button>
          <button className="border px-4 py-2 rounded text-black bg-white hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed" onClick={() => setOffset(prevOffset => prevOffset + 10)} disabled={posts.length < 10}>次の10件</button>
        </div>
      }
    </>
  );
}

export default PostsList;
