const express=require('express');
const dotenv=require("dotenv")
const app=express();

app.use(express.json());
app.use(require('cors'));

dotenv.config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send(`App started at port number ${PORT}`);
})
app.listen(PORT, () => {
    console.log(`App started at port number ${PORT}`);
})


