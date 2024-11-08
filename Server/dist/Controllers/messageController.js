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
exports.getMessages = exports.sendMessage = void 0;
const conversationModel_1 = __importDefault(require("../Models/conversationModel"));
const messageModel_1 = __importDefault(require("../Models/messageModel"));
const mongoose_1 = require("mongoose");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
        let conversation = yield conversationModel_1.default.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = yield conversationModel_1.default.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new messageModel_1.default({
            senderId,
            receiverId,
            message,
        });
        if (newMessage._id instanceof mongoose_1.Types.ObjectId) {
            conversation === null || conversation === void 0 ? void 0 : conversation.messages.push(newMessage._id);
        }
        yield Promise.all([conversation.save(), newMessage.save()]);
        // SOCKET IO FUNCTIONALITY WILL GO HERE
        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        // 	// io.to(<socket_id>).emit() used to send events to specific client
        // 	io.to(receiverSocketId).emit("newMessage", newMessage);
        // }
        res.status(201).json(newMessage);
    }
    catch (error) {
        const err = error;
        console.log("Error in message controller", err.message);
        res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id: userToChatId } = req.params;
        const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const conversation = yield conversationModel_1.default.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");
        //it will return array of object of messages 
        if (!conversation)
            return res.status(200).json([]);
        const messages = conversation === null || conversation === void 0 ? void 0 : conversation.messages;
        res.status(200).json(messages);
    }
    catch (error) {
        const err = error;
        console.log("Error in message controller", err.message);
        res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
});
exports.getMessages = getMessages;
