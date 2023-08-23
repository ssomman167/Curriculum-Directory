import { axiosErrorHandler } from "@/util/error";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let conversation: any = [];

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;

    conversation = [...data.userData, { role: "user", content: data?.prompt }];

    try {
      const response: any = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });

      const generatedMessage = response.data.choices[0].message.content;

      conversation.push({ role: "assistant", content: generatedMessage });

      res.status(200).json({ message: generatedMessage, conversation });
    } catch (error) {
      const err: any = axiosErrorHandler(error);
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
