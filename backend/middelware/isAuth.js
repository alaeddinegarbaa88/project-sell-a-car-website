var jwt = require("jsonwebtoken");
const userSchema = require("../models/user");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    var decoder = jwt.verify(token, process.env.privateKey);

    if (!decoder) {
      return res.status(400).send({ msg: "you are not welcome" });
    }

    const user = await userSchema.findById(decoder.id);
    if (!user) {
      throw new Error("user not found");
    }

    user.password = undefined;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Error" });
  }
};
