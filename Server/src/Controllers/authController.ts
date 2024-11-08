import { Request, Response } from "express";
import User from "../Models/userModel";
import bcrypt from "bcryptjs";
import { generateToken, setTokenCookie } from "../Utils/token";

export const login = async (req: Request, res: Response):Promise<any> => {
  try {
    const { username, password } = req.body;
    const existedUser = await User.findOne({ username });
    const checkPassword = await bcrypt.compare(
      password,
      existedUser?.password ?? ""
    );
    if (!existedUser || !checkPassword) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    let token = generateToken(existedUser._id as string);
    setTokenCookie(res, token);

    res.status(201).json({
      _id: existedUser._id,
      fullName: existedUser.fullName,
      username: existedUser.username,
      profilePic: existedUser.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", (error as Error).message);
    res.status(500).json({
      error: "Internal Server Error",
      message: (error as Error).message,
    });
  }
};

export const signup = async (req: Request, res: Response):Promise<any> => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

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
      let token = generateToken(newUser._id as string);
      setTokenCookie(res, token);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", (error as Error).message);
    res.status(500).json({
      error: "Internal Server Error",
      message: (error as Error).message,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try{

     res.cookie("jwt","",{maxAge:0})
	 res.status(200).json('successfully logout')
  }
  catch (error) {
    console.log("Error in login controller", (error as Error).message);
    res.status(500).json({
      error: "Internal Server Error",
      message: (error as Error).message,
    });
  }
};
