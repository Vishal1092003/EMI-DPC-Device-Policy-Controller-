const express=require('express');
const app=express();




app.listen(PORT, () => {
    console.log(`App started at port number ${PORT}`);
})
app.get("/",(req,res)=>{
    res.send(`App started at port number ${PORT}`);
})

