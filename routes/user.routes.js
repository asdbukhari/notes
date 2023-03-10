const express = require("express");
require("express-group-routes");
const router = express.Router();

const tryCatch = require("../utils/tryCatch");
const { userController } = require("../controllers");

router.group("/v1", router => {
	router.post("/sign-up", tryCatch(userController.signup));
});

module.exports = router;
