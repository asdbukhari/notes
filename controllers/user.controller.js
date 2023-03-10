const { USER } = require("../models");
const { hashPassword } = require("../utils/helper");

exports.signup = async (req, res) => {
	const { email, name, password, dob, address } = req.body;

	const user = await USER.findOne({ email });

	if (user) {
		throw {
			code: 409,
			success: false,
			message: "User exists with the same Email!",
		};
	}

	const hasedPassword = hashPassword(password);

	const newUser = await USER.create({
		email,
		name,
		password: hasedPassword,
		dob,
		address,
	});

	return res
		.status(200)
		.send({ success: true, message: "User created!", user: newUser });
};
