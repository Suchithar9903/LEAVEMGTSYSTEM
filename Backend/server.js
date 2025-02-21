require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const leaveRoutes = require("./routes/leave");
const connectDB = require("./config/db");

const app = express();
connectDB();

//Mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Failed:", err));


app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/leave", leaveRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



