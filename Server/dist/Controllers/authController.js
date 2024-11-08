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
exports.logout = exports.signup = exports.login = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = require("../Utils/token");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, password } = req.body;
        const existedUser = yield userModel_1.default.findOne({ username });
        const checkPassword = yield bcryptjs_1.default.compare(password, (_a = existedUser === null || existedUser === void 0 ? void 0 : existedUser.password) !== null && _a !== void 0 ? _a : "");
        if (!existedUser || !checkPassword) {
            return res.status(400).json({
                error: "Invalid credentials",
            });
        }
        let token = (0, token_1.generateToken)(existedUser._id);
        (0, token_1.setTokenCookie)(res, token);
        res.status(201).json({
            _id: existedUser._id,
            fullName: existedUser.fullName,
            username: existedUser.username,
            profilePic: existedUser.profilePic,
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        const user = yield userModel_1.default.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new userModel_1.default({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        if (newUser) {
            let token = (0, token_1.generateToken)(newUser._id);
            (0, token_1.setTokenCookie)(res, token);
            yield newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        });
    }
});
exports.signup = signup;
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json('successfully logout');
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        });
    }
};
exports.logout = logout;
