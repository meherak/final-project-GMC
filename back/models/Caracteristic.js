const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caracteristicSchema = Schema({
    _id: Schema.Types.ObjectId,
    space: Number,
    numberOfRooms: Number,
    adresse:String,
    post: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  });
  
  const postSchema = Schema({
    caracteristic: { type: Schema.Types.ObjectId, ref: 'Characteristic' },
    title: String,
    price:Number,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Characteristic' }]
  });
  
  const Caracteristic = mongoose.model('Characteristic', caracteristicSchema);
  const Post = mongoose.model('Post', postSchema);

  module.exports.Characteristic = mongoose.model('Characteristic', caracteristicSchema);
  module.exports.Post = mongoose.model('Post', postSchema);
