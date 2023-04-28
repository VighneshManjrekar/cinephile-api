const router = require("express").Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  getUserName,
} = require("../controllers/auth.controllers");

// public routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/user/:id",getUserName)
module.exports = router;
