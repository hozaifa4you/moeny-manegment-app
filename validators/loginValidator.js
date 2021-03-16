const validator = require("validator");

const logValid = user => {
	let error = {};
	let { email, password } = user;

	// email validator
	if (!email) {
		error.email = "Please provide your email";
	} else if (!validator.isEmail(email)) {
		error.email = "Please provide valid email";
	}

	// password validator
	if (!password) {
		error.password = "Please provide your a password";
	} else if (password.length < 6) {
		error.password = "Please provide right password";
	}

	return {
		error,
		isValid: Object.keys(error).length === 0,
	};
};

module.exports = logValid;
