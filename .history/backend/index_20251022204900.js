const express=require('express');
const app=express.Router();



app.listen(PORT, () => {
    console.log(`App started at port number ${PORT}`);
})
app.get("/",(req,res)=>{
    res.send(`App started at port number ${PORT}`);
})

