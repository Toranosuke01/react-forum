import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Thread } from '../types/types';

export const ThreadList = () => {
  const [offset, setOffset] = useState(0);
  const [threads, setThreads] = useState<Thread[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function getThreads() {
      try {
        const response = await axios.get(`https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`);
        setThreads(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getThreads();
  }, [offset]);

  const handleThreadClick = (id: number, title: string) => {
    navigate(`/thread/${id}`, { state: { title } });
  };

  return (
    <>
      <div className="grid place-items-center m-5">
        {
          threads.map((thread, index) => (
            <div key={thread.id} 
              className={
                `border border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 w-1/2 p-3 pl-4 cursor-pointer`
              } 
              onClick={() => handleThreadClick(thread.id, thread.title)}>
              {thread.title}
            </div>
          ))
        }
      </div>
      <div className="text-center">
        <button className="border px-4 py-2 rounded text-black bg-white hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed" 
          onClick={() => setOffset(prevOffset => Math.max(0, prevOffset - 10))} 
          disabled={offset <= 0}>
          前の10件
        </button>
        <button className="border px-4 py-2 rounded text-black bg-white hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed" 
          onClick={() => setOffset(prevOffset => prevOffset + 10)} 
          disabled={threads.length < 10}>
          次の10件
        </button>
      </div>
    </>
  );
}

export default ThreadList;
