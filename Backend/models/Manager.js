const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "manager" }
});

const Manager = mongoose.model("Manager", managerSchema, "managers");
module.exports = Manager;
