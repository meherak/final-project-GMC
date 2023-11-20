import { Characteristic } from "../models/Caracteristic";
import { Post } from "../models/Caracteristic";

exports.addNewCharacteristic = async (req, res) => {
    let postId = req.headers["_id"];
    let user = req.user;
    const ref = identify(user, postId);
    let newPost;
    newPost = new Post({
      ...req.body,
      ...ref,
    });
  
    try {
      let Characteristic = await newPost.save();
      res.send({ msg: "characteristics are saved", Characteristic });
    } catch (error) {
      console.log(error);
      res.status(403).send({ errors: [{ msg: "can not add characteristic", error }] });
    }
  };