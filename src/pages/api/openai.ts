// import { axiosErrorHandler } from "@/util/error";
// import axios from "axios";
// // import axios from "axios";
// import { NextApiRequest, NextApiResponse } from "next";

// import { Configuration, OpenAIApi } from "openai";

// // This is the real api

// const configuration = new Configuration({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const conversation: any = [];

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   if (req.method === "POST") {
//     const data = req.body;
//     console.log("data:", data);

//     conversation.push({ role: "user", content: "hi" });

//     try {
//       const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         // text-davinci-003
//         messages: conversation,
//         max_tokens: 300,
//         temperature: 0.5,
//       });

//       // const response = await axios.post(
//       //   "https://api.openai.com/v1/chat/completions",
//       //   {
//       //     model: "gpt-3.5-turbo",
//       //     messages: [
//       //       {
//       //         role: "system",
//       //         content: "Return the answer as a markdown.\n",
//       //       },
//       //       ...data.userData,
//       //       { role: "user", content: data.prompt },
//       //     ],
//       //   },
//       //   {
//       //     headers: {
//       //       Authorization: `Bearer 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`,
//       //       "Content-Type": "application/json",
//       //     },
//       //   }
//       // );

//       const userData: any = data.userData;

//       res.status(200).json([
//         ...userData,
//         {
//           role: "user",
//           prompt: data.prompt,
//           createdAt: new Date(),
//         },
//         {
//           role: "assistant",
//           createdAt: new Date(),
//           fullResponse: response,
//           response: response.data.choices[0].text,
//         },
//       ]);
//     } catch (error) {
//       // console.log("error:", error);
//       const err: any = axiosErrorHandler(error);
//       console.log("err:", err);

//       if (err?.error?.message) {
//         res.status(500).json({ error: err?.error?.message });
//       } else {
//         res.status(500).json({ error: "An error occurred" });
//       }
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }

// import { axiosErrorHandler } from "@/util/error";

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const conversation: any = [];

// export default async function handler(req: any, res: any) {
//   if (req.method === "POST") {
//     const data = req.body;
//     console.log("data:", data);

//     conversation.push({ role: "user", content: "hi" });

//     try {
//       const response: any = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: "Hello world" }],
//       });

//       const generatedMessage = response.data.choices[0].message.content;
//       conversation.push({ role: "assistant", content: generatedMessage });

//       res.status(200).json({ message: generatedMessage });
//     } catch (error) {
//       const err: any = axiosErrorHandler(error);
//       if (err?.error?.message) {
//         res.status(500).json({ error: err?.error?.message });
//       } else {
//         res.status(500).json({ error: "An error occurred" });
//       }
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
