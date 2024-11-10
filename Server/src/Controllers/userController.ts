import { Request, response, Response } from "express";
import User from "../Models/userModel";
import { deleteUserService } from "../Services/userService";
import mongoose from "mongoose";


export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;
    
    const loggedInUser = await User.findById(loggedInUserId).select("deletedUsers")
    
    const filteredUsers = await User.find({
      _id: { 
        $ne: new mongoose.Types.ObjectId(loggedInUserId?._id),
        $nin: (loggedInUser?.deletedUsers || []).map(
          (e:string)=>new mongoose.Types.ObjectId(e))
        },
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req?.user?._id;
    const { id: deletedId } = req.params;

    const remainingUser = await deleteUserService(loggedInUserId, deletedId);
    res.status(200).json(remainingUser);
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
