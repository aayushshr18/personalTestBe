const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    required:true
  },
  createdDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
