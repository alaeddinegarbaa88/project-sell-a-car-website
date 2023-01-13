const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await userSchema.findOne({ email });
    if (checkEmail) {
      return res.status(400).send("user already exist");
    }
    //if email not exist the system will create the new user
    const newUser = new userSchema(req.body);
    //Hash password / creaptage de mot de passe
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    // set the new hashed password
    newUser.password = hash;

    //partie token
    const payload = { id: newUser._id };
    var token = jwt.sign(payload, process.env.privateKey);

    await newUser.save();
    res.status(200).send({ msg: "welcome to the groupe", newUser, token });
  } catch (err) {
    res.status(500).send("can't add user");
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await userSchema.findOne({ email });

    if (!checkEmail) {
      return res.status(400).send("there is no user");
    }

    //checking password
    const match = await bcrypt.compare(password, checkEmail.password);

    if (!match) {
      return res.status(400).send("wrong password");
    }

    const payload = { id: checkEmail._id };
    var token = jwt.sign(payload, process.env.privateKey);
    res.status(200).send({ msg: "welcome", token, checkEmail });
  } catch (err) {
    res.status(500).send("please verify your login and password");
    console.log(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const Users = await userSchema.find();
    res.send(Users);
  } catch (err) {
    res.send({ msg: "no user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userSchema.findByIdAndRemove(id);
    res.status(200).send("user deleted");
  } catch (err) {
    res.status(500).send("can't delete");
    console.log(err);
  }
};
