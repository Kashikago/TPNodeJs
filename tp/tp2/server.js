const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();
const port = 3000;

app.get("/userList", (req, res) => {
    res.sendStatus(200);
});
app.get("/getUser", (req, res) => {
    const query = req.query;
    if (query.hasOwnProperty('id') && query['id'])
        res.sendStatus(200);
    else {
        res.sendStatus(400);
    }
});
app.post("/createUser", jsonParser, (req, res) => {
    const body = req.body;
    if (req.body != null && userDataValidator(body)) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(400);
    }

});
app.put("/updateUser", (req, res) => {
    const query = req.query;
    if (query.hasOwnProperty('id') && query['id'])
        res.sendStatus(200);
    else {
        res.sendStatus(400);
    }
});
app.delete("/deleteUser", (req, res) => {
    const query = req.query;
    if (query.hasOwnProperty('id') && query['id'])
        res.sendStatus(200);
    else {
        res.sendStatus(400);
    }
})
app.listen(port, () => {
    console.log("Server listening at port: ", port);
});

function userDataValidator(bodyContent) {
    let contentValidated =
        bodyContent.hasOwnProperty('username') && bodyContent['username'] != ""
        && bodyContent.hasOwnProperty('firstname') && bodyContent['firstname'] != ""
        && bodyContent.hasOwnProperty('lastname') && bodyContent['lastname'] != ""
    return contentValidated;
}