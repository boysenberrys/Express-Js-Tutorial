const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const Product = require("./models/Product");

const app = express();

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/cart_session_demo")
    .then(()=> console.log("MongoDB connected"))
    .catch(err=> console.error(err));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    session({
        secret:"old-boysen-berry",
        resave: false,
        saveUninitialized:true,
    })
)

// Static files
app.use(express.static(path.join(__dirname, "public")));


app.get("/products", async(req,res)=>{
    const products = await Product.find();
    res.json(products)
})

app.post("/cart/add", async (req,res)=>{
    const { productId } = req.body;

    if(!req.session.cart){
        req.session.cart = [];
    }

    req.session.cart.push(productId);

    res.json({success:true})
})

// Get cart Items
app.get("/cart", async(req,res)=>{
    if(!req.session.cart){
      return res.json([]);   
    }

    const products = await Product.find({
        _id:{$in: req.session.cart}
    });

    res.json(products);
})

//Remove items from Cart

app.post("/cart/remove", (req, res)=>{
    const { productId } = req.body;

    req.session.cart = req.session.cart.filter(id=>id !==productId);

    res.json({success: true});

});



app.listen(3000,()=>{
    console.log("server running at http://localhost:3000")
})