import { axiosErrorHandler } from "@/util/error";
import userSchema from "@/model/conversation";
import connectDB from "../../db";
import mongoose from "mongoose";

let conversation: any = [];
let slug = "";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      await connectDB();

      const User = mongoose.models.User || mongoose.model("User", userSchema);

      if (data?.slug) {
        slug = data?.slug;

        let userConvos = await User.find({ slug: slug }, "role content -_id");

        conversation = [...userConvos];
      }

      res.status(200).json({ conversation, slug });
    } catch (error) {
      const err: any = axiosErrorHandler(error);
      console.log("err:", err);
      if (err?.error?.message) {
        res.status(500).json({ error: err?.error?.message });
      } else {
        res.status(500).json({ error: "An error occurred" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
