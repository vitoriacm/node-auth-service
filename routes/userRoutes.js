const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à API" });
});

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Proteger rota
router.get("/user/:id", authController.checkToken, userController.getUser);

module.exports = router;
