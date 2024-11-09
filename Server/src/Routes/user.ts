import express from "express";
import protectRoute from "../Middlewares/protectedRoute";
import { deleteUser, getUsersForSidebar } from "../Controllers/userController";
const userRoute = express.Router();

userRoute.get("/", protectRoute, getUsersForSidebar);
userRoute.delete("/delete/:id",protectRoute,deleteUser)

export default userRoute;