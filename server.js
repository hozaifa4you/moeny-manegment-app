require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const chalk = require("chalk");

// FIXME: custom module
const dbConnection = require("./server/db/db");
const userRouter = require("./routers/user-router");

// FIXME: customization
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
const PORT = process.env.PORT || 99;

// FIXME: custom middleware routes
app.use("/user", userRouter);

// FIXME: home routers
app.get("/", (req, res) => {
	res.status(200).json({ msg: "This is Home page" });
});

// FIXME: server listen
app.listen(PORT, function () {
	console.log(
		chalk.cyan(`APP IS LISTENING ON PORT: http://localhost:${PORT}`)
	);
	dbConnection();
});
