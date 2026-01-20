import express, { response } from 'express';
import routes from "./routes/index.mjs";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import "./strategies/local-stratergies.mjs"

const app = express();

mongoose
    .connect("mongodb://localhost/express_tutorial")
    .then(()=>console.log("Connected to Database"))
    .catch((err)=> console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser("boysen"));
app.use(
    session({
        secret: "boysen berry",
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: 60000 * 60,
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        })
    })
); 

// PA SSPORT JS MIDDLEWARE PLUGIN
app.use(passport.initialize());
app.use(passport.session());

// Routes PLUGIN
app.use(routes);

// PASSPORT ROUTER
app.post(
    "/api/auth",
    passport.authenticate("local"), (request, response)=>{
        response.sendStatus(201); 
    }
);

app.get("/api/auth/status", (request, response)=>{
    console.log(`inside /auth/status endpoint`);
    console.log(request.user);
    console.log(request.session);
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.post("/api/auth/logout", (request, response)=>{
    if(!request.user) return response.sendStatus(401);
    request.logOut((err)=>{
        if(err) return response.sendStatus(400);
        response.send(200);
    });
})



// server plugin
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`);
});








//localhost:300
//localhost: 300/users

// Route Parameter..
//query params and query strings
//local

// post-request
//put-request
// patch request
// delete request
//middleware
//expressValidator

//router


