const express=require('express');
const app=express();
app.use(express.json());
app.use(cors)



app.listen(PORT, () => {
    console.log(`App started at port number ${PORT}`);
})
app.get("/",(req,res)=>{
    res.send(`App started at port number ${PORT}`);
})

