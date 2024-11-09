import User from "../Models/userModel";

export const deleteUserService = async (loggedIn: any, deletedId: string) => {
  console.log("delete user=>", loggedIn, deletedId);
  try {
    const filteredUsers = await User.find({
      _id: { $nin: [loggedIn, deletedId] },
    }).select("-password");
    
    return filteredUsers;
  } catch (error) {
    return {
      error: "Internal Server Error",
      message: (error as Error).message,
    };
  }
};
