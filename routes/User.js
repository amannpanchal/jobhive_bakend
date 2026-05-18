const express = require("express");

const {
  register,
  login,
  logOut,
  myprofile,
  editProfile,
} = require("../controllers/userController");

const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

// REGISTER
router.route("/register").post(register);

// LOGIN
router.route("/login").post(login);

// LOGOUT
router.route("/logout").get(isAuthenticated, logOut);

// GET PROFILE
router.route("/profile").get(isAuthenticated, myprofile);

// UPDATE PROFILE
router.route("/update").put(isAuthenticated, editProfile);

module.exports = router;
