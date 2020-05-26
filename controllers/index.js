const express = require("express");
const router = express.Router();

router.use("/api", require("./items/items"));

module.exports = router;