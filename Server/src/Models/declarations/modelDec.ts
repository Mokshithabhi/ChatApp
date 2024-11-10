import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
	_id: mongoose.Types.ObjectId;
	fullName: string;
	username: string;
	password: string;
	gender: "male" | "female";
	profilePic?: string;
	deletedUsers?:string[];
	createdAt?: Date;
	updatedAt?: Date;

}

export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
	receiverId: mongoose.Types.ObjectId;
	message: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IConversation extends Document {
	_id: mongoose.Types.ObjectId;
	participants: mongoose.Types.ObjectId[];
	messages: mongoose.Types.ObjectId[];
	createdAt?: Date;
	updatedAt?: Date;
}