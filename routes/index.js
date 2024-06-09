const express = require("express")
const router = express.Router()

const users = require('./users');
const zones = require('./zone');
const hours = require('./hours');
const drops = require('./drops');

router.use("/users", users)
router.use("/zones", zones)
router.use("/hours", hours)
router.use("/drops", drops)

module.exports = router