const express = require("express");
const url = require("url");
const app = express();

// console.log(app);

//  routing methods

app.get("/", (req, res) => {
    const q = url.parse(req.url, true);
    console.log(q.query);
    return res.send("Homerpage ! Hii " + q.query.name);

})





app.listen(8080, function () {
    console.log("Server Started!");
})