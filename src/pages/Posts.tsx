import BackHome from '../components/BackHome';
import Header from '../components/Header';
import PostsList from '../components/PostsList';
import { useParams, useLocation} from 'react-router-dom';

function Posts() {
  const { thread_id } = useParams();

  const location = useLocation();
  const title = location.state?.title

  return (
    <>
      <Header />
      <h2 className="text-center text-2xl font-bold p-2 m-5">{title}</h2>
      <div className="border border-gray-200 bg-white m-5">
        <PostsList thread_id={thread_id as string}/>
        <BackHome />
      </div>
    </>
  );
}

export default Posts;
