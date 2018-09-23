const express=require('express');
const router=express.Router();
const mongojs=require('mongojs');
const Userdata=require('../models/userdata');
const db=mongojs('mongodb://localhost:27017/livedrawingcanvas',['userdata']);

//Login
router.get('/login',function(req,res,next){
     db.userdata.find(function(err,userdata){
         res.json(userdata);
    })
    })
router.post('/login',function(req,res,next){
    let newUserdata=new Userdata({
        username:req.body.username,
        password:req.body.password
    });
    newUserdata.save((err,userdata)=>{
        if(err){
            res.json({msg:"Failed to add userdata"});
        }
        else{
            res.json({msg:"added successfully"});
        }
    });
})

module.exports=router;