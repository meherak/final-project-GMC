const Post = require("../models/Post");
const identify = require("./identify");
const mongoose = require("mongoose");

exports.addNewPost = async (req, res) => {
  let agencyId = req.headers["_id"];
  let agency = req.agency;
  let user = req.user;
  const ref = identify(agency, user, agencyId);
  let newPost;
  // if (agencyId) {
  //   // const posterId = mongoose.Types.ObjectId(agencyId);

  //   newPost = new Post({
  //     ...req.body,
  //     poster: agencyId,
  //     onModel: "agency",
  //   });
  // }
  // if (req.agency && req.agency._id) {
  //   newPost = new Post({
  //     ...req.body,
  //     poster: req.agency._id,
  //     onModel: "agency",
  //   });
  // }
  // if (req.user && req.user._id) {
  newPost = new Post({
    ...req.body,
    ...ref,
  });
  // }

  try {
    // create a new Post
    // newPost = new Post({
    //   ...req.body,
    //   ...ref,
    // });
    // save it in the database
    let post = await newPost.save();
    res.send({ msg: "post is saved", post });
  } catch (error) {
    console.log(error);
    res.status(403).send({ errors: [{ msg: "can not add post", error }] });
  }
};
exports.myPosts = async (req, res) => {
  let findPosts;

  let agencyId = req.headers["_id"];
  console.log(agencyId);
  let agency = req.agency;
  let user = req.user;
  const ref = identify(agency, user, agencyId);
  console.log(ref);

  try {
    findPosts = await Post.aggregate([
      {
        $match: { poster: ref.poster },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "on_address",
          as: "addresses",
        },
      },
    ]);
    console.log(findPosts);
    return res.status(200).send({ msg: "your posts are:", post: findPosts });
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .send({ errors: [{ msg: "can not get your posts", error }] });
  }
};
exports.allPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("poster");
    res.send({ msg: "all posts", posts: allPosts });
  } catch (error) {
    res.send({ error });
  }
};
exports.editPost = async (req, res) => {
  let id = req.body.id;

  try {
    let post = await Post.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).send({ msg: `post updated succ`, post });
  } catch (error) {
    res.status(400).send({ msg: "we can not find or update", error });
  }
};
exports.deletePost = async (req, res) => {
  let id = req.params.id;
  try {
    let post = await Post.findByIdAndRemove(id);

    res.status(200).send({ msg: "removed post", post });
  } catch (error) {
    // console.log(error);
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
