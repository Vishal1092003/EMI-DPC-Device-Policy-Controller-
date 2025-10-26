const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    imei: { type: String, required: true, unique: true },
    owner: { type: String, required: true },
    status: { type: String, enum: ["active", "locked"], default: "active" },
    otp: { type: String, default: null },
    registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Device", deviceSchema);
