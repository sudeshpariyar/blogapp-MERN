const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  userName: { type: "string", required: true, min: 4, unique: true },
  email: { type: "string", required: true, min: 5, unique: true },
  password: { type: "string", required: true, min: 5 },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
