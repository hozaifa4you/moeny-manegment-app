const validator = require("validator");

const validate = user => {
	let error = {};
	let { name, username, email, password, confirmPassword } = user;

	// name validator
	if (!name) {
		error.name = "Please provide your name";
	}

	//username validator
	if (!username) {
		error.username = "Please provide a username";
	}

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
		error.password = "Password must be greater then of equal 6";
	}

	// confirmPassword validator
	if (!confirmPassword) {
		error.confirmPassword = "Please confirm your password";
	} else if (password !== confirmPassword) {
		error.confirmPassword = "Password does not matched";
	}

	return {
		error,
		isValid: Object.keys(error).length === 0,
	};
};

module.exports = validate;
