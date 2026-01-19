import express from 'express';
import routes from "./routes/index.mjs";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { cookie } from 'express-validator';
import { mockUsers } from './utils/constants.mjs';

const app = express();

app.use(express.json());
app.use(cookieParser("boysen"));
app.use(
    session({
        secret: "boysen berry",
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: 60000 * 60,
        }
    }));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`);
});

app.get("/", (request, response) =>{
    console.log(request.session);
    console.log(request.sessionID);
    request.session.visited = true;
    response.cookie("hello", "world", {maxAge: 60000 * 60 *2, signed:true})
    response.status(201).send({msg: "Hello"});
});

app.post("/api/auth", (request, response)=>{
    const { body: { username, password }, } = request;
    const findUser = mockUsers.find((user)=> user.username === username);
    if(!findUser || findUser.password !== password) 
        return response.status(401).send({msg: "BAD CREDENTIALS"});

    request.session.user = findUser;
    return response.status(200).send(findUser)
});

app.get("/api/auth/status", (request, response)=>{
    request.sessionStore.get(request.sessionID,(err, session)=>{
        if(err)
            throw err;
        console.log(session);
    })
    return request.session.user ? response.status(200).send(request.session.user) : response.status(401).send({ msg: "Not authenticated"});
});

app.post("/api/cart", (request, response)=>{
    if (!request.session.user) return response.sendStatus(401);

    const { body: item } = request;
    const { cart } = request.session;
    if(cart){
        cart.push(item);
    } else {
        request.session.cart = [item];
    }
    return response.status(201).send(item)
});

app.get("/api/cart", (request, response)=>{
    if(!request.session.user) return response.sendStatus(401);
    return response.send(request.session.cart ?? []);
})








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


