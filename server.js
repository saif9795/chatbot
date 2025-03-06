const express = require("express");
const bodyParser = require("body-parser");
const chatRoutes = require("./chat");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use("/api", chatRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => console.log("Server running on port 3000"));

