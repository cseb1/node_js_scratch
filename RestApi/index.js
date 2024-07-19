const express = require("express")
const users = require("./MOCK_DATA (1).json")
const fs = require("fs")
// import the third party midleware - morgan
const morgan = require("morgan");
// const mongoose = require("mongoose");

// // connect to mongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/Test")
// .then(()=> console.log("MongoDB connected!"))
// .catch((err)=>console.log("MongoDB failed!!"+err));

// // create a Schema
// const userSchema=mongoose.Schema(
//     {
//         first_name:{
//             type:String,
//             required:true
//         },
//         last_name:{
//             type:String
//         },
//         email:{
//             type:String,
//             required:true,
//             unique:true
//         },
//         gender:{
//             type:String,
//             required:true
//         },
//         job_title:{
//             type:String
//         }

//     }
// )

// // create a model
// const user=mongoose.model('user',userSchema);
const app = express();

const port = 8000;

// create a custom middleware -plugins
// create a funcion
let xx;
const logger = function (req, res, next) {
    console.log("Calling Middleware Function..."); // log 
    // call the next middleware
    //xx = Date.now(); // all variable inside the midleware function are available in the next midleware by inherted property
    req.requestedAt = new Date().toISOString();
    next();
}

// Middlewares - plugins
app.use(express.urlencoded({ extended: false }));
// call custom middleware
app.use(logger);

// third party midleware-morgan 
// please read this midleware from express.js website
/**
 we see that morgan is not itself a midleware function
 but it is return a middleware function
 morgan take two variables - format and options
 */
app.use(morgan("dev"));
// Another way to creating a middleware
app.use((req, res, next) => {
    console.log("Another way to calling midleware");
    // console.log("Another Way to calling middleware", xx); // checking the xx value by uncomment it
    // kill the request
    // res.send("hey ! kill the request");
    // calling the next middleware
    console.log(req.requestedAt);
    next();
})


// routes

// 1. task
//  List all the user
app.get("/api/users", (req, res) => {
    return res.json({
        requestTime: req.requestedAt,
        users: users
    });
});
// get the user details with id
app.get("/api/users/:id", (req, res) => {

    const id = req.params.id * 1;
    // find the user with that id
    let userToGet = users.find(el => el.id === id);
    //console.log(userToGet);
    if (userToGet) {
        return res.json(
            {
                status: 200,
                msg: "success",
                user: userToGet
            }
        )
    } else {
        return res.json({
            status: 404,
            msg: "failed!"
        })
    }
})


// create a new user using post method
app.post("/api/users", (req, res) => {
    // return res.json("Status pending....")
    // get the body params value
    const body = req.body;
    // console.log(body);  --> undefined bcz . express does not know 
    //  what type of data we send that's why to prevent that problem
    // We use Middleware
    //  now or body are print in console
    // console.log(body);
    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title

    ) {
        return res.status(404).json({
            msg: "All field are required"
        })
    }
    users.push({
        id: users.length + 1,
        ...body
    });
    fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users), (err, data) => {
        if (err) throw err;
        else {
            return res.status(200).json({ id: users.length });
        }
    });


})


//  update / edit the user details for a particular id

app.patch("/api/users/:id", (req, res) => {
    let id = req.params.id * 1; // string to number convert
    let userToUpdate = users.find(el => el.id === id);
    if (!userToUpdate) {
        return res
            .json({
                status: 'fail',
                message: 'No users object with ID ' + id + ' is found'
            })
    }
    let userIndex = users.indexOf(userToUpdate);
    Object.assign(userToUpdate, req.body);
    users[userIndex] = userToUpdate;

    fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err) => {

        res.status(200).json({
            status: "success",
            data: {
                user: userToUpdate
            }
        })
    }
    )
})


// delete the user details for a particular id
app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id * 1;
    const userToDelete = users.find(el => el.id === id);
    if (!userToDelete) {
        return res
            .json({
                status: 'fail',
                message: 'No users object with ID ' + id + ' is found'
            })
    }
    const deleteIndex = users.indexOf(userToDelete);

    users.splice(deleteIndex, 1);

    fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users),
        (err) => {
            res.status(204).json({
                status: "Success",
                data: {
                    users: null
                }
            })
        })
});

app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log("Server started at port "+port);
    }

})