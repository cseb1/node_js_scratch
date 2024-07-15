const http = require("http");
const fs = require("fs");
// Create a Server

const myServer = http.createServer((req, res) => {
    // console.log("new req. received");
    // console.log(req.headers);
    const log = `${Date.now()},${req.url} New req received.\n`
    fs.appendFile('./log.txt', log, (err, data) => {
        // res.end("Hello! From my Server Again");
        switch (req.url) {
            case "/": res.end("HomePage");

                break;
            case "/about": res.end("Hii MySelf Susanta");
                break;
            default: res.end("404 Not found");
                break;
        }
    });
});


myServer.listen(8000, () => {
    console.log("Server Started!");
})

