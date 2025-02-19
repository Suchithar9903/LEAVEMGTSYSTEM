const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["employee", "manager"], required:true, default: "employee" },
  profile: {
    department: String,
    position: String,
    phoneNumber: String
  }
});

module.exports = mongoose.model("User", UserSchema);

