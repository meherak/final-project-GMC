import { Characteristic } from "../models/Characteristic";
import { Post } from "../models/Post";

exports.addCharacteristic = async (req, res) => {
  let postId = req.headers["_id"];
  let cr = postId;
  const ref = identify(cr, postId);
  //
  let newPost;
  let { characteristic, ...rest } = req.body;
  let newCharacteristic  = new Characteristic({...characteristic})
  try {
    await newCharacteristic.save();
    newPost = new Post({
      ...rest,
      ...ref,
      characteristic: newCharacteristic._id
    });
    await newPost.save();
    res.send({ msg: "post is saved", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(403).send({ errors: [{ msg: "can not add post", error }] });
  }
} 

 // let post = new Post({
   // postId:newCharacteristic._id,
    //adresse:String,
    //price:Number
  //})

  //post.save(function(err){
    //if (err) return handleError(err);

  //})

//};


