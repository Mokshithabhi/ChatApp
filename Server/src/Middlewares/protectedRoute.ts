import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../../src/Models/declarations/modelDec";
import User from "../../src/Models/userModel";

interface JwtPayload {
  userId: string;
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || typeof jwtSecret !== "string") {
      return res
        .status(500)
        .json({
          error: "Internal server error - JWT secret is missing or invalid",
        });
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload | undefined;

    if (!decoded || !decoded?.userId) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    // if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {

    const user: IUser = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user || "";
    next();
    //   }
  } catch (error) {
    const err = error as Error;
    console.log("Error in protectRoute middleware: ", err.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export default protectRoute;
