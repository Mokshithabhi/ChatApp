import express from "express";
import protectRoute from "../Middlewares/protectedRoute";
import { getMessages, sendMessage } from "../Controllers/messageController";


const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;