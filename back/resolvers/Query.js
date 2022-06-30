const Post=require('../models/Post');

exports.posts = async(parent, args, context, info) => {
    
return await Post.find()
    
}