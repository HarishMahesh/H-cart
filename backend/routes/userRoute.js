const express = require("express");
const {
  authenticateUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getAllusers,
  getUserDetails,
  updateUser,
} = require("../controllers/userController");
const checkAdmin = require("../middleware/checkAdmin");
const checkAuthorization = require("../middleware/checkAuthorization");

const router = express();

// public route
// to authurise the user
// /api/users/login
router.post("/login", authenticateUser);

// protected route
// to get user profile
// /api/users/profile
router.get("/profile", checkAuthorization, getUserProfile);

//protected route
// to update user profile
// /api/users/edit
router.put("/edit", checkAuthorization, updateUserProfile);

//public route
//to register user
// /api/users/register
router.post("/register", createUser);

// protected route and its only for admins
// to get all users
// /api/users/
router.get("/", checkAuthorization, checkAdmin, getAllusers);

// protected route and its only for admins
// to get user
// /api/users/:id

router.get("/:id", checkAuthorization, checkAdmin, getUserDetails);

// protected route and its only for admins
// to edit the users
// /api/users/:id

router.put("/:id", checkAuthorization, checkAdmin, updateUser);

module.exports = router;
