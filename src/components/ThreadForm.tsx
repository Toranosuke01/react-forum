import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackHome from "./BackHome";

export const ThreadForm = () => {
  // 入力されたスレッドタイトルの状態
  const [title, setTitle] = useState({
    title: "",
  });
  const navigate = useNavigate();

  // スレッドタイトルの入力状態を更新する関数
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle({
      ...title,
      [e.target.name]: e.target.value,
    });
  };

  // 新規スレッドをPOSTする関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "https://railway.bulletinboard.techtrain.dev/threads";
    const data = {
      title: title.title,
    };
    try {
      const response = await axios.post(url, data);
      console.log("Response data:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error during the POST request:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="mt-5" htmlFor="title">
          スレッド新規作成
        </label>
        <textarea
          id="title"
          name="title"
          className="border w-96 h-16 border-gray-200 p-2 m-2"
          placeholder="スレッドタイトル"
          value={title.title}
          onChange={handleTextChange}
        />
        <button
          type="submit"
          className="text-white bg-blue-500 p-2 m-2 rounded hover:bg-blue-700 text-base"
        >
          作成
        </button>
        <BackHome />
      </form>
    </>
  );
};

export default ThreadForm;
