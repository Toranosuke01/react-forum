import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const ThreadForm = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const url = "https://railway.bulletinboard.techtrain.dev/threads";
    const data = {
      title: text
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(url, data, config);
      console.log('Response data:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error during the POST request:', error);
    }
    };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="mt-5" htmlFor="title">スレッド新規作成</label>
        <textarea className="border w-96 h-16 border-gray-400 p-2 m-2" id="content" name="content" placeholder="スレッドタイトル" value={text} onChange={handleTextChange} />
        <button type="submit" className="text-white bg-blue-500 p-2 m-2 rounded hover:bg-blue-700 text-base" >作成</button>
        <Link to='/' className="text-blue-500 hover:underline">Topに戻る</Link>
      </form>
    </>
  );
}

export default ThreadForm;
