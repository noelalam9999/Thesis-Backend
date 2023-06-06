const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const SECRET_KEY = process.env.JWT_SECRET_KEY ||"hihuha";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) return res.status(409).send({ message: "User already exists" });
  try {
    if (password === "") throw new Error();
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashPassword });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({accessToken:accessToken, userId:_id, message:"User Created Successfully"});
  } catch (error) {
    res.status(400).send({ messages: "Could not create User" });
  }
};

const gAuthRegister = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const accessToken = jwt.sign(user.email, SECRET_KEY);
    return res.status(409).send({ message: "User already exists", userInfo: user, accessToken: accessToken });
  }
  try {
    const newUser = new User(req.body );
    const { _id , type} = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    // const message = "User Created Successfully";
    res.status(201).send({accessToken:accessToken, userId:_id, type:type, message:"User Created Successfully"});
  } catch (error) {
    res.status(400).send({ messages: "Could not create User" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(409).send({ message: "User not found" });

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) throw new Error();

    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken, type: user.type, id: user._id, profilePic : user.profilePic });
  } catch (error) {
    res.status(401).send({ messages: "Username or password is incorrect" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userid });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User not Found" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  const accessToken = req.cookies.token;
  if (accessToken) {
    invalidateToken(accessToken);
  }
  res.redirect("/login");
};

const updateUserType = async (req, res) => {
  try {
    const { userId, type } = req.params;
    const update = {type:type};
      
    const result = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send(error);
  }
}

module.exports = { register, login, profile, logout, gAuthRegister, updateUserType };
