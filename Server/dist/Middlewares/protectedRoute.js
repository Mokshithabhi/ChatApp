"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../src/Models/userModel"));
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!decoded || !(decoded === null || decoded === void 0 ? void 0 : decoded.userId)) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        // if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
        const user = yield userModel_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user || "";
        next();
        //   }
    }
    catch (error) {
        const err = error;
        console.log("Error in protectRoute middleware: ", err.message);
        res
            .status(500)
            .json({ error: "Internal server error", message: err.message });
    }
});
exports.default = protectRoute;
