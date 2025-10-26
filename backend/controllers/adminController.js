const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// Helper: Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "secretkey", {
        expiresIn: "7d",
    });
};

// 🔹 Admin Signup
exports.registerAdmin = async (req, res) => {
    try {
        const { name, shopName, email, password } = req.body;
        if (!name || !shopName || !email || !password)
            return res.status(400).json({ msg: "All fields are required" });

        const existing = await Admin.findOne({ email });
        if (existing)
            return res.status(400).json({ msg: "Admin already registered" });

        const admin = await Admin.create({ name, shopName, email, password });

        res.status(201).json({
            msg: "Admin registered successfully",
            admin: { id: admin._id, name: admin.name, shopName: admin.shopName, email: admin.email },
            token: generateToken(admin._id),
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// 🔹 Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ msg: "Admin not found" });

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        res.json({
            msg: "Login successful",
            admin: { id: admin._id, name: admin.name, shopName: admin.shopName, email: admin.email },
            token: generateToken(admin._id),
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
