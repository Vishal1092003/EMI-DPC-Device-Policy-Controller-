const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("./db");
const deviceRoutes = require("./routes/deviceRoutes");
const provisionRoutes = require("./routes/provisionRoutes");
const adminRoutes=require

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => res.send("📱 EMI Lock System Backend Running"));

app.use("/api/devices", deviceRoutes);
app.use("/api/provision", provisionRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
