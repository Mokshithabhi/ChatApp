import { Request, response, Response } from "express";
import User from "../Models/userModel";
import { deleteUserService } from "../Services/userService";

var deletedUsersList:string[] =[]

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;
    console.log("for the users",loggedInUserId)

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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req?.user?._id;
    const { id: deletedId } = req.params;
    deletedUsersList.push(deletedId)
    const remainingUser = await deleteUserService(loggedInUserId, deletedId);
    res.status(200).json(remainingUser);
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
