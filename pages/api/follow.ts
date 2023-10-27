import User from "@/models/user";
import getAuthentication from "@/utils/serverAuth";
import { SchemaTypes, Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE")
    return res.status(405).end();

  try {
    const { user, session } = await getAuthentication(req, res);
    const { userId } = req.body;

    if (
      !userId ||
      typeof userId !== "string" ||
      !Types.ObjectId.isValid(userId)
    )
      throw new Error("Invalid ID");

    let query = {};

    if (req.method === "POST") {
      // follow
      const isExists = await User.findById(userId);
      if (!isExists) throw new Error("Invalid ID");
      query = {
        $addToSet: { followingIds: userId },
      };
    } else if (req.method === "DELETE") {
      // unfollow
      query = {
        $pull: { followingIds: userId },
      };
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, query, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
}
