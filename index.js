import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectMongoDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

// CORS Configuration
const corsOptions = {
	origin: (origin, callback) => {
		const allowedOrigins = process.env.CORS_ORIGIN.split(",");
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true); // Allow the request
		} else {
			callback(new Error("Not allowed by CORS")); // Block the request
		}
	},
	methods: "GET,POST,PUT,DELETE",
	allowedHeaders: "Content-Type, Authorization",
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS with the defined options
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// Connect to MongoDB
connectMongoDB();

// Routes
app.use("/auth/admin", adminRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
