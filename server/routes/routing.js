const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

// User Controllers
const {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  logoutUser,
  updatePassword,
  updateProfile,
  forgotPassword,
  deleteUser,
  resetPassword,
} = require("../controllers/userController");

// User Routes
router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user").get(auth, getSingleUser);
router.route("/user/allUsers").get(auth, getAllUsers);
router.route("/user/logout").get(auth, logoutUser);
router.route("/user/updatePassword").post(auth, updatePassword);
router.route("/user/updateProfile").put(auth, updateProfile);
router.route("/user/forgotPassword").post(forgotPassword);
router.route("/user/deleteAccount").delete(auth, deleteUser);
router.route("/user/reset/:token").put(resetPassword);

module.exports = router;
