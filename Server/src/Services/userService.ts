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
