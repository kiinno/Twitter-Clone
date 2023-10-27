import Post from "@/models/post";
import User from "@/models/user";
import getAuthentication from "@/utils/serverAuth";
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE")
    return res.status(405).end();

  try {
    const { postId } = req.body;
    const { user, session } = await getAuthentication(req, res);

    if (
      !postId ||
      typeof postId !== "string" ||
      !Types.ObjectId.isValid(postId)
    )
      throw new Error("Invalid ID");

    let query = {};
    if (req.method === "POST")
      query = {
        $addToSet: { likedIds: user._id },
      };

    if (req.method === "DELETE")
      query = {
        $pull: { likedIds: user._id },
      };

    const post = await Post.findByIdAndUpdate(postId, query, { new: true });

    if (!post) throw new Error("Invalid ID");

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
