const express = require("express");
const {
  addNewPost,
  myPosts,
  allPosts,
  editPost,
  delitePost,
  findPost,
} = require("../controllers/post.controllers");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

// create post
// @private route
// body title description
router.post("/addpost", isAuth, addNewPost);

// get my posts
// @private route
// token
router.get("/myposts", isAuth, myPosts);
//edit my post
//@private roote
router.put("/", isAuth, editPost);
//delite post
//@private route
router.delete("/:id", isAuth, delitePost);

// route get all posts
// @Public Route
// Method :GET
router.get("/findpost/:id", isAuth, findPost);
router.get("/", allPosts);

module.exports = router;
