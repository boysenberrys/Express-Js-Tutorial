const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.json());

app.use(
    session({
        secret:"my-secret-key",
        resave: false,
        saveUninitialized:false,
        cookie:{
            maxAge:1000*60*60, //1hour
            httpOnly:true,
        }
    })
)

function isAuthenticated(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.status(401).send("Unauthorized");
    }
}

app.get("/", (req, res)=>{
    res.send("Express Session Tutorial");
});

app.get("/visit", (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }

  res.send(`You visited ${req.session.views} times`);
});

app.get("/dashboard", isAuthenticated,(req,res)=>{
    res.send(`Welcome ${req.session.user.username}`);
})

app.post("/login", (req, res)=>{
    const { username, password } = req.body;

    if(username === "admin" && password === "1234"){
        req.session.user = {
            username:"admin",
        };
        res.send("Loggen in successfully")
    } else {
        res.status(401).send("Invalid credentials");
    }
});

app.post("/logout", (req,res)=>{
    req.session.destroy((err)=>{
        if (err){
            return res.status(500).send("Logout failed");
        }
        res.send("Logged out");
    });
});




app.listen(3000, ()=>{
    console.log("server running on http://localhost:3000");
});

