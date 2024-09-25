const express = require("express");
const routerV1 = new express.Router();
const userAuth = require("../controllers/Authorization");



//user auth
routerV1.get("/msg",userAuth.getAllMsgs);
routerV1.post("/msg",userAuth.sendMsg);

module.exports = routerV1;