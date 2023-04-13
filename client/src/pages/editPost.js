import { Box, Button, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router";

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

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/view/" + id).then((response) =>
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      })
    );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    data.set("file", files?.[0]);

    const response = await fetch("http://localhost:4000/post/", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    console.log(response.json());
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
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
export default EditPost;
