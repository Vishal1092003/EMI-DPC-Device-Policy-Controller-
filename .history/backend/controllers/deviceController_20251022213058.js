const Device = require("../models/Device");

// Register new device
exports.registerDevice = async (req, res) => {
    try {
        const { imei, owner } = req.body;
        if (!imei || !owner) return res.status(400).json({ msg: "IMEI and Owner required" });

        const exists = await Device.findOne({ imei });
        if (exists) return res.status(400).json({ msg: "Device already exists" });

        const device = await Device.create({ imei, owner });
        res.status(201).json({ msg: "Device registered", device });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get all devices
exports.getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Lock device
exports.lockDevice = async (req, res) => {
    try {
        const { imei } = req.params;
        const device = await Device.findOne({ imei });
        if (!device) return res.status(404).json({ msg: "Device not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        device.status = "locked";
        device.otp = otp;
        await device.save();

        res.json({ msg: "Device locked", otp });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Unlock device
exports.unlockDevice = async (req, res) => {
    try {
        const { imei } = req.params;
        const device = await Device.findOne({ imei });
        if (!device) return res.status(404).json({ msg: "Device not found" });

        device.status = "active";
        device.otp = null;
        await device.save();

        res.json({ msg: "Device unlocked" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Verify OTP (for customer unlock)
exports.verifyOtp = async (req, res) => {
    try {
        const { imei, otp } = req.body;
        const device = await Device.findOne({ imei });

        if (!device) return res.status(404).json({ msg: "Device not found" });
        if (device.otp !== otp) return res.status(400).json({ msg: "Invalid or expired OTP" });

        device.status = "active";
        device.otp = null;
        await device.save();

        res.json({ msg: "Device unlocked successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

