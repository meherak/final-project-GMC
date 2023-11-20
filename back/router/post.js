const express = require("express");
const {
  addNewPost,
  myPosts,
  allPosts,
  editPost,
  findPost,
  deletePost,
  searchPosts,
  
} = require("../controllers/post.controllers");
const agencyIsAuth = require("../middlewares/agencyIsAuth");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();


router.post("/addpost", isAuth, addNewPost);


router.get("/myposts", isAuth, myPosts);


router.put("/editpost", isAuth, editPost);

router.delete("/:id", isAuth, deletePost);


router.get("/findpost/:id", isAuth, findPost);
router.get("/searchposts", searchPosts);

router.get("/", allPosts);

module.exports = router;
