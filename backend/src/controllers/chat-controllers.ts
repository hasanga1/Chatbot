// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import OpenAI from "openai";

// // Define the expected message format for the OpenAI API
// interface ChatCompletionMessageParam {
//   role: "system" | "user" | "assistant";
//   content: string;
// }

// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { message } = req.body;
//     const userId = res.locals.jwtData.id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(401).json({ message: "User not registered" });
//     }

//     // Ensure the role is one of the allowed values
//     const chats: ChatCompletionMessageParam[] = user.chats.map(
//       ({ role, content }) => ({
//         role: role as "user" | "assistant", // Type assertion to ensure correct role values
//         content,
//       })
//     );

//     // Add the new message with role 'user'
//     chats.push({ content: message, role: "user" });

//     // Initialize the OpenAI client
//     const openai = new OpenAI({
//       apiKey: process.env.OPEN_AI_SECRET,
//     });

//     // Make the API request
//     const chatResponse = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: chats,
//     });

//     // Handle response
//     if (chatResponse.choices && chatResponse.choices.length > 0) {
//       const assistantMessage = chatResponse.choices[0].message;

//       // Push the assistant's response to the user's chats
//       user.chats.push({
//         content: assistantMessage.content,
//         role: "assistant",
//       });

//       // Respond to the client with the assistant's message
//       res.json(assistantMessage);
//       await user.save();
//       return res.status(200).json({chats: user.chats})
//     } else {
//       res.status(500).json({ message: "No choices in response" });
//     }
//   } catch (error) {
//     console.error("Error generating chat completion:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import OpenAI from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const userId = res.locals.jwtData.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    // Add the user's input message to the chat history
    user.chats.push({ content: message, role: "user" });

    // Prepare chat messages for the OpenAI API
    const chats = user.chats.map(({ role, content }) => ({
      role: role as "system" | "user" | "assistant",
      content,
    }));

    // Initialize the OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_SECRET,
    });

    // Make the API request to generate the AI's response
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // Add the AI's response to the chat history
    const assistantMessage = chatResponse.choices[0].message;
    user.chats.push(assistantMessage);

    // Save the updated user data
    await user.save();

    // Return the updated chat history
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("Error generating chat completion:", error);

    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
};
