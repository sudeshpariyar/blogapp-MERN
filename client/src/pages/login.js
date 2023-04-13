import { Box, Button, Input, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { setUser } from "../redux-slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        dispatch(setUser(userInfo));
      });
      setRedirect(true);
    } else {
      alert("wrong credentials");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <form>
          <Box display="flex" flexDirection="column" gap="8px" width="400px">
            <Typography
              sx={{
                alignSelf: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Login
            </Typography>

            <Input
              type="email"
              placeholder="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
              sx={{ backgroundColor: "#fff" }}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
              sx={{ backgroundColor: "#fff" }}
            />
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              LogIn
            </Button>
            <span>Don't have an account. Register</span>
          </Box>
        </form>
      </Box>
    </>
  );
};
export default Login;
