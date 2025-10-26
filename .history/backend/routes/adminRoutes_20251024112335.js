const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

const router = express.Router();

// /api/admin/signup
router.post("/signup", registerAdmin);

// /api/admin/login
router.post("/login", loginAdmin);

module.exports = router;
