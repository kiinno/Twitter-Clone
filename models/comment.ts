import { Schema, models, model, SchemaTypes } from "mongoose";

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    likedIds: {
      type: [SchemaTypes.ObjectId],
      ref: "User",
    },
    post: {
      type: SchemaTypes.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Comment = models.Comment ?? model("Comment", commentSchema);

export default Comment;
