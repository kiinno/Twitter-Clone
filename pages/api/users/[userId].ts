import User from "@/models/user";
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { userId } = req.query;
    if (
      !userId ||
      typeof userId !== "string" ||
      !Types.ObjectId.isValid(userId)
    )
      throw new Error("Invalid ID");

    const existingUser = await User.findById(userId).select({
      hashedPassword: 0,
    });
    const followersCount = await User.find({
      followingIds: { $in: userId },
    }).countDocuments();

    return res.status(200).json({ ...existingUser._doc, followersCount });
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
}
