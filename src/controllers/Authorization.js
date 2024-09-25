const jwt = require("jsonwebtoken");
const User = require("../model/UserAuth");
const Msg = require("../model/Msg");

exports.registration = async (req, res) => {
  try {
    const { email,password } = req.body;
    const newUser = new User({
      ...req.body,
      email,
      password,
    });
    await newUser.save();
    const payload = {
      user: {
        id: newUser._id,
      },
    };

    const userToken = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(200).json({ status: true, userToken: userToken });
  
    res.status(200).json({ success: true, message: "OTP Sent Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email,password } = req.body;
    const user=await User.findOne({email,password});

    const payload = {
      user: {
        id: user._id,
      },
    };

    const userToken = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(200).json({ status: true, userToken: userToken });  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};



exports.sendMsg = async (req, res) => {
  try {
    const userId=req.user.id;
    const { text } = req.body;
    const msg = new Msg({userId,text});
    await msg.save();

        res
          .status(200)
          .json({ success: true, message: "Msg Sent Successfully!" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

exports.getAllMsgs = async (req, res) => {
  try {
    const msgs = await Msg.find();
    res.status(200).json({ status: true, msgs });
  } catch (error) {}
};
