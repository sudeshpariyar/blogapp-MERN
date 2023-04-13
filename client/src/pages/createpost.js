import { Box, Button, OutlinedInput } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="1rem">
          <OutlinedInput
            type="title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <OutlinedInput
            type="summary"
            placeholder="Summary"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
          <OutlinedInput
            type="file"
            onChange={(event) => setFiles(event.target.files)}
          />
          <ReactQuill
            value={content}
            modules={modules}
            formats={quillFormats}
            onChange={setContent}
          />
          <Button variant="contained" type="submit" sx={{ width: "100%" }}>
            Post
          </Button>
        </Box>
      </form>
    </>
  );
};
export default CreatePost;
