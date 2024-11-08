"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectedRoute_1 = __importDefault(require("../Middlewares/protectedRoute"));
const userController_1 = require("../Controllers/userController");
const router = express_1.default.Router();
router.get("/", protectedRoute_1.default, userController_1.getUsersForSidebar);
exports.default = router;
