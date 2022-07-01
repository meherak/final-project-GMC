const Post = require("../models/Post");

exports.posts = async (parent, args, context, info) => {
  return await Post.find();
};

exports.current = async (_, args, { user }) => {
  return user;
};
