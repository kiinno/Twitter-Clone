import { Schema, models, model, SchemaTypes } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
    },
    bio: String,
    email: {
      type: String,
      unique: true,
    },
    emailVerified: Date,
    image: String,
    coverImage: String,
    profileImage: String,
    hashedPassword: String,
    followingIds: {
      type: [SchemaTypes.ObjectId],
      ref: "User",
    },
    posts: {
      type: [SchemaTypes.ObjectId],
      ref: "Post",
    },
    comments: {
      type: [SchemaTypes.ObjectId],
      ref: "Comment",
    },
    notifications: {
      type: [SchemaTypes.ObjectId],
      ref: "Notification",
    },
    hasNotification: Boolean,
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
