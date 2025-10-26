const express=require('express');
const app=express.Router();


app.get("/",(req,res)=>{
    res.send(`App started at port number ${PORT}`);
})

