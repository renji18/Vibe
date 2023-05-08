const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserData",
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const CommentData = new mongoose.model("commentdata", commentSchema);

module.exports = CommentData;
