import Post from "@/models/post";
import User from "@/models/user";
import Comment from "@/models/comment";

import { ConnectOptions, connect } from "mongoose";
let mongooseClient: any;
let options: ConnectOptions = {};

export default async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  if (!mongooseClient) {
    mongooseClient = await connect(process.env.MONGODB_URI, options);
    await Comment.find();
    await Post.find();
    await User.find();
    return mongooseClient;
  }
  return mongooseClient;
}
