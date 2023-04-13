import { Route, Routes } from "react-router";
import "./app.scss";
import LogIn from "./pages/login";
import Layout from "./layout/layout";
import HomePage from "./pages/homePage";
import Register from "./pages/register";
import CreatePost from "./pages/createpost";
import ViewPost from "./pages/viewPost";
import EditPost from "./pages/editPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Route>
    </Routes>
  );
}

export default App;
