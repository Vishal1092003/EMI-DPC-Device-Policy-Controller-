const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    imei: { type: String, required: true, unique: true },
    owner: { type: String, required: true },

    // Linking device to your server
    serverId: { type: String },          // server-assigned ID
    fcmToken: { type: String },          // if later you add push
    lastSeenAt: { type: Date },

    status: { type: String, enum: ["active", "locked"], default: "active" },
    otp: { type: String, default: null },

    // A very simple command queue for polling approach
    pendingCommand: {
        type: {
            type: String, enum: ["LOCK", "UNLOCK", "NONE"], default: "NONE"
        },
        payload: { type: Object, default: {} }
    },

    registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Device", deviceSchema);
