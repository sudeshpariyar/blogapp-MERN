import { useEffect, useState } from "react";
import Post from "../layout/post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts?.length > 0 && posts.map((post, i) => <Post {...post} key={i} />)}
    </>
  );
};
export default HomePage;
