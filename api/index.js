const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./modals/User");
const Post = require("./modals/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
require("dotenv").config();

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGOOSe_CONNECTION_STRING);
app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const userDoc = await User.create({
      userName,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const comparePassword = bcrypt.compareSync(password, userDoc.password);
    if (comparePassword) {
      jwt.sign({ email: email, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          userName: userDoc.userName,
          email: userDoc.email,
        });
      });
    } else {
      res.status(400).json("Invalid Credentials");
    }
  } else {
    res.status(400).json("Invalid Credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    } catch (error) {
      res.status(400).json(error);
    }
  });
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = "";
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;

    const postDoc = await Post.findById(id);
    const isEditable =
      JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isEditable) return res.status(400).json("NOt Editable");

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  const postDoc = await Post.find()
    .populate("author", ["userName"])
    .sort({ createdAt: -1 })
    .limit(20);
  try {
    if (postDoc) {
      res.status(200).json(postDoc);
    }
  } catch (error) {
    res.status(400).json("Invalid");
  }
});

app.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", [
    "userName",
    "email",
  ]);
  res.json(postDoc);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000);
