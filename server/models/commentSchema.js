import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "status: failed - Please enter the message"],
      validate: {
        validator: function (field) {
          return isEmpty(field);
        },
        message: () => {
          return "status: failed - Please enter a nessage";
        },
      },
    },
    user: {
      required: [true, "status: failed - Please enter the user's id"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
