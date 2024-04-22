import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center border border-gray-200 font-sans text-4xl font-bold text-center bg-gray-100 p-5">
        <div className="text-center w-full">掲示板</div>
        <Link
          to="/thread/new"
          className="text-white bg-blue-500 p-2 m-2 rounded hover:bg-blue-700 absolute right-5 text-base"
        >
          スレッドをたてる
        </Link>
      </header>
    </>
  );
};

export default Header;
