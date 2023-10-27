import Comment from "@/models/comment";
import Post from "@/models/post";
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
    const { body } = req.body;
    const { postId } = req.query;
    const { user, session } = await getAuthentication(req, res);

    if (
      !postId ||
      typeof postId !== "string" ||
      !Types.ObjectId.isValid(postId)
    )
      throw new Error("Invalid ID");

    const post = await Post.findById(postId);
    if (!post) throw new Error("Invalid ID");

    if (typeof body !== "string" && body.length < 1)
      throw new Error("Empty Comment");

    const comment = await Comment.create({
      user: user._id,
      post: postId,
      body: body,
    });

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
