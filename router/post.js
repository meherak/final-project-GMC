const express = require("express");
const isAuth = require("../middlewares/isAuth");
const Post = require("../models/Post");
const router = express.Router();

// create post
// @private route
// body title description
router.post("/", isAuth, async (req, res) => {
  try {
    // create a new Post
    const newPost = new Post({ ...req.body, id_user: req.user._id });
    // save it in the database
    await newPost.save();
    res.send({ msg: "post is saved", newPost });
  } catch (error) {
    res.send(error);
  }
});

// get my posts
// @private route
// token
router.get("/myposts", isAuth, async (req, res) => {
  try {
    const findPosts = await Post.find({ id_user: req.user._id });
    res.send({ msg: "your posts are:", posts: findPosts });
  } catch (error) {
    res.send(error);
  }
});

// route get all posts
// @Public Route
// Method :GET
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find().populate("id_user");
    res.send({ msg: "all posts", posts: allPosts });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
