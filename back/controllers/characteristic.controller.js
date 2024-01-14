const Characteristic = require("../models/Characteristic");

// exports.addCharacteristic = async (req, res) => {
//   let postId = req.headers["_id"];
//   let cr = postId;
//   const ref = identify(cr, postId);
//   //
//   let newPost;
//   let { characteristic, ...rest } = req.body;
//   let newCharacteristic  = new Characteristic({...characteristic})
//   try {
//     await newCharacteristic.save();
//     newPost = new Post({
//       ...rest,
//       ...ref,
//       characteristic: newCharacteristic._id
//     });
//     await newPost.save();
//     res.send({ msg: "post is saved", post: newPost });
//   } catch (error) {
//     console.log(error);
//     res.status(403).send({ errors: [{ msg: "can not add post", error }] });
//   }
// }

exports.list = async (req, res) => {
  try {
    const allCharacteristics = await Characteristic.find();
    res.send({ msg: "CHARACTERISTICS_LOADED_SUCCESSFULLY", data: allCharacteristics });
  } catch (error) {
    res.send({ error });
  }
};

// const seedCharacteristique = () => {
//   const caracteristiqueValues = [
//     {
//       name: "Terrace",
//     },
//   ];
// };

