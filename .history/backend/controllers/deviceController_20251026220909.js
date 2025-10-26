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

// Called by the DPC app after Device Owner provisioning to register with server
exports.registerFromDevice = async (req, res) => {
    try {
        const { imei, owner, serverId, fcmToken } = req.body;
        if (!imei) return res.status(400).json({ msg: "IMEI required" });

        let device = await Device.findOne({ imei });
        if (!device) device = await Device.create({ imei, owner: owner || "Unknown" });

        device.serverId = serverId || device.serverId;
        device.fcmToken = fcmToken || device.fcmToken;
        device.lastSeenAt = new Date();
        await device.save();

        res.json({ msg: "Device registered", device });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

// Device polls commands periodically (if you don’t use push yet)
exports.pollCommand = async (req, res) => {
    try {
        const { imei } = req.query;
        const device = await Device.findOne({ imei });
        if (!device) return res.status(404).json({ msg: "Not found" });

        const cmd = device.pendingCommand || { type: "NONE", payload: {} };
        // reset queue to NONE after pick-up
        device.pendingCommand = { type: "NONE", payload: {} };
        device.lastSeenAt = new Date();
        await device.save();

        res.json({ command: cmd });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

// Admin triggers LOCK: sets OTP + queue command
exports.lockDevice = async (req, res) => {
    try {
        const { imei } = req.params;
        const device = await Device.findOne({ imei });
        if (!device) return res.status(404).json({ msg: "Device not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        device.status = "locked";
        device.otp = otp;
        device.pendingCommand = { type: "LOCK", payload: { otp } }; // phone will lock on next poll/push
        await device.save();

        res.json({ msg: "Device locked", otp });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

// Admin UNLOCK
exports.unlockDevice = async (req, res) => {
    try {
        const { imei } = req.params;
        const device = await Device.findOne({ imei });
        if (!device) return res.status(404).json({ msg: "Device not found" });

        device.status = "active";
        device.otp = null;
        device.pendingCommand = { type: "UNLOCK", payload: {} };
        await device.save();

        res.json({ msg: "Device unlocked" });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

// Verify OTP from the customer app (or unlock UI)
exports.verifyOtp = async (req, res) => {
    try {
        const { imei, otp } = req.body;
        const device = await Device.findOne({ imei });
        if (!device) return res.status(404).json({ msg: "Device not found" });
        if (device.otp !== otp) return res.status(400).json({ msg: "Invalid or expired OTP" });

        device.status = "active";
        device.otp = null;
        device.pendingCommand = { type: "UNLOCK", payload: {} };
        await device.save();

        res.json({ msg: "Device unlocked successfully" });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

