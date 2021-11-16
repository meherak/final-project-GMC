const Post = require("../models/Post");
exports.addNewPost = async (req, res) => {
  // create a new Post
  const newPost = new Post({ ...req.body, id_user: req.user._id });

  try {
    // save it in the database
    let post = await newPost.save();
    res.send({ msg: "post is saved", post });
  } catch (error) {
    res.status(403).send({ errors: [{ msg: "can not add post", error }] });
  }
};
exports.myPosts = async (req, res) => {
  try {
    const findPosts = await Post.find({ id_user: req.user._id });
    console.log(findPosts);
    console.log(req.headers);
    res.status(200).send({ msg: "your posts are:", post: findPosts });
  } catch (error) {
    res
      .status(403)
      .send({ errors: [{ msg: "can not get your posts", error }] });
  }
};
exports.allPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("id_user");
    res.send({ msg: "all posts", posts: allPosts });
  } catch (error) {
    res.send({ error });
  }
};
exports.editPost = async (req, res) => {
  let id = req.user._id;

  try {
    let post = await Post.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).send({ msg: `post updated succ`, post });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "we can not find or update", error });
  }
};
exports.delitePost = async (req, res) => {
  let id = req.params.id;
  try {
    let deleted = await Post.findByIdAndRemove(id);
    console.log(deleted);
    res.status(200).send({ msg: "removed post" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "we can not remove post", error });
  }
};
exports.findPost = async (req, res) => {
  let id = req.params.id;
  try {
    let post = await Post.findOne({ _id: id });
    res.status(200).send({ msg: "finded post", post });
  } catch (error) {
    res.status(400).send({ msg: "post not found", error });
  }
};
