import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import User from "@/models/user";
import connectDB from "@/utils/connectDB";
connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, username, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, username, name, hashedPassword });

    res.status(200).json(user);
  } catch (error: any) {
    console.log(error.message);
    if (error.code && error.code === 11000) {
      const invalidField = Object.keys(error.keyValue);
      error.message = `${invalidField} '${error.keyValue[invalidField]}' is already used`;
    }
    res.status(400).json({ ...error, message: error?.message ?? "" });
  }
}
