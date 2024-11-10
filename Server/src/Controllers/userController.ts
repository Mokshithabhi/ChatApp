import { Request, response, Response } from "express";
import User from "../Models/userModel";
import { allUserService, deleteUserService } from "../Services/userService";
import mongoose from "mongoose";


export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;
    const allUsers = await allUserService(loggedInUserId )
    res.status(200).json(allUsers);
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
