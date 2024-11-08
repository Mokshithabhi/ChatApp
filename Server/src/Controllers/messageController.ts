import { Request, Response } from "express";
import Conversation from "../Models/conversationModel";
import Message from "../Models/messageModel";
import { IMessage } from "../Models/declarations/modelDec";
import { Types } from "mongoose";
import { getReceiverSocketId, io } from "../Socket/socket";

export const sendMessage = async (req:Request, res:Response) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId =  req.user?._id || "";

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage:IMessage  = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage._id instanceof Types.ObjectId) {
            conversation?.messages.push(newMessage._id);
          }

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
        const err = error as Error;
        console.log("Error in message controller", err.message);
        res.status(500).json({
          error: "Internal Server Error",
          message: err.message,
        });
      }
};

export const getMessages = async (req:Request, res:Response):Promise<any> => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user?._id ;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");
		 //it will return array of object of messages 

		if (!conversation) return res.status(200).json([]);

		const messages = conversation?.messages;

		res.status(200).json(messages);
	} catch (error) {
		const err = error as Error;
        console.log("Error in message controller", err.message);
        res.status(500).json({
          error: "Internal Server Error",
          message: err.message,
        });
	}
};