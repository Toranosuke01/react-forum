import axios from 'axios';
import { useState, useEffect } from 'react';

type Thread = {
  id: number;
  title: string;
};

function ThreadList() {
  const[offset, setOffset] = useState(0);
  const[threads, setThreads] = useState<Thread[]>([]);


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

  return (
    <>
      <div className="grid place-items-center m-5">
        {threads.map(thread => (
          <div key={thread.id} className="border border-gray-400 rounded-md bg-white hover:bg-gray-100 grid place-items-center w-1/2 p-1 m-1">{thread.title}</div>
        ))}
      </div>
      <div className='button-container'>
        <button className="border px-4 py-2 rounded text-black bg-white hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed" onClick={() => setOffset(prevOffset => Math.max(0, prevOffset - 10))} disabled={offset <= 0}>前の10件</button>
        <button className="border px-4 py-2 rounded text-black bg-white hover:bg-gray-100" onClick={() => setOffset(prevOffset => prevOffset + 10)}>次の10件</button>
      </div>
    </>
  );
}

export default ThreadList;
