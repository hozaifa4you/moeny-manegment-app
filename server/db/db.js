const mongoose = require("mongoose");
const chalk = require("chalk");

const DB_CONNECTION = process.env.DB_CONNECTION;

const dbConnection = () => {
	mongoose.connect(
		DB_CONNECTION,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => {
			console.log(
				chalk.cyan(
					`database connected at: ${mongoose.connection.host}`.toUpperCase()
				)
			);
		}
	);
};

module.exports = dbConnection;
