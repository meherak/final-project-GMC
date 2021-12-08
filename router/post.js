const express = require("express");
const {
  addNewPost,
  myPosts,
  allPosts,
  editPost,
  findPost,
  deletePost,
} = require("../controllers/post.controllers");
const agencyIsAuth = require("../middlewares/agencyIsAuth");
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
router.put("/editpost", isAuth, editPost);
//delite post
//@private route
router.delete("/:id", isAuth, deletePost);

// route get all posts
// @Public Route
// Method :GET
router.get("/findpost/:id", isAuth, findPost);
router.get("/", allPosts);

module.exports = router;
