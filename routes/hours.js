const express = require("express")
const { insertHours, createHour, editHour, deleteHour } = require("../controllers/hours")
const router = express.Router()
const checkAuth = require("../middleware/auth")

/**
 * Lista los Usuarios
 */
router.get("/", insertHours)
router.post("/createhour", checkAuth, createHour)
router.put("/edithour/:id",checkAuth, editHour)
router.delete("/deletehour/:id",checkAuth, deleteHour)

module.exports = router;