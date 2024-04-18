// const port = 4000; //created a port with port 4000
// const express = require("express");   //intialized express
// const app = express();    //created app instancee
const mongoose = require("mongoose"); //initialized mongo db mongoose
const jwt = require("jsonwebtoken");  //initialized json web token
const multer = require("multer");  // initialized multer for storage of files
const path = require("path");  // initialized path from the express server
const cors = require("cors"); //initialized cors 
const express = require('express')
const app = express()
const port = 4000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



app.use(express.json());    //whatever req we will get from response will be passed through json
app.use(cors());   // connect react app to express port 4000

// Database connection 
// mongoose.connect("mongodb+srv://rishabhgit1704:Akatsuki@08@cluster0.lo5rf1m.mongodb.net/Ecommerce");

//Api Creation


app.get("/",(req,res)=>{
res.send("Express app is running");
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port);
    }
    else{
        console.log("Error :"+error);
    }
})


