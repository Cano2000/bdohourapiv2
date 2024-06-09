const express = require("express")
const { createZone, getZones, createGroupedData } = require("../controllers/zone")
const router = express.Router()
const checkAuth = require("../middleware/auth")

router.post("/createzone", createZone)
router.get("/", checkAuth, getZones)
router.get("/:id",checkAuth, createGroupedData)

module.exports = router;