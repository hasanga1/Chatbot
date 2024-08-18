import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";

const chatRoutes = Router();

chatRoutes.post("/new", verifyToken, generateChatCompletion);

export default chatRoutes;