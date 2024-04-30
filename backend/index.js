// const port = 4000; //created a port with port 4000
// const express = require("express");   //intialized express
// const app = express();    //created app instancee
const mongoose = require("mongoose"); //initialized mongo db mongoose
const jwt = require("jsonwebtoken");  //initialized json web token
const multer = require("multer");  // initialized multer for storage of files
const path = require("path");  // initialized path from the express server
const cors = require("cors"); //initialized cors 
const express = require('express');
const { type } = require("os");
const { error } = require("console");
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
mongoose.connect("mongodb+srv://rishabhgit1704:Akatsuki08@cluster0.mxdbqxy.mongodb.net/e-commerce");
console.log("mongodb connected");
//Api Creation


app.get("/",(req,res)=>{
res.send("Express app is running");
})

 //Image Storage Engine Multer
 const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
 })

 const upload =multer({storage:storage})

 //creating upload Endpoint for images
 app.use('/images',express.static('upload/images'))

 app.post("/upload",upload.single('product'),(req,res)=>{
res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
})
 })


//schema for product

const Product = mongoose.model("Product",{
    id:{
type:Number,
required:true,
    },
    name:{
        type:String,
        required:true,
},

image:{
    type:String,
    required:true,
},   

category:{
    type:String,
    required:true,
},

new_price:{
    type:Number,
    required:true,
},

old_price:{
    type:Number,
    required:true,
},

date:{
    type:Date,
    default:Date.now,
},

available:{
    type:Boolean,
    default:true,
 },
})

app.post('/addproduct',async (req,res)=>{     //cretion of api for product upload
    

    let products = await Product.find({});  //logic for autommatic updation of product id
    let id;
    if(products.length>0){
let last_product_array = products.slice(-1);
let last_product = last_product_array[0];
id = last_product.id+1;
    }

    else{
        id=1;
    }                                 // end of logic for automatic updation of product id
    
    const product = new Product({
        id:id,
        name:req.body.name,  
        image:req.body.image, 
        category:req.body.category,  
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})


//creating Api For deleting products

app.post('/removeproduct',async (req,res)=>{
await Product.findOneAndDelete({id:req.body.id});
console.log("Removed");

res.json({
    success:true,
    name:req.body.name
})
})


//Api creation for getting all products

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})



//Schema Creation for User Model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
type:String,
unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
type:Date,
default:Date.now,
    }
})


//Creating Endpoint for regestering the user

app.post('/signup',async(req,res)=>{
 
let check = await Users.findOne({email:req.body.email});

if (check) {
    return res.status(400).json({success:false,errors:"existing user found with same email"})
}

let cart = {};

for(let i = 0; i < 300; i++){
    cart[i]=0;
}

const user = new Users({
    name:req.body.username,   //creation of the user 
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
})

await user.save();   //saving the user on the database

 
const data = {    // Jwt Authentication
    user:{         //creation of Key with user ID
        id:user.id  
    }
}


const token =jwt.sign(data,'secret_ecom');
res.json({success:true,token})

})


//creating endpoint for user login

app.post('/login', async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});   //finding the user with the help of email from the database
    if(user){
        const passCompare = req.body.password === user.password;  //we are comparing the password
        if(passCompare){
            const data = {
                user:{
                    id:user.id        //if the password is correct 
                }
            }
            const token = jwt.sign(data,'secret_ecom');  //we will generate one token
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});   //if the password is incorrect we will display error
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"});  //if the email is incorrect we will display the email error message

    }
})


//creating endpoint for newcollections data
app.get('/newcollections',async(req,res)=>{
let products = await Product.find({});
let newcollection = products.slice(1).slice(-8);
console.log("New Collection Fetched!");
res.send(newcollection);
})

//creating endpoint for popular in Women data
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women Fetched!");
    res.send(popular_in_women);
    })
    



app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port);
    }
    else{
        console.log("Error :"+error);
    }
})


