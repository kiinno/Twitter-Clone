import User from "@/models/user";
import getAuthentication from "@/utils/serverAuth";
import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return res.status(405).end();
  try {
    const { user, session } = await getAuthentication(req, res);
    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) throw new Error("Missing fields");

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      name,
      username,
      bio,
      profileImage,
      coverImage,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
}
