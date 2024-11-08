import express from "express";
import protectRoute from "../Middlewares/protectedRoute";
import { getUsersForSidebar } from "../Controllers/userController";
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;