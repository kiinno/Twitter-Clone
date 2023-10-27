import { Schema, models, model, SchemaTypes } from "mongoose";

const postSchema = new Schema(
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
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

postSchema.virtual("CommentsAvilable", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

const Post = models?.Post || model("Post", postSchema);

export default Post;
