const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

// const updateAvatar = async (req, res, next) => {
//   const { path: tempUpload, originalname } = req.file;
//   const { _id: id } = req.user;
//   const imageName = `${id}_${originalname}`;
//   try {
//     const resultUpload = path.join(avatarsDir, imageName);

//     const rawAvatar = await Jimp.read(tempUpload);
//     rawAvatar.resize(250, 250);
//     await rawAvatar.writeAsync(tempUpload);

//     await fs.rename(tempUpload, resultUpload);
//     const avatarURL = path.join("public", "avatars", imageName);
//     await User.findByIdAndUpdate(req.user._id, { avatarURL });
//     res.json({ avatarURL });
//   } catch (error) {
//     await fs.unlink(tempUpload);
//     throw error;
//   }
// };

const updateAvatar = async (request, response, next) => {
  const { _id } = request.user;
  const { path: tempUpload, originalname } = request.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  const rawAvatar = await Jimp.read(tempUpload);
  rawAvatar.resize(250, 250);
  await rawAvatar.writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  response.json({ avatarURL });
};

module.exports = updateAvatar;
