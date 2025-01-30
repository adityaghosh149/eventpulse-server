import Admin from "../models/Admin.js";
import generateToken from "../utils/auth.js";

// Register Admin
export const registerAdmin = async (req, res) => {
	const { collegeName, email, password, address, pin, state, phone } =
		req.body;

	// Validate input data
	if (!collegeName || !email || !password || !phone) {
		return res.status(400).json({ message: "Please fill all fields" });
	}

	try {
		// Check if the admin already exists
		const adminExists = await Admin.findOne({ email });
		if (adminExists) {
			return res.status(400).json({ message: "Admin already exists" });
		}

		// Create a new admin
		const admin = await Admin.create({
			collegeName,
			email,
			password,
			address,
			pin,
			state,
			phone,
		});

		// Send success message
		res.status(201).json({
			message: "Admin registered successfully",
			admin: {
				id: admin._id,
				email: admin.email,
				name: admin.collegeName,
				role: admin.role,
			},
			token: generateToken(admin._id),
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Login Admin
export const loginAdmin = async (req, res) => {
	const { email, password } = req.body;

	// Validate input data
	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide email and password" });
	}

	try {
		// Find the admin by email
		const admin = await Admin.findOne({ email });
		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}

		// Check if the password matches
		const isMatch = await admin.matchPassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Send success message with token
		res.status(200).json({
			id: admin._id,
			email: admin.email,
			name: admin.collegeName,
			role: admin.role,
			token: generateToken(admin._id), // Send JWT token
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
