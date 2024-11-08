import { Request, Response } from "express";
import User from "../Models/userModel";
import bcrypt from "bcryptjs";
import { generateToken, setTokenCookie } from "../Utils/token";

export interface LoginResponce {
  _id: string;
  fullName: string;
  username: string;
  profilePic?: string;
}
export interface ErrorLogin {
  error: string;
  message?: string;
}
export const LoginService = async (
  request: any,
  res: Response
): Promise<LoginResponce | ErrorLogin> => {
  try {
    const { username, password } = request;
    const existedUser = await User.findOne({ username });
    const checkPassword = await bcrypt.compare(
      password,
      existedUser?.password ?? ""
    );
    if (!existedUser || !checkPassword) {
      throw new Error("Invalid credentials");
    }

    let token = generateToken(existedUser._id.toString());
    setTokenCookie(res, token);

    return {
      _id: existedUser._id.toString(),
      fullName: existedUser.fullName,
      username: existedUser.username,
      profilePic: existedUser.profilePic,
    };
  } catch (error) {
    return {
      error: "Internal Server Error",
      message: (error as Error).message,
    };
  }
};

export const signupService = async (request: any,res:Response):Promise<LoginResponce|ErrorLogin> => {
  try {
    const { fullName, username, password, confirmPassword, gender } = request;
    if (password !== confirmPassword) {
      throw new Error("Passwords don't match");
    }
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("Username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      let token = generateToken(newUser._id.toString());
      setTokenCookie(res, token);

      await newUser.save();

      return{
        _id: newUser._id.toString(),
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      };
    } else {
      throw new Error( "Invalid user data" )
    }
  } catch (error) {
    const err = error as Error;
    return {
      error: "Internal Server Error",
      message: err.message,
    };
  }
};
