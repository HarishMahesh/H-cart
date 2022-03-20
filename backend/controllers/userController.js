const getJWTtoken = require("../config/getJWTtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      let token = await getJWTtoken(user);
      res.status(200).json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
        token: token,
      });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  let { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Input data missing" });
  }

  try {
    let userFound = await User.find({ email: email });

    if (userFound.length > 0) {
      return res.status(400).json({ message: "Email allready exists" });
    }

    password = await bcrypt.hash(password, 10);

    let user = await User.create({
      name,
      email,
      password,
      isAdmin,
    });
    let token = await getJWTtoken(user);

    res.status(200).json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  let name = req.body.name || req.user.name;
  let email = req.body.email || req.user.email;
  let password;
  if (req.body.password) {
    password = await bcrypt.hash(req.body.password, 10);
  } else {
    password = req.user.password;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        password,
      },
      {
        new: true,
      }
    );
    let token = await getJWTtoken(updatedUser);
    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      _id: updatedUser._id,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getAllusers = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let isAdmin = req.body.isAdmin;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        isAdmin,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      _id: updatedUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUserDetails,
  authenticateUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getAllusers,
  updateUser,
};
