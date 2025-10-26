const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const deviceRoutes = require("./routes/deviceRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Health route
app.get("/", (req, res) => res.send("📱 EMI Lock System Backend Running"));

// API routes
app.use("/api/devices", deviceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

