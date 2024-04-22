import { Link } from "react-router-dom";

export const BackHome = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <Link to='/'
          className="text-center text-blue-500 hover:underline m-2">
            Topに戻る
        </Link>
      </div>
    </>
  );
}

export default BackHome;
