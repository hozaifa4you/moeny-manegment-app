const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerValidator = require("../validators/regValidator");
const User = require("../server/models/Users");
const logValid = require("../validators/loginValidator");
const { serverError, notFound, resourceError } = require("../utils/errors");
const secretKey = process.env.SECRET_KEY;

// register controller
const registerController = (req, res, next) => {
	let { name, username, email, password, confirmPassword } = req.body;
	let validator = registerValidator({
		name,
		username,
		email,
		password,
		confirmPassword,
	});

	if (!validator.isValid) {
		res.status(400).json({ msg: validator.error });
	} else {
		User.findOne({ email, username })
			.then(user => {
				if (user) {
					return res
						.status(401)
						.json({ msg: "Email or username already exists." });
				}

				bcrypt.hash(password, 11, (err, hash) => {
					if (err) {
						return res
							.status(500)
							.json({ msg: "Server error" + err.message });
					}

					let newUser = new User({
						name,
						username,
						email,
						password: hash,
					});

					newUser
						.save()
						.then(user => {
							res.status(201).json({
								msg: "New User has been created",
								user: user.name,
								usermail: user.email,
							});
						})
						.catch(err => {
							res.status(500).json({
								msg: "Server error to saving user.",
								error: err.message,
							});
						});
				});
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({
					msg: "Server Error",
					error: error.message,
				});
			});
	}
};

// login controller
const loginController = (req, res, next) => {
	const { email, password } = req.body;
	let valid = logValid({ email, password });

	if (!valid.isValid) {
		return res.status(400).json({ msg: valid.error });
	}

	User.findOne({ email })
		.then(user => {
			if (!user) return notFound(res, "User not found!");

			bcrypt.compare(password, user.password, (err, result) => {
				if (err) return serverError(res, err); // be careful
				if (!result) return resourceError(res, "Password does not matched"); // be careful

				let token = jwt.sign(
					{
						_id: user._id,
						name: user.name,
						email: user.email,
					},
					secretKey,
					{ expiresIn: "5h" }
				);

				res.status(200).json({
					msg: "Successfully LoggedIn",
					token: `Bearer ${token}`,
				});
			});
		})
		.catch(err => serverError(res, err));
};

// get all user controller
const getAllUserController = (req, res, next) => {
	res.status(200).json({
		msg: "This is the page where you will get all users",
	});
};

module.exports = {
	registerController,
	loginController,
	getAllUserController,
};
