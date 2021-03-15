const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		username: { type: String, required: true, trim: true, unique: true },
		email: { type: String, required: true, trim: true },
		password: { type: String, required: true, trim: false },
		balance: Number,
		income: Number,
		expense: Number,
		transactions: {
			type: [{ type: Schema.Types.ObjectId, ref: "Transactions" }],
		},
	},
	{ timestamp: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = model("Users", userSchema);

module.exports = User;
