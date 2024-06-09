const express = require("express")
const { registerUsuario, getUsuario,getUsuarios, loginCtrl } = require("../controllers/users")
const router = express.Router()
const checkAuth = require("../middleware/auth")

/**
 * Lista los Usuarios
 */
router.post("/register", registerUsuario)

router.post("/login", loginCtrl)

/**
 * Crea los Usuarios
 */
router.get("/:Correo_electronico", getUsuario)

router.get("/", checkAuth, getUsuarios)

module.exports = router;