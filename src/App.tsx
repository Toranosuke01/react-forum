import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/CreateThread";
import Posts from "./pages/Posts";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/thread/new" element={<CreateThread />} />
      <Route path="/thread/:thread_id" element={<Posts />} />
      <Route path="*" element={<h1>Not Found Page</h1>} />
    </>,
  ),
);

export default App;
