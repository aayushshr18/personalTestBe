const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  userId:{
    type: String,
  },
  text: {
    type: String,
  },
  createdDate: { type: Date, default: Date.now },
});

const Msg = mongoose.model('Msg', msgSchema);

module.exports = Msg;
