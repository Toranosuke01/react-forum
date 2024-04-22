import { PostFormProps } from '../types/types';

export const PostForm: React.FC<PostFormProps> = ({ formtext, setFormText, handleNewPost }) => {

  const handleForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormText({
      ...formtext,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formtext.post.trim()) {
      handleNewPost(formtext);
      setFormText({post: ''}); // フォームをクリア
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea id="post" name="post"
          className="border w-96 h-16 border-gray-200 p-2 m-2"
          placeholder="投稿しよう！" 
          value={formtext.post} 
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
