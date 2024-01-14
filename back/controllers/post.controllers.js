const Post = require("../models/Post");
const identify = require("./identify");
const mongoose = require("mongoose");
const User = require("../models/User");
const Agency = require("../models/Agency");

exports.addNewPost = async (req, res) => {
  let agencyId = req.headers["_id"];
  let user = req.user;
  const ref = identify(user, agencyId);
  let newPost;
  newPost = new Post({
    ...req.body,
    ...ref,
  });

  try {
    let post = await newPost.save();
    res.send({ msg: "post is saved", post });
  } catch (error) {
    console.log(error);
    res.status(403).send({ errors: [{ msg: "can not add post", error }] });
  }
};
exports.myPosts = async (req, res) => {
  let user = req.user;
  let agencyId = req.headers["_id"];
  const ref = identify(user, agencyId);

  let findPosts = [];

  let posterIds = [];

  if (user.role === "particular") posterIds = [ref.poster];
  if (user.role === "employer") {
    let employersSameAgency = await User.find(
      { id_agency: user.id_agency },
      "id_agency"
    );

    posterIds = [
      user.id_agency,
      ...employersSameAgency.map((e) => {
        return e._id;
      }),
    ];
  }

  if (user.role === "business") {
    let findIds = await User.find(
      { id_agency: ref && ref.poster },
      "id_agency"
    );
    posterIds = [
      ref && ref.poster,
      ...findIds.map((e) => {
        return e._id;
      }),
    ];
  }
  for (id of posterIds) {
    try {
      findPosts = [
        ...findPosts,
        ...(await Post.aggregate([
          {
            $match: { poster: id },
          },
          { $sort: { date: 1 } },
          {
            $lookup: {
              from: "addresses",
              localField: "_id",
              foreignField: "on_address",
              as: "addresses",
            },
          },
          // { $unwind: "$addresses" },

          {
            $lookup: {
              from: "users",
              localField: "poster",
              foreignField: "_id",
              as: "users",
            },
          },
          {
            $lookup: {
              from: "agencies",
              localField: "poster",
              foreignField: "_id",
              as: "agencies",
            },
          },
        ])),
      ];
    } catch (error) {
      res
        .status(403)
        .send({ errors: [{ msg: "can not get your posts", error }] });
    }
  }
  return res.status(200).send({ msg: "your posts are:", post: findPosts });
};
exports.allPosts = async (req, res) => {
  try {
    const allPosts = await Post.aggregate([
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "on_address",
          as: "addresses",
        },
      },
      { $sort: { date: -1 } },
      // { $unwind: "$addresses" },

      {
        $lookup: {
          from: "users",
          localField: "poster",
          foreignField: "_id",
          as: "users",
        },
      },

      {
        $lookup: {
          from: "agencies",
          localField: "poster",
          foreignField: "_id",
          as: "agencies",
        },
      },
      //  { $unwind: "$agencies" },
      // { $unwind: "$users" },

      // { $limit: 5 },
    ]);
    res.send({ msg: "all posts", posts: allPosts });
  } catch (error) {
    res.send({ error });
  }
};
exports.editPost = async (req, res) => {
  let id = req.body.id;
  let user = req.user;
  let agencyId = req.headers["_id"];
  const ref = identify(user, agencyId);
  let authorisation;

  if (req.user.role === "business") {
    let findAgency = await Agency.findById(ref.poster).select("id_user");
    authorisation = String(findAgency.id_user) == String(user._id);
  }
  if (req.user.role === "employer" || req.user.role === "particular") {
    authorisation = req.user._id === ref.poster;
  }
  if (authorisation) {
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
  } else
    return res
      .status(400)
      .send({ msg: "you are not authorized to edit this post", error });
};
exports.deletePost = async (req, res) => {
  let user = req.user;
  let id = req.params.id;
  let agencyId = req.headers["_id"];
  const ref = identify(user, agencyId);
  let authorisation;

  if (req.user.role === "business") {
    let findAgency = await Agency.findById(ref.poster).select("id_user");
    authorisation = String(findAgency.id_user) == String(user._id);
  }
  if (req.user.role === "employer" || req.user.role === "particular") {
    authorisation = req.user._id === ref.poster;
  }
  if (authorisation) {
    try {
      let post = await Post.findByIdAndRemove(id);

      res.status(200).send({ msg: "removed post", post });
    } catch (error) {
      res.status(400).send({ msg: "we can not remove post", error });
    }
  } else
    return res
      .status(400)
      .send({ msg: "you are not authorized to delete this post", error });
};
exports.findPost = async (req, res) => {
  let id = mongoose.Types.ObjectId(req.params.id);
  try {
    let post = await Post.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "on_address",
          as: "addresses",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "poster",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "characteristics",
          localField: "characteristics",
          foreignField: "_id",
          as: "characteristics",
        },
      },
    ]);

    res.status(200).send({ msg: "LOAD_POST_SUCCESSFULLY", post });
  } catch (error) {
    res.status(400).send({ msg: "CAN_NOT_LOAD_POST", error });
  }
};
exports.searchPosts = async (req, res) => {
  const regex = /\w+$/;
  let reqLocation = req.query.location || regex;
  let reqType = req.query.sType;
  let reqPrice = req.query.price || "9999999";
  console.log(reqLocation);
  try {
    let post = await Post.aggregate([
      { $match: { $and: [{ price: { $lte: reqPrice } }, { sType: reqType }] } },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "on_address",
          as: "addresses",
        },
      },
      { $unwind: "$addresses" },
      {
        $match: {
          $or: [
            { ["addresses.state"]: { $regex: reqLocation } },
            { ["addresses.city"]: { $regex: reqLocation } },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "poster",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "agencies",
          localField: "poster",
          foreignField: "_id",
          as: "agencies",
        },
      },
    ]);
    res.status(200).send({ msg: "finded post", post });
  } catch (error) {
    res.status(400).send({ msg: "post not found", error });
  }
};
