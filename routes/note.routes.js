const express = require("express");
require("express-group-routes");
const router = express.Router();

const tryCatch = require("../utils/tryCatch");
const { noteController } = require("../controllers");

router.group("/v1", router => {
	router.post("/note", tryCatch(noteController.create));
	router.put("/share/:id", tryCatch(noteController.shareNote));
});

module.exports = router;
