const UserData = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../middleware/sendMail");

const frontendUserOutput = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// Register User
const registerUser = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword || !password || !confirmPassword)
      return res
        .status(500)
        .json({ msg: "Passwords don't match, or not provided" });
    const user = new UserData(req.body);
    const token = await user.generateToken();
    if (!token)
      return res
        .status(404)
        .json({ msg: "Token not generated while registering" });
    await user.save();
    res.cookie("vibe", token, {
      httpOnly: true,
    });
    return res
      .status(201)
      .json({ msg: "Success", user: frontendUserOutput(user) });
  } catch (error) {
    return res.status(500).json({ msg: "Registration Failed", error });
  }
};

// Login User
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(404).json({ msg: "Fields Empty" });
    const user = await UserData.findOne({ email });
    if (!user) return res.status(402).json({ msg: "User doesn't exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ msg: "Wrong Credentials" });
    if (user.tokens.length > 5) user.tokens = [];
    const token = await user.generateToken();
    await user.save();
    res.cookie("vibe", token, {
      httpOnly: true,
    });
    res
      .status(201)
      .json({ msg: "Login successful", user: frontendUserOutput(user) });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

// Get Single User
const getSingleUser = async (req, res, next) => {
  try {
    res
      .status(201)
      .json({ msg: "Success", user: frontendUserOutput(req.user) });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

// Get All User
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserData.find();
    const filteredUsers = users.map((user) => frontendUserOutput(user));
    res.status(201).json({ msg: "Success", filteredUsers });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

// Log Out User
const logoutUser = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObject) => {
      return tokenObject.token != req.token;
    });
    res.clearCookie("vibe");
    await req.user.save();
    return res.status(201).json({ msg: "Logout Success" });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

// Update Password
const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword === oldPassword)
      return res
        .status(404)
        .json({ error: "old password can't be used as new password" });
    if (newPassword !== confirmPassword)
      return res.status(404).json({ error: "new Passwords don't match" });
    const isMatch = await bcrypt.compare(oldPassword, req.user.password);
    if (!isMatch) return res.status(404).json({ error: "Incorrect Password" });
    req.user.password = newPassword;
    const token = await req.user.generateToken();
    await req.user.save();
    res.cookie("vibe", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.status(201).json({ msg: "Success" });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

// Update Profile
const updateProfile = async (req, res, next) => {
  try {
    const user = await UserData.findOneAndUpdate(
      { email: req.user.email },
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json({ msg: "Success", user: frontendUserOutput(user) });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

// Forgot Password
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserData.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User doesn't exist" });
    if (user.resetPassword.resetPasswordToken) {
      user.resetPassword.resetPasswordToken = undefined;
      user.resetPassword.resetPasswordTime = undefined;
    }
    user.resetPassword.resetPasswordToken = await user.generateToken();
    user.resetPassword.resetPasswordTime = Date.now();
    await user.save();
    const resetPasswordUrl = `${process.env.FRONTEND_RUL}/user/reset/${user.resetPassword.resetPasswordToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email, then please ignore it.`;
    await sendMail({
      email: user.email,
      subject: `Vibe Password Recovery`,
      message,
    });
    return res
      .status(200)
      .json({ msg: `Successfully sent email to ${user.email}.` });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

// Reset Password
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserData.findOne({ _id: verifyUser._id });
    if (token !== user.resetPassword.resetPasswordToken)
      return res
        .status(500)
        .json({ msg: "Token Expired, request email again" });
    if (Date.parse(user.resetPassword.resetPasswordTime) + 300000 < Date.now())
      return res.status(500).json({ msg: "Illegal Token, already Expired" });
    if (password !== confirmPassword)
      return res
        .status(500)
        .json({ msg: "Passwords don't match, please check again" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch)
      return res
        .status(500)
        .json({ msg: "Cannot use Previous Password As Old Password" });
    user.passord = password;
    const newToken = await user.generateToken();
    await user.save();
    res.cookie("vibe", newToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return res.status(200).json({ msg: "Success" });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

// Delete User Account
const deleteUser = async (req, res, next) => {
  try {
    const user = await UserData.findOneAndDelete({ email: req.user.email });
    return res
      .status(201)
      .json({ msg: "Deleted", user: frontendUserOutput(user) });
  } catch (error) {
    return res.status(500).json({ msg: "Login Failed", error });
  }
};

module.exports = {
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
};
