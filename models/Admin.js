import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
	{
		collegeName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: {
			type: String, // Adding the address field
			required: true,
		},
		pin: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "admin",
			enum: ["admin"],
		},
		phone: {
			type: String, // Phone number
			required: true,
		},
	},
	{ timestamps: true }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Method to compare passwords
adminSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
