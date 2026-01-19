import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done)=>{
    console.log("Inside Serialize user");
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    console.log("Inside Deserializer");
    console.log(`Deserializing User ID: ${id}`);
    try{
       const findUser = mockUsers.find((user)=> user.id === id);
       if(!findUser) throw new Error("User Not Found");
       done(null, findUser);
    } catch(err){
        done(err, null);
    }
})


export default passport.use(
    new Strategy({usernameField: "username"}, (username, password, done)=>{
        console.log(`username: ${username}`);
        console.log(`Password: ${password}`);
        try {
            const findUser = mockUsers.find((user)=>user.username === username);
            if(!findUser) throw new Error("User not found!");

            if (findUser.password !== password)
                throw new Error("Invalid credentials!");
            done(null, findUser);
        } catch(err){
            done(err, null);
        }
    })
)