import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (userId: string): string => {

	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) {
		throw new Error("JWT_SECRET is not defined in environment variables");
	}

	return jwt.sign({ userId }, jwtSecret, {
		expiresIn: "15d",
	});
};

const setTokenCookie = (res: Response, token: string): void => {

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true,
		sameSite: "strict",
	});
};

export { generateToken, setTokenCookie };