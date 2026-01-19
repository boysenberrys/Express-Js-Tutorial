import {Router} from "express";
import { query, validationResult, checkSchema } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationShema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

mockUsers
router.get(
    "/api/users",
    query('filter')
        .isString()
        .notEmpty()
        .withMessage("must not be empty")
        .isLength({min:3, max:10})
        .withMessage('Must be atleast 3-20 characters'), 
    (request, response)=>
    {
        console.log(request.sessionID);
        request.sessionStore.get(request.sessionID, (err, sessionData)=>{
            if(err){
                console.log(err);
                throw err;
            }
            console.log(sessionData);
        });
        //console.log(request);
        const result = validationResult(request);
        console.log(result);
        const{query: {filter, value},} = request;

        if(filter && value) return response.send(mockUsers.filter((user)=> user[filter].includes(value)));
        return response.send(mockUsers)
    }
    
);

router.get('/api/users/:id', resolveIndexByUserId,(request, response)=>{
    const { findUserIndex } = request;
    const findUser = mockUsers[findUserIndex]
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser);

})

router.post(
    "/api/users",
    checkSchema(createUserValidationShema),
    (request, response)=>{
    const result = validationResult(request);
    console.log(result)

    if(!result.isEmpty())
        return response.status(400).send({errors: result.array()});

    const data = matchedData(request)

    const newUser = {id: mockUsers[mockUsers.length - 1].id + 1, ...data};
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
})

//put method

router.put("/api/users/:id", resolveIndexByUserId, (request, response)=>{
    const  { body, findUserIndex} = request;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    return response.sendStatus(200);
});

//patch request method

router.patch('/api/users/:id',resolveIndexByUserId, (request, response)=>{
    const { body, findUserIndex } = request;
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body}
    return response.sendStatus(202)
})

//delete request

router.delete("/api/users/:id",resolveIndexByUserId, (request, response)=>{
    const { findUserIndex } = request;
    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
})


export default router;