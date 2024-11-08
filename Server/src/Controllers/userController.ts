import { Request, Response } from "express";
import User from "../Models/userModel";

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    const err = error as Error;
    console.log("Error in user Controller ", err.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
