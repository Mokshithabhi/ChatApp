import mongoose from "mongoose";

const ConnectMongoDB = async () => {
	try {
        const mongoUri = process.env.MONGO_DB_URI;
		if (!mongoUri) {
			throw new Error("MongoDB URI is not defined in environment variables");
		}
		await mongoose.connect(mongoUri);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", (error as Error).message);
	}
};

export default ConnectMongoDB;