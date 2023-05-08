const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
      required: true,
    },
    postImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        required: true,
        type: String,
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
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

const PostData = new mongoose.model("postdata", postSchema);

module.exports = PostData;
