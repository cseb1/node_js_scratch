const express = require("express")
const users = require("./MOCK_DATA (1).json")
const fs = require("fs")

const app = express();

const port = 8000;


// Middlewares - plugins
app.use(express.urlencoded({ extended: false }));
// routes

// 1. task
//  List all the user
app.get("/api/users", (req, res) => {
    return res.json(users);
});

// get the user details with id
app.get("/api/user/:id", (req, res) => {
    const id = req.params.id;
    // console.log(id);
    return res.json(users[id - 1])
})


// create a new user using post method
app.post("/api/user", (req, res) => {
    // return res.json("Status pending....")
    // get the body params value
    const body = req.body;
    // console.log(body);  --> undefined bcz . express does not know 
    //  what type of data we send that's why to prevent that problem
    // We use Middleware
    //  now or body are print in console
    // console.log(body);
    users.push({
        id: users.length + 1,
        ...body
    });
    fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users), (err, data) => {
        if (err) throw err;
        else {
            return res.json({ status: "success", id: users.length });
        }
    });


})


//  update / edit the user details for a particular id

app.patch("/api/user/:id", (req, res) => {
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
app.delete("/api/user/:id", (req, res) => {
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
        console.log("Server started!");
    }

})