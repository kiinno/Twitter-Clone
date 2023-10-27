import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options } from "@/pages/api/auth/[...nextauth]";
import User from "@/models/user";
import connectDB from "./connectDB";

export default async function getAuthentication(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options);

  if (!session?.user?.email) throw new Error("Not signed in");

  const user = await User.findOne({ email: session.user.email });
  if (!user) throw new Error("Not signed in");

  return { user, session };
}
