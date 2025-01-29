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
	origin: process.env.CORS_ORIGIN, // Use the origin from .env
	methods: "GET,POST,PUT,DELETE",
	allowedHeaders: "Content-Type, Authorization",
};

connectMongoDB();

// Middlewares
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// Routes
app.use("/auth/admin", adminRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
