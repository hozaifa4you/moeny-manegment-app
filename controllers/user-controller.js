const bcrypt = require("bcrypt");

const registerValidator = require("../validators/regValidator");
const User = require("../server/models/Users");

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

				let hashPassword = bcrypt.hash(password, 11, (err, hash) => {
					if (err) {
						return res
							.status(500)
							.json({ msg: "Server error" + err.message });
					}

					return hash;
				});

				let hashConPassword = bcrypt.hash(
					confirmPassword,
					11,
					(err, hash) => {
						if (err) {
							return res
								.status(500)
								.json({ msg: "Server error" + err.message });
						}

						return hash;
					}
				);

				let newUser = new User({
					name,
					username,
					email,
					password: hashPassword,
					confirmPassword: hashConPassword,
				});

				newUser
					.save()
					.then(user => {
						res.status(200).json({
							msg: "New User has been created",
							user: user.name,
						});
					})
					.catch(err => {
						res.status(500).json({
							msg: "Server error creating new user" + err.message,
						});
					});
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({ msg: "Server Error" });
			});
	}
};

// login controller
const loginController = (req, res, next) => {
	res.status(200).json({ msg: "This is login router" });
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
