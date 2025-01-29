import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
	await mongoose
		.connect(MONGO_URI)
		.then(() => console.log("Connected to MongoDB Atlas"))
		.catch((error) =>
			console.log("Error occured connecting to MongoDG " + error)
		);
};

export default connectMongoDB;
