import Post from "@/models/post";
import connectDB from "@/utils/connectDB";
import getAuthentication from "@/utils/serverAuth";
import { Types } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { createSearchParamsBailoutProxy } from "next/dist/client/components/searchparams-bailout-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET")
    return res.status(405).end();

  try {
    if (req.method === "POST") {
      const { session, user } = await getAuthentication(req, res);
      const { body } = req.body;
      const post = await Post.create({ body, user: user._id });
      return res.status(200).json(post);
    } else {
      const { userId } = req.query;
      let posts = [];
      if (
        userId &&
        typeof userId === "string" &&
        Types.ObjectId.isValid(userId)
      ) {
        posts = await Post.find({ user: userId })
          .sort({ createdAt: "desc" })
          .populate([{ path: "user" }, { path: "likedIds" }]);
        console.log(posts);
      } else {
        posts = await Post.find({})
          .sort({ createdAt: "desc", likedIds: "desc" })
          .populate([{ path: "user" }, { path: "likedIds" }]);
      }
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
