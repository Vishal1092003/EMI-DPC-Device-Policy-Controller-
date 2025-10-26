const express = require("express");
const {
    registerDevice,
    getAllDevices,
    lockDevice,
    unlockDevice,
    verifyOtp,
} = require("../controllers/deviceController");

const router = express.Router();

router.post("/register", registerDevice);
router.get("/", getAllDevices);
router.patch("/lock/:imei", lockDevice);
router.patch("/unlock/:imei", unlockDevice);
router.post("/verify", verifyOtp);

module.exports = router;
