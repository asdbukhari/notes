const express = require("express");
require("express-group-routes");
const router = express.Router();

const tryCatch = require("../utils/tryCatch");
const { userController } = require("../controllers");

router.group("/v1", router => {
	router.post("/sign-up", tryCatch(userController.signup));
	router.post("/log-in", tryCatch(userController.login));
});

module.exports = router;
