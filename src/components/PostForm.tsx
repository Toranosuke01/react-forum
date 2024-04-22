import React, { useState } from 'react';
import { PostFormProps } from '../types/types';

export const PostForm: React.FC<PostFormProps> = ({ handleNewPost }) => {
  const [form, setForm] = useState({
    post: ''
  });

  const handleForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.post.trim()) {
      handleNewPost(form);
      setForm({post: ''}); // フォームをクリア
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="mt-5" htmlFor="title">スレッド新規作成</label>
        <textarea id="post" name="post"
          className="border w-96 h-16 border-gray-200 p-2 m-2"
          placeholder="投稿しよう！" 
          value={form.post} 
          onChange={handleForm} />
        <button type="submit" 
          className="text-white bg-blue-500 p-2 m-2 rounded hover:bg-blue-700 text-base" >
            投稿
        </button>
      </form>
    </>
  );
}

export default PostForm;
