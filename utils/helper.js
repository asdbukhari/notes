const bcryptjs = require("bcryptjs");

module.exports = {
	hashPassword: string => {
		const salt = bcryptjs.genSaltSync(10);
		const hashed = bcryptjs.hashSync(string, salt);
		return hashed;
	},
};
