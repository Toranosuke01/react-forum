import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateThread from "./pages/CreateThread";
import Posts from "./pages/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thread/new" element={<CreateThread />} />
        <Route path="/thread/:thread_id" element={<Posts />} />
        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
