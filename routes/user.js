const express = require('express');
const userController = require('../controller/userController');

const request=express.Router();

request.get("/",(req,res)=>{
    res.send("user base route")
})

request.get("/read/userdetails/:userid", async(req,res)=>{
    const resp = await userController.getuserdetails(req);
    res.send(resp)
})

request.post("/createuser", async(req,res)=>{
    const resp = await userController.createuser(req);
    res.send(resp)
})

request.post("/updateuser",(req,res)=>{
    const resp = userController.updateuser(req);
    res.send(resp)
})

request.post("/deleteuser",(req,res)=>{
    const resp = userController.deleteuser(req);
    res.send(resp)
})

module.exports = request;