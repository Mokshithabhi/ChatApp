import express from "express";
import protectRoute from "../Middlewares/protectedRoute";
import { getUsersForSidebar } from "../Controllers/userController";
const userRoute = express.Router();

userRoute.get("/", protectRoute, getUsersForSidebar);

export default userRoute;