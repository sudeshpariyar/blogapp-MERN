import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, removeUserInfo } from "../redux-slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.user.email);

  useEffect(() => {
    try {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      }).then((response) => {
        response.json().then((userInfo) => {
          dispatch(setUserInfo({ userInfo }));
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    dispatch(removeUserInfo());
  };

  return (
    <header>
      <Link to="/" className="logo">
        Blog app
      </Link>
      <nav>
        {userEmail && (
          <>
            <Link to="/createPost">Create New Post</Link>
            <a onClick={logout}>LogOut</a>
          </>
        )}
        {!userEmail && (
          <>
            <Link to={"/login"} className="login">
              Login
            </Link>
            <Link to="/register" className="logout">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
