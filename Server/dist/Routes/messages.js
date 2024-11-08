"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectedRoute_1 = __importDefault(require("../Middlewares/protectedRoute"));
const messageController_1 = require("../Controllers/messageController");
const router = express_1.default.Router();
router.get("/:id", protectedRoute_1.default, messageController_1.getMessages);
router.post("/send/:id", protectedRoute_1.default, messageController_1.sendMessage);
exports.default = router;
