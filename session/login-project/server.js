const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    session({
        secret:"old-boysen-berrys",
        resave: false,
        saveUninitialized: false,
        cookie:{
            httpOnly:true,
            maxAge:1000*60*60, // 1hour
        },
    })
);

// server static file
app.use(express.static(path.join(__dirname, "public")));

//LOGN ROUTE
app.post("/login", (req, res)=>{
    const { username, password } = req.body;

    //simple demo credentials.

    if(username === "admin" && password === "1234"){
        req.session.user = { username };
        return res.json({success: true});
    }
    res.status(401).json(
        {
        success: false,
        message: "Invalid credentials"
    });
});

//PROTECTED ROUTE
app.get("/me", (req, res)=>{
    if(req.session.user){
        return res.json({
            loggedIn:true,
            user: req.session.user,
        });
    }
    res.status(401).json({loggedIn: false});
})

// LOGOUT
app.post("/logout", (req, res)=>{
    req.session.destroy(()=>{
        res.json({success:true});
    });
});

// server
app.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000");
})
