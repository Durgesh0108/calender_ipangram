import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
	try {
		const db = await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		return db;
	} catch (error) {
		throw new Error("MongoDB connection error: " + error.message);
	}
}

export default dbConnect;
