import mongoose from "mongoose";
import Conversation from "../Models/conversationModel";
import User from "../Models/userModel";

export const deleteUserService = async (loggedIn: any, deletedId: string) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      loggedIn,
      {
        $addToSet: { deletedUsers: deletedId },
      },
      { new: true }
    );
    const remainingUsers = await User.find({
      _id: {
        $ne: new mongoose.Types.ObjectId(`${loggedIn}`),
        $nin: (updateUser?.deletedUsers || []).map(
          (e: string) => new mongoose.Types.ObjectId(e)
        ),
      },
    }).select("-password");
    const conversation = await Conversation.findOne({
      participants: { $all: [loggedIn, deletedId] },
    });

    if (conversation) {
      await Conversation.deleteOne({ _id: conversation?._id });
    }
    return remainingUsers;
  } catch (error) {
    return {
      error: "Internal Server Error",
      message: (error as Error).message,
    };
  }
};

export const allUserService = async (
  loggedInUserId: mongoose.Types.ObjectId | undefined
) => {
  try {
    const loggedInUser = await User.findById(loggedInUserId).select(
      "deletedUsers"
    );

    const filteredUsers = await User.find({
      _id: {
        $ne: new mongoose.Types.ObjectId(loggedInUserId?._id),
        $nin: (loggedInUser?.deletedUsers || []).map(
          (e: string) => new mongoose.Types.ObjectId(e)
        ),
      },
    }).select("-password");

    return filteredUsers;
    
  } catch (error) {
    return {
      error: "Internal Server Error",
      message: (error as Error).message,
    };
  }
};
