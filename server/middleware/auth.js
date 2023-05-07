const jwt = require("jsonwebtoken");
const UserData = require("../models/userSchema");

const auth = async (req, res, next) => {
  try {
    const { vibe } = req.cookies;
    if (!vibe) return next(new Error("Please login to Access this resource"));
    const verifyUser = jwt.verify(vibe, process.env.JWT_SECRET_KEY);
    req.user = await UserData.findOne({ _id: verifyUser._id });
    if (!req.user) return res.status(402).json({ msg: "User doesn't exist, can't access the resource" });
    req.token = vibe;
    next();
  } catch (error) {
    console.log("Error in authorization", error);
  }
};

module.exports = auth;
