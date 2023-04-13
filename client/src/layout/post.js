import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  const homeWidth = useMediaQuery("(min-width:700px)");

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={homeWidth ? "0.8fr 1.2fr" : "1fr"}
        marginBottom="24px"
        gap={homeWidth ? "40px" : "16px"}
      >
        <Box variant="outlined">
          <Link to={`/post/${_id}`}>
            <img
              style={{ objectFit: "cover", objectPosition: "center center" }}
              src={"http://localhost:4000/" + cover}
              alt="image"
            />
          </Link>
        </Box>
        <Box display="flex" flexDirection="column" gap="4px">
          <Link
            to={`/post/${_id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
          </Link>
          <Box display="flex" gap="8px">
            <Typography
              sx={{ fontSize: "0.7rem", color: "grey", fontWeight: "bold" }}
            >
              {author.userName}
            </Typography>
            <ReactTimeAgo
              style={{ fontSize: "0.7rem", color: "grey" }}
              date={createdAt}
              locale="en-US"
            />
          </Box>
          <Typography sx={{ fontSize: "0.9rem" }}>{summary}</Typography>
        </Box>
      </Box>
    </>
  );
};
export default Post;
