const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide A Name"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "Please Provide A UserName"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Provide An Email"],
      unique: [true, "Duplicate Email Provided"],
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Please Provide A Valid Email");
      },
    },
    number: {
      type: Number,
      validate(value) {
        if (value.toString().length !== 10)
          throw new Error("Please Provide A Valid Number");
      },
    },
    bio: {
      type: String,
    },
    accountType: {
      type: String,
      required: true,
      default: "public",
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    resetPassword: {
      resetPasswordToken: {
        type: String,
      },
      resetPasswordTime: {
        type: Date,
      },
    },
    password: {
      type: String,
      required: [true, "Please Provide A Password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please Provide Confirm Password"],
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostData",
      },
    ],
    chat: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserData",
        },
        chat: {
          type: String,
        },
      },
    ],
    notifications: {
      request: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      likes: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserData",
          },
          postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostData",
          },
        },
      ],
      comments: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserData",
          },
          commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommentData",
          },
        },
      ],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    return token;
  } catch (error) {
    res.send("Error part in token generation inside model");
  }
};

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) next();
    await bcrypt.hash(this.password, 10).then((data) => {
      this.password = data;
    });
    await bcrypt.hash(this.confirmPassword, 10).then((data) => {
      this.confirmPassword = data;
    });
    next();
  } catch (error) {
    console.log("Error while hashing inside the model", error);
  }
});

const UserData = new mongoose.model("userdata", userSchema);

module.exports = UserData;
