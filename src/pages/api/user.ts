import { v4 as uuidv4 } from "uuid";
import { axiosErrorHandler } from "@/util/error";
import { Configuration, OpenAIApi } from "openai";
import userSchema from "@/model/conversation";
import connectDB from "../../db";
import mongoose from "mongoose";

let conversation: any = [];
let slug = "";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
      await connectDB();

      const User = mongoose.models.User || mongoose.model("User", userSchema);

      const data = req.body;
      console.log("data:", data);

      if (!data?.slug) {
        slug = uuidv4();

        const userData = new User({
          role: "user",
          content: data?.prompt,
          slug: slug,
        });

        await userData.save();

        conversation = [{ role: "user", content: data?.prompt }];
      } else {
        slug = data?.slug;

        const userData = new User({
          role: "user",
          content: data?.prompt,
          slug: slug,
        });

        await userData.save();

        let userConvos = await User.find({ slug: slug }, "role content -_id");

        conversation = [...userConvos];
      }

      const response: any = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });

      const generatedMessage = response.data.choices[0].message.content;

      conversation.push({ role: "assistant", content: generatedMessage });

      const userData = new User({
        role: "assistant",
        content: generatedMessage,
        slug: slug,
      });

      await userData.save();

      res.status(200).json({ message: generatedMessage, conversation, slug });
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
