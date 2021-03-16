module.exports = {
	serverError(res, err) {
		console.log(err.message);
		res.status(400).json({ message: err.message });
	},

	// 404 error || not found
	notFound(res, err) {
		console.log(err.message);
		res.status(404).json({ msg: "User not found!" });
	},

	resourceError(res, msg) {
		res.status(400).json({ msg });
	},
};
