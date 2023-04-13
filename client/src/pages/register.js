import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Input } from "@mui/material";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reaspnse = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (reaspnse.status !== 200) {
      alert("Registration failed");
    } else {
      alert("Registration successful");
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="8px" width="400px">
            <Typography
              sx={{
                alignSelf: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Register User
            </Typography>
            <Input
              type="text"
              placeholder="User Name"
              onChange={(event) => setUserName(event.target.value)}
              sx={{ backgroundColor: "#fff" }}
            />
            <Input
              type="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              sx={{ backgroundColor: "#fff" }}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              sx={{ backgroundColor: "#fff" }}
            />
            <Button type="submit" variant="contained">
              Register User
            </Button>
            <span>Already, have an account. Login</span>
          </Box>
        </form>
      </Box>
    </>
  );
};
export default Register;
