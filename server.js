const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const useragent = require("express-useragent");

const indexRouter = require("./routes");
const createConnection = require("./utils/connectDb");

const { port, mongo_string, window, max_limit } = require("./config");

createConnection(mongo_string);

const app = express();

const limiter = rateLimit({
	windowMs: window * 1000,
	max: max_limit,
	message: `Too many requests to this end-point, please try again after ${window} seconds`,
});

app.set("trust proxy", 1);
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(useragent.express());
app.use(limiter);

app.use("/api", indexRouter);

var pjson = require("./package.json");

app.get("/api/health", (_, res) => {
	const server = "Server is running (version:" + pjson.version + ")";
	let mongo_db = `MongoDB connection state is ${mongoose.connection.readyState}`;
	res.status(200).send({ server, mongo_db });
});
app.listen(port);
app.use((req, res) => {
	res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`--------------------------------------------------------------`);
console.log(`Server started on port ${port} (version:${pjson.version})`);
console.log(`--------------------------------------------------------------`);
