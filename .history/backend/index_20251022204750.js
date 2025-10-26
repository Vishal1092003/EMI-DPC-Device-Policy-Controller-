const express=require('express');
const app=express.Router();


app.get("/",(req,res)=>{
    console.log(`App started at port number ${PORT}`);
})

app.listen(PORT,()=>{
    
})