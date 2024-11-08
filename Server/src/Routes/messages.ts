import express from "express";
import protectRoute from "../Middlewares/protectedRoute";
import { getMessages, sendMessage } from "../Controllers/messageController";


const messageRoute = express.Router();

messageRoute.get("/:id", protectRoute, getMessages);
messageRoute.post("/send/:id", protectRoute, sendMessage);

export default messageRoute;