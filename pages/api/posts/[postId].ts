import Post from "@/models/post";
import Comment from "@/models/comment";
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { postId } = req.query;
    if (
      !postId ||
      typeof postId !== "string" ||
      !Types.ObjectId.isValid(postId)
    )
      throw new Error("Invalid ID");

    const post = await Post.findById(postId).populate(["user", "likedIds"]);
    if (!post) throw new Error("Invalid ID");
    // const comments = await Comment.find({ post: postId });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
