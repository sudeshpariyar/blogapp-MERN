import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

const ViewPost = () => {
  const userInfo = useSelector((state) => state.user.user);

  const [postInfo, setPostInfo] = useState();
  const { id } = useParams();
  useEffect(() => {
    try {
      if (id) {
        fetch(`http://localhost:4000/view/${id}`).then((res) => {
          res.json().then((data) => {
            setPostInfo(data);
          });
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="1rem"
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#373d3f",
            }}
          >
            {postInfo?.title}
            {userInfo?.id === postInfo?.author._id && (
              <Link to={`/edit/${postInfo._id}`}>
                <Button
                  sx={{ textDecoration: "none", marginLeft: "1rem" }}
                  variant="contained"
                >
                  EditPost
                </Button>
              </Link>
            )}
          </Typography>
          <Box display="flex" alignItems="center" gap="0.5rem">
            <Typography fontSize="0.8rem">
              Author: {postInfo?.author.userName}
            </Typography>

            <span style={{ fontSize: "0.7rem", color: "grey" }}>
              {moment(postInfo?.createdAt).format("DD.MM.YYYY")}
            </span>
          </Box>
        </Box>
        <img
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            marginBottom: "1rem",
          }}
          src={"http://localhost:4000/" + postInfo?.cover}
          alt="cover"
        />

        <Typography
          sx={{ lineHeight: "1.6rem" }}
          dangerouslySetInnerHTML={{ __html: postInfo?.content }}
        />
      </Box>
    </>
  );
};
export default ViewPost;
